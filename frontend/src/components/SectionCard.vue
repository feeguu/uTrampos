<script setup lang="ts">
import { RiPencilLine, RiDeleteBinLine } from "vue-remix-icons"

interface SectionCardProps {
	title: string
	showOptions?: boolean
}

defineProps<SectionCardProps>()
</script>

<template>
	<div class="bg-white p-4 shadow rounded flex flex-col text-slate-900 gap-x-4 gap-y-2">
		<div class="flex flex-col gap-y-1">
			<h2 class="text-slate-900 font-semibold text-lg">
				{{ title }}
			</h2>
			<div class="text-neutral-500 flex flex-col gap-y-1">
				<slot />
			</div>
		</div>
		<div class="flex items-center justify-end gap-x-4 mt-1" v-if="showOptions">
			<IconButton title="Excluir" @click="$emit('delete')"
				><RiDeleteBinLine class="fill-slate-900 h-6 w-6"
			/></IconButton>
			<IconButton title="Editar" @click="$emit('edit')"
				><RiPencilLine class="fill-slate-900 h-6 w-6"
			/></IconButton>
		</div>
	</div>
</template>
