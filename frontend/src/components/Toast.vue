<script setup lang="ts">
import { RiErrorWarningFill, RiCloseLine } from "vue-remix-icons"

interface ToastEmits {
	(e: "close"): void
}

const emit = defineEmits<ToastEmits>()

onMounted(() => {
	console.log("MOUNTED")
	setTimeout(() => {
		emit("close")
		console.log("CLOSED")
	}, 5000)
})
</script>

<template>
	<div class="w-full bg-red-500 rounded px-4 py-6 flex items-center relative">
		<RiErrorWarningFill class="fill-white h-6 w-6 flex-shrink-0" />
		<p class="text-white pl-3"><slot /></p>
		<button
			@click="$emit('close')"
			class="opacity-80 transition-opacity absolute top-1.5 right-1.5 hover:opacity-100"
		>
			<RiCloseLine class="fill-white h-5 w-5" />
		</button>
	</div>
</template>
