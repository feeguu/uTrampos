<script setup lang="ts">
import { RiMenu3Fill } from "vue-remix-icons"
</script>

<template>
	<header
		class="z-40 h-20 w-full bg-white sticky top-0 left-0 px-6 flex items-center justify-between border-neutral-300 border-b"
	>
		<Logo class="!text-2xl" />
		<button>
			<RiMenu3Fill class="fill-slate-900 h-6 w-6" />
		</button>
	</header>
</template>
