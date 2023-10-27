<script setup lang="ts">
const themes = {
	primary: "p-1 -m-1 rounded-full transition-colors hover:bg-neutral-200",
	defaultPrimary:
		"h-12 w-12 bg-slate-900 flex justify-center items-center text-white rounded font-semibold",
	defaultSecondary:
		"h-12 w-12 bg-sky-500 flex justify-center items-center text-white rounded font-semibold",
}

interface IconButtonProps {
	theme?: keyof typeof themes
}

defineProps<IconButtonProps>()
</script>

<template>
	<button @click="$emit('click', $event)" :class="themes[theme ?? 'primary']">
		<slot />
	</button>
</template>
