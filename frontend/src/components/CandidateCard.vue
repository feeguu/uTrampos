<script setup lang="ts">
import { Apply } from "~/types/api"

interface CandidateCardProps {
	apply: Apply
}

defineProps<CandidateCardProps>()
</script>

<template>
	<div
		class="relative p-6 bg-white shadow rounded w-full h-full gap-y-4 flex flex-col transition-transform group hover:-translate-y-1"
	>
		<div class="flex justify-between items-start">
			<div class="flex flex-col gap-y-1 mb-auto">
				<h2
					class="placeholder:text-lg text-slate-900 font-semibold leading-normal transition-colors group-hover:text-sky-500"
				>
					<NuxtLink :href="`/candidate/profile/${apply.candidate.user.id}`">
						{{ apply.candidate.user.name }}
					</NuxtLink>
				</h2>
				<h3 class="text-neutral-500 font-semibold">{{ apply.candidate.resume.objective }}</h3>
			</div>

			<div
				class="bg-neutral-100 border text-sm border-neutral-300 text-neutral-500 py-0.5 px-1 rounded"
			>
				{{ apply.status }}
			</div>
		</div>
		<p>{{ apply.candidate.resume.description }}</p>
		<div class="flex flex-col items-center gap-2 md:flex-row">
			<Button class="!button-primary-outline" @click.prevent="$emit('reject')">Dispensar</Button>
			<Button class="!button-secondary" @click.prevent="$emit('proceed')">Avançar</Button>
		</div>
	</div>
</template>
