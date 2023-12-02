<script setup lang="ts">
interface DynamicSectionsProps {
	formClass?: string
	sectionsContainerClass?: string
	modelValue?: { [key: string]: any }[]
}

interface DynamicSectionsEmits {
	(event: "update:modelValue", value: { [key: string]: any }[]): void
}

const props = defineProps<DynamicSectionsProps>()
const emit = defineEmits<DynamicSectionsEmits>()

const formData = ref<{ [key: string]: any }>({})
const sections = props.modelValue ?? []

function handleSubmit(e: Event) {
	e.preventDefault()

	sections.push({ ...formData.value })
	formData.value = {}
	emit("update:modelValue", sections)
}

function deleteSection(id: number) {
	sections.splice(id, 1)
	emit("update:modelValue", sections)
}

function editSection(id: number) {
	formData.value = sections[id]
	sections.splice(id, 1)
	emit("update:modelValue", sections)
}
</script>

<template>
	<div class="flex flex-col gap-y-6 w-full">
		<div :class="['flex flex-col gap-y-6 w-full empty:hidden', sectionsContainerClass]">
			<slot
				name="sections"
				:sections="sections"
				:deleteSection="deleteSection"
				:editSection="editSection"
			/>
		</div>

		<form
			:class="['flex flex-col gap-y-6 w-full empty:hidden', formClass]"
			@submit.prevent="handleSubmit"
		>
			<slot name="form" :formData="formData" />
		</form>
	</div>
</template>
