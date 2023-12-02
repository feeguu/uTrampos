<script setup lang="ts">
const toast = useToast()
</script>

<template>
	<div class="w-full sm:max-w-xs p-3 z-[100] fixed top-0 right-0 flex flex-col gap-y-2 empty:hidden">
		<TransitionGroup
			enter-from-class="opacity-0"
			leave-to-class="opacity-0"
			enter-active-class="transition-opacity"
			leave-active-class="transition-opacity"
		>
			<Toast
				v-for="{ id, message, type } in toast.toastMessages"
				:theme="type"
				:key="id"
				@close="toast.close(id)"
				>{{ message }}</Toast
			>
		</TransitionGroup>
	</div>
</template>
