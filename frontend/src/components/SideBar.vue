<script setup lang="ts">
import { RiCloseLine } from "vue-remix-icons"

interface SideBarProps {
	show: boolean
	title?: string
}

defineProps<SideBarProps>()
</script>

<template>
	<aside
		v-if="show"
		class="rounded-l shadow bg-white w-full h-full fixed top-0 p-6 right-0 z-50 flex flex-col gap-y-6 min-[480px]:max-w-sm"
	>
		<div class="flex justify-between items-center">
			<h1 class="text-lg font-medium text-slate-900 font-lexend">
				<template v-if="title">
					{{ title }}
				</template>
				<template v-else>
					<Logo class="!text-2xl" />
				</template>
			</h1>
			<IconButton class="self-end" @click="$emit('close')">
				<RiCloseLine class="h-6 w-6 fill-slate-900" />
			</IconButton>
		</div>
		<div class="flex-1 flex flex-col gap-y-6">
			<slot />
		</div>
	</aside>
</template>
