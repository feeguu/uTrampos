<script setup lang="ts">
import { RiCloseLine } from "vue-remix-icons"

interface ModalProps {
	show: boolean
}

defineProps<ModalProps>()
</script>

<template>
	<div
		class="fixed z-50 top-0 left-0 bg-black min-h-screen w-full flex items-end justify-center bg-opacity-70 p-4 md:items-center"
		v-if="show"
		@click.self="$emit('close')"
	>
		<div
			class="bg-white w-full rounded p-6 flex flex-col justify-center items-center text-center gap-y-4 relative md:max-w-lg"
		>
			<IconButton class="absolute top-2 right-2" @click="$emit('close')">
				<RiCloseLine class="fill-slate-900 h-6 w-6" />
			</IconButton>
			<slot />
		</div>
	</div>
</template>
