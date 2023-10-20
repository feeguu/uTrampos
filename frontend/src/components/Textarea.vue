<script setup lang="ts">
interface TextAreaProps {
	labelText?: string
	modelValue?: string
}

interface TextAreaEmits {
	(event: "update:modelValue", value: string): void
}

defineProps<TextAreaProps>()
defineEmits<TextAreaEmits>()
</script>

<template>
	<label class="flex flex-col text-slate-900">
		<span class="font-semibold mb-2 leading-none" v-if="labelText">{{ labelText }}</span>
		<textarea
			type="text"
			class="border-gray-300 rounded h-24 min-h-[3rem] focus:!border-sky-500 focus:!ring-sky-500"
			:value="modelValue"
			@input="$emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
		/>
	</label>
</template>
