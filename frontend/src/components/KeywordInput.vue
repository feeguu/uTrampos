<script setup lang="ts">
interface KeywordInputProps {
	labelText?: string
	modelValue?: string[]
}

interface KeywordInputEmits {
	(event: "update:modelValue", value: string[]): void
}

const props = defineProps<KeywordInputProps>()
const emit = defineEmits<KeywordInputEmits>()

let keywords = props.modelValue ?? []
const keyword = ref("")
const keywordInput = ref<HTMLInputElement>()

function handleSubmit(e: Event) {
	e.preventDefault()

	if (!keyword.value) return
	const splittedKeywords = keyword.value.split(",").map((keyword) => keyword.trim())
	keywords.push(...splittedKeywords)

	keywords = [...new Set(keywords)]

	emit("update:modelValue", keywords)
	keyword.value = ""
}

function deleteKeyword(id: number) {
	keywords = keywords.filter((_, index) => index !== id)
	emit("update:modelValue", keywords)
}

async function onInputDelete(e: Event) {
	if (keyword.value) return

	keyword.value = keywords.pop() ?? ""

	e.preventDefault()
}
</script>

<template>
	<div class="flex flex-col text-slate-900">
		<label for="keyword-input" class="font-semibold mb-3 leading-none">Palavras-chave</label>
		<div
			class="items-center flex flex-wrap gap-2 px-3 py-2 bg-white ring-1 cursor-text ring-gray-300 rounded ring-inset focus-within:border-sky-500 focus-within:ring-sky-500 focus-within:ring-2"
			@click="keywordInput?.focus()"
		>
			<JobKeyword v-for="(value, index) in modelValue" deletable @delete="deleteKeyword(index)">
				{{ value }}
			</JobKeyword>
			<form @submit.prevent="handleSubmit" class="flex-1">
				<input
					type="text"
					id="keyword-input"
					ref="keywordInput"
					v-model.trim="keyword"
					@keydown.delete="onInputDelete"
					@keypress.,="handleSubmit"
					maxlength="30"
					class="leading-none w-full min-w-[8rem] !bg-transparent !ring-0 !border-0 !p-0"
				/>
			</form>
		</div>
		<small class="text-neutral-500 mt-1">Insira uma vírgula após cada palavra-chave.</small>
	</div>
</template>
