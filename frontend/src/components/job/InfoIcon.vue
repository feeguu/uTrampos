<script setup lang="ts">
interface JobInfoIconProps {
	icon: Component
}

defineProps<JobInfoIconProps>()
</script>

<template>
	<div class="flex items-center text-sm font-semibold text-slate-900">
		<component :is="icon" class="fill-slate-900 h-5 w-5 mr-1" />
		<slot />
	</div>
</template>
