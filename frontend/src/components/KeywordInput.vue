<script setup lang="ts">
import { RiSendPlane2Line } from "vue-remix-icons"

interface KeywordInputProps {
	labelText?: string
	modelValue?: string[]
}

interface KeywordInputEmits {
	(event: "update:modelValue", value: string[]): void
}

const props = defineProps<KeywordInputProps>()
const emit = defineEmits<KeywordInputEmits>()

const keywords = ref(props.modelValue ?? [])
const keyword = ref("")

function handleSubmit() {
	if (!keyword.value.trim()) {
		keyword.value = ""
		return
	}
	keywords.value.push(keyword.value)
	emit("update:modelValue", keywords.value)
	keyword.value = ""
}

function handleDeleteKeyword(id: number) {
	keywords.value = keywords.value.filter((keywordToDelete, index) => index !== id)
	emit("update:modelValue", keywords.value)
}
</script>

<template>
	<div class="flex flex-col">
		<form @submit.prevent="handleSubmit" class="flex items-end gap-x-2 w-full">
			<Input v-model="keyword" label-text="Palavras-chave" container-class="flex-1" />
			<IconButton theme="defaultSecondary">
				<RiSendPlane2Line class="fill-current h-5 w-5" />
			</IconButton>
		</form>
		<div class="mt-2 gap-2 flex flex-wrap">
			<JobKeyword v-for="(value, index) in modelValue" deletable @delete="handleDeleteKeyword(index)">{{
				value
			}}</JobKeyword>
		</div>
	</div>
</template>
