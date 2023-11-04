<script setup lang="ts">
import {
	RiBuildingLine,
	RiMapPinLine,
	RiMoneyDollarCircleLine,
	RiFileList3Line,
	RiBriefcaseLine,
	RiBookmarkFill,
} from "vue-remix-icons"
import type { IJob } from "~/types/api"

const showConfirmationModal = ref(false)

const route = useRoute()

const { data: job, error } = await useAPI<IJob>(`/jobs/${route.params.slug}`)

const alreadyHired = true
const favorite = true
</script>

<template>
	<template v-if="job">
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
								{{ job.title }}
							</h1>
							<h2 class="text-neutral-500 font-lexend text-lg leading-normal md:text-xl">
								{{ job.company.user.name }}
							</h2>
						</div>
					</div>
					<Button @click="showConfirmationModal = true" class="hidden md:block md:w-auto"
						>Candidatar-se</Button
					>
				</div>
				<div
					class="flex flex-col gap-y-2"
					v-if="job.address || job.salary || job.contractType || alreadyHired"
				>
					<JobInfoIcon :icon="RiMapPinLine" class="!text-base" v-if="job.address">{{
						job.address
					}}</JobInfoIcon>
					<JobInfoIcon :icon="RiMoneyDollarCircleLine" class="!text-base" v-if="job.salary">{{
						formatToBRL(job.salary)
					}}</JobInfoIcon>
					<JobInfoIcon :icon="RiFileList3Line" class="!text-base" v-if="job.contractType">{{
						"TO DO"
					}}</JobInfoIcon>
					<JobInfoIcon :icon="RiBriefcaseLine" class="!text-base" v-if="alreadyHired"
						>Já contratou pela&nbsp;<span class="font-lexend font-medium"
							><span class="text-sky-500">u</span>Trampos</span
						></JobInfoIcon
					>
				</div>
				<div class="flex flex-wrap gap-2" v-if="job.keywords?.length">
					<JobKeyword v-for="keyword in job.keywords" class="!text-base">{{ keyword }}</JobKeyword>
				</div>
			</section>
			<section class="flex flex-col gap-y-3" v-for="section in job.sections">
				<h1 class="text-lg text-slate-900 font-medium font-lexend">{{ section.title }}</h1>
				<p class="whitespace-pre-wrap">{{ section.description }}</p>
			</section>
		</main>
		<footer class="bg-white w-full border-t border-neutral-300 md:bg-transparent md:border-0">
			<div class="w-full p-6 md:max-w-5xl md:mx-auto md:pt-2">
				<Button @click="showConfirmationModal = true" class="md:w-auto px-12">Candidatar-se</Button>
			</div>
		</footer>
		<ModalContainer :show="showConfirmationModal" @close="showConfirmationModal = false">
			<span
				class="font-lexend text-sky-500 text-3xl font-black leading-[3rem] text-center h-12 w-12 bg-sky-500 bg-opacity-20 rounded-full"
				>!</span
			>
			<p class="text-xl text-slate-900 font-semibold">Deseja Continuar?</p>
			<p class="text-neutral-500">
				Você está prestes a confirmar sua candidatura para a vaga de emprego. Por favor, revise seu
				currículo com atenção antes de prosseguir.
			</p>
			<div class="flex w-full flex-col gap-y-2">
				<LinkButton href="/candidate/profile">Revisar Currículo</LinkButton>
				<Button>Continuar</Button>
			</div>
		</ModalContainer>
	</template>

	<template v-else>
		<div class="flex-1 flex flex-col justify-center items-center text-center text-neutral-500 p-4">
			<h2 class="text-lg font-semibold mb-2">
				Não foi possível encontrar a vaga que você está procurando.
			</h2>
			<p>Contate a empresa responsável pela vaga para mais detalhes.</p>
			<LinkButton href="/jobs" class="!w-fit mt-8">Voltar para vagas</LinkButton>
		</div>
	</template>
</template>
