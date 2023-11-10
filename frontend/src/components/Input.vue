<script setup lang="ts">
interface InputProps {
	labelText?: string
	modelValue?: string
	containerClass?: string
}

interface InputEmits {
	(event: "update:modelValue", value: string): void
}

defineOptions({
	inheritAttrs: false,
})
defineProps<InputProps>()
defineEmits<InputEmits>()
</script>

<template>
	<label :class="['flex flex-col text-slate-900', containerClass]">
		<span class="font-semibold mb-2 leading-none" v-if="labelText">{{ labelText }}</span>
		<input
			v-maska
			type="text"
			class="border-gray-300 rounded h-12 focus:!border-sky-500 focus:!ring-sky-500"
			v-bind="$attrs"
			:value="modelValue"
			@maska="$emit('update:modelValue', $event.detail.unmasked)"
		/>
	</label>
</template>
