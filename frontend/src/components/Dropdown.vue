<script setup lang="ts">
import { RiMore2Fill } from "vue-remix-icons"
const showDropdown = ref(false)
function toggleDropdown() {
	showDropdown.value = !showDropdown.value

	if (showDropdown.value) {
		document.addEventListener("click", () => {
			showDropdown.value = false
		})
	} else {
		document.removeEventListener("click", () => {
			showDropdown.value = false
		})
	}
}
</script>

<template>
	<div class="relative" @click.stop>
		<IconButton @click="toggleDropdown">
			<RiMore2Fill class="fill-slate-900 h-6 w-6" />
		</IconButton>
		<div
			v-if="showDropdown"
			class="flex flex-col absolute right-0 w-56 rounded bg-white text-slate-900 shadow py-1 mt-1 empty:hidden"
			role="menu"
		>
			<slot />
		</div>
	</div>
</template>
