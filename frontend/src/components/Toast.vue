<script setup lang="ts">
import { RiErrorWarningFill, RiCloseLine, RiCheckboxCircleFill } from "vue-remix-icons"

interface ToastProps {
	theme: "error" | "success"
}

interface ToastEmits {
	(e: "close"): void
}

const emit = defineEmits<ToastEmits>()
defineProps<ToastProps>()

onMounted(() => {
	setTimeout(() => {
		emit("close")
	}, 5000)
})
</script>

<template>
	<div
		:class="[
			'w-full rounded px-4 py-6 flex items-center relative',
			theme === 'error' ? 'bg-red-500' : 'bg-green-500',
		]"
	>
		<component
			:is="theme === 'error' ? RiErrorWarningFill : RiCheckboxCircleFill"
			class="fill-white h-6 w-6 flex-shrink-0"
		/>
		<p class="text-white pl-3"><slot /></p>
		<button
			@click="$emit('close')"
			class="opacity-80 transition-opacity absolute top-1.5 right-1.5 hover:opacity-100"
		>
			<RiCloseLine class="fill-white h-5 w-5" />
		</button>
	</div>
</template>
