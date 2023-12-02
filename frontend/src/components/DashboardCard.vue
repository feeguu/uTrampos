<script setup lang="ts">
interface DashboardCardProps {
	title: string
	value: string
}

defineProps<DashboardCardProps>()
</script>

<template>
	<div
		class="group flex flex-col bg-white text-slate-900 shadow rounded p-6 items-center gap-y-6 text-center transition-transform hover:-translate-y-1"
	>
		<h1 class="text-xl font-semibold">{{ title }}</h1>
		<p class="text-6xl font-semibold">{{ value }}</p>
	</div>
</template>
