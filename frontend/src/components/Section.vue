<script setup lang="ts">
interface SectionProps {
	title: string
}

defineProps<SectionProps>()
</script>

<template>
	<section class="flex flex-col gap-y-3 w-full">
		<h1 class="text-lg text-slate-900 font-medium font-lexend">{{ title }}</h1>
		<slot />
	</section>
</template>
