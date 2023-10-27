<script setup lang="ts">
interface SelectProps {
	labelText?: string
	modelValue?: string
	containerClass?: string
}

interface SelectEmits {
	(event: "update:modelValue", value: string): void
}

defineOptions({
	inheritAttrs: false,
})
defineProps<SelectProps>()
defineEmits<SelectEmits>()
</script>

<template>
	<label :class="['flex flex-col text-slate-900', containerClass]">
		<span class="font-semibold mb-2 leading-none" v-if="labelText">{{ labelText }}</span>
		<select
			class="border-gray-300 rounded h-12 focus:!border-sky-500 focus:!ring-sky-500"
			v-bind="$attrs"
			:value="modelValue"
			@input="$emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
		>
			<slot />
		</select>
	</label>
</template>
