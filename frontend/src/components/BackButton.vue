<script setup lang="ts">
import { RiArrowLeftSLine } from "vue-remix-icons"
</script>

<template>
	<button @click="$router.back()" class="flex items-center text-neutral-500 font-semibold text-sm">
		<RiArrowLeftSLine class="-ml-1 fill-neutral-500 h-5 w-5" />
		<span>Voltar</span>
	</button>
</template>
