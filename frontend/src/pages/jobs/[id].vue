<script setup lang="ts">
import {
	RiBuildingLine,
	RiMapPinLine,
	RiMoneyDollarCircleLine,
	RiFileList3Line,
	RiBriefcaseLine,
	RiBookmarkFill,
} from "vue-remix-icons"

const showConfirmationModal = ref(false)

// These data will be fetched from the API
const local = "Remoto"
const salary = 2000
const contract = "CLT"
const alreadyHired = true
const favorite = true
const keywords = ["HTML", "CSS", "JavaScript", "TypeScript"]
</script>

<template>
	<ActionBar>
		<button class="p-1" title="Salvar vaga">
			<RiBookmarkFill
				:style="!favorite && 'fill: #d4d4d4'"
				class="fill-sky-500 h-6 w-6 transition-colors hover:!fill-sky-300"
			/>
		</button>
	</ActionBar>
	<main class="flex-1 p-6 flex flex-col gap-y-6 max-w-5xl mx-auto w-full">
		<section class="flex flex-col gap-y-4">
			<div class="flex gap-x-4 justify-between">
				<div class="flex flex-col md:flex-row gap-x-4">
					<RiBuildingLine class="fill-slate-900 h-12 w-12 md:h-16 md:w-16 flex-shrink-0" />
					<div>
						<h1 class="text-2xl text-slate-900 font-medium font-lexend leading-normal">
							Desenvolvedor Front-end Jr.
						</h1>
						<h2
							class="text-neutral-500 font-medium font-lexend text-lg leading-normal md:text-xl"
						>
							Microsoft
						</h2>
					</div>
				</div>
				<Button @click="showConfirmationModal = true" class="hidden md:block md:w-auto"
					>Candidatar-se</Button
				>
			</div>
			<div class="flex flex-col gap-y-2" v-if="local || salary || contract || alreadyHired">
				<JobInfoIcon :icon="RiMapPinLine" class="!text-base" v-if="local">{{ local }}</JobInfoIcon>
				<JobInfoIcon :icon="RiMoneyDollarCircleLine" class="!text-base" v-if="salary">{{
					formatToBRL(salary)
				}}</JobInfoIcon>
				<JobInfoIcon :icon="RiFileList3Line" class="!text-base" v-if="contract">{{
					contract
				}}</JobInfoIcon>
				<JobInfoIcon :icon="RiBriefcaseLine" class="!text-base" v-if="alreadyHired"
					>Já contratou pela&nbsp;<span class="font-lexend font-medium"
						><span class="text-sky-500">u</span>Trampos</span
					></JobInfoIcon
				>
			</div>
			<div class="flex flex-wrap gap-2" v-if="keywords?.length">
				<JobKeyword v-for="keyword in keywords" class="!text-base">{{ keyword }}</JobKeyword>
			</div>
		</section>
		<section>
			<h1 class="text-lg text-slate-900 font-medium font-lexend mb-2">Descrição</h1>
			<p class="whitespace-pre-wrap">
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum venenatis placerat odio,
				vitae tincidunt purus euismod ac. Phasellus sed purus aliquet, bibendum nibh nec, fringilla
				neque. Maecenas ac commodo nisi. Suspendisse id felis at enim aliquam pharetra. Donec sed sem
				bibendum sem gravida facilisis non in felis.
			</p>
		</section>
		<section>
			<h1 class="text-lg text-slate-900 font-medium font-lexend mb-2">Descrição</h1>
			<p class="whitespace-pre-wrap">
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum venenatis placerat odio,
				vitae tincidunt purus euismod ac. Phasellus sed purus aliquet, bibendum nibh nec, fringilla
				neque. Maecenas ac commodo nisi. Suspendisse id felis at enim aliquam pharetra. Donec sed sem
				bibendum sem gravida facilisis non in felis.
			</p>
		</section>
		<section>
			<h1 class="text-lg text-slate-900 font-medium font-lexend mb-2">Descrição</h1>
			<p class="whitespace-pre-wrap">
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum venenatis placerat odio,
				vitae tincidunt purus euismod ac. Phasellus sed purus aliquet, bibendum nibh nec, fringilla
				neque. Maecenas ac commodo nisi. Suspendisse id felis at enim aliquam pharetra. Donec sed sem
				bibendum sem gravida facilisis non in felis.
			</p>
		</section>
	</main>
	<footer class="bg-white w-full border-t border-neutral-300 md:bg-transparent md:border-0">
		<div class="w-full p-6 md:max-w-5xl md:mx-auto md:pt-2">
			<Button @click="showConfirmationModal = true" class="md:w-auto px-12">Candidatar-se</Button>
		</div>
	</footer>
	<Modal :show="showConfirmationModal" />
</template>
