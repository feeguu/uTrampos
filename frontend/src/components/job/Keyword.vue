<script setup lang="ts">
import { RiCloseLine } from "vue-remix-icons"

interface KeywordProps {
	deletable?: boolean
}

defineProps<KeywordProps>()
</script>

<template>
	<span class="text-white bg-sky-500 rounded font-semibold px-1.5 py-0.5 text-sm flex items-center">
		<slot />
		<button
			type="button"
			class="bg-white bg-opacity-25 rounded-full ml-1.5 hover:bg-opacity-40"
			@click="$emit('delete')"
			v-if="deletable"
		>
			<RiCloseLine class="fill-white h-3.5 w-3.5" />
		</button>
	</span>
</template>
