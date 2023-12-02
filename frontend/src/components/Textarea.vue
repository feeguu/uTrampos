<script setup lang="ts">
interface TextAreaProps {
	labelText?: string
	modelValue?: string
	containerClass?: string
}

interface TextAreaEmits {
	(event: "update:modelValue", value: string): void
}

defineOptions({
	inheritAttrs: false,
})
defineProps<TextAreaProps>()
defineEmits<TextAreaEmits>()
</script>

<template>
	<label :class="['flex flex-col text-slate-900', containerClass]">
		<span class="font-semibold mb-3 leading-none" v-if="labelText">{{ labelText }}</span>
		<textarea
			class="border-gray-300 rounded h-24 min-h-[3rem] focus:!border-sky-500 focus:!ring-sky-500"
			v-bind="$attrs"
			:value="modelValue"
			@input="$emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
		/>
	</label>
</template>
