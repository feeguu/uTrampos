<script setup lang="ts">
const themes = {
	primary:
		"w-full bg-slate-900 flex justify-center gap-x-1 items-center h-12 px-4 text-white rounded font-semibold",
	secondary:
		"w-full bg-sky-500 flex justify-center gap-x-1 items-center h-12 px-4 text-white rounded font-semibold",
}

interface ButtonProps {
	theme?: keyof typeof themes
}

defineProps<ButtonProps>()
</script>

<template>
	<button type="button" @click="$emit('click', $event)" :class="themes[theme ?? 'primary']">
		<slot />
	</button>
</template>
