<script setup lang="ts">
interface InputProps {
	labelText?: string
	modelValue?: string
}

interface InputEmits {
	(event: "update:modelValue", value: string): void
}

defineProps<InputProps>()
defineEmits<InputEmits>()
</script>

<template>
	<label class="flex flex-col text-slate-900">
		<span class="font-semibold mb-2 leading-none" v-if="labelText">{{ labelText }}</span>
		<input
			type="text"
			class="border-gray-300 rounded h-12 focus:!border-sky-500 focus:!ring-sky-500"
			:value="modelValue"
			@input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
		/>
	</label>
</template>
