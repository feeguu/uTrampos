<script setup lang="ts">
interface InputProps {
	labelText?: string
	modelValue?: string
}

defineProps<InputProps>()
defineEmits<{
	(event: "update:modelValue", value: string): void
}>()
</script>

<template>
	<label class="flex flex-col text-slate-900">
		<span class="font-semibold mb-1" v-if="labelText">{{ labelText }}</span>
		<input type="text" class="border-gray-300 rounded h-12" :value="modelValue" @input="$emit('update:modelValue', ($event.target as any).value)" />
	</label>
</template>
