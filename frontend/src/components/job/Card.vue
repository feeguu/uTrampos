<script setup lang="ts">
import {
	RiBuildingLine,
	RiMapPinLine,
	RiMoneyDollarCircleLine,
	RiFileList3Line,
	RiBriefcaseLine,
	RiBookmarkFill,
} from "vue-remix-icons"

interface JobCardProps {
	id: string
	slug: string
	title: string
	company: string
	local?: string
	salary?: number
	contract?: string
	alreadyHired?: boolean
	favorite?: boolean
	keywords?: string[]
}

defineProps<JobCardProps>()
</script>

<template>
	<NuxtLink :href="`/jobs/${slug}`" class="group">
		<div
			class="relative p-6 bg-white shadow rounded w-full h-full gap-y-4 flex flex-col transition-transform group-hover:-translate-y-1"
		>
			<button class="absolute top-0 right-6 -mt-0.5 pb-1 px-1" title="Salvar vaga">
				<RiBookmarkFill
					:style="!favorite && 'fill: #d4d4d4'"
					class="fill-sky-500 h-6 w-6 transition-colors hover:!fill-sky-300"
				/>
			</button>
			<div class="flex flex-col gap-y-2 gap-x-5 min-[320px]:flex-row mb-auto">
				<RiBuildingLine class="fill-slate-900 h-12 w-12 flex-shrink-0" />
				<div>
					<h2
						class="text-lg text-slate-900 font-semibold leading-normal transition-colors group-hover:text-sky-500"
					>
						{{ title }}
					</h2>
					<h3 class="text-neutral-500 font-semibold">{{ company }}</h3>
				</div>
			</div>
			<div class="flex flex-wrap gap-x-4 gap-y-2" v-if="local || salary || contract || alreadyHired">
				<JobInfoIcon :icon="RiMapPinLine" v-if="local">{{ local }}</JobInfoIcon>
				<JobInfoIcon :icon="RiMoneyDollarCircleLine" v-if="salary">{{
					formatToBRL(salary)
				}}</JobInfoIcon>
				<JobInfoIcon :icon="RiFileList3Line" v-if="contract">{{ contract }}</JobInfoIcon>
				<JobInfoIcon :icon="RiBriefcaseLine" v-if="alreadyHired"
					>Já contratou pela&nbsp;<span class="font-lexend font-medium"
						><span class="text-sky-500">u</span>Trampos</span
					></JobInfoIcon
				>
			</div>
			<div class="flex flex-wrap gap-2" v-if="keywords?.length">
				<JobKeyword v-for="keyword in keywords">{{ keyword }}</JobKeyword>
			</div>
		</div>
	</NuxtLink>
</template>
