<script setup>
import { RiArrowLeftSLine } from "vue-remix-icons"
</script>

<template>
	<div class="z-40 h-10 w-full bg-white sticky top-20 left-0 shadow">
		<div class="h-full w-full max-w-5xl mx-auto flex items-center justify-between px-6">
			<button @click="$router.back()" class="flex items-center text-slate-900">
				<RiArrowLeftSLine class="fill-current h-6 w-6 mr-1" />
				<span class="font-semibold">Voltar</span>
			</button>
			<div>
				<slot />
			</div>
		</div>
	</div>
</template>
