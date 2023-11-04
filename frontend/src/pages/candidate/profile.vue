<script setup lang="ts">
import { RiUser3Line, RiPhoneLine, RiMailLine, RiMapPinLine, RiPencilLine, RiAddLine } from "vue-remix-icons"
import { ICreateResumeResponse } from "~/types/api"

definePageMeta({
	middleware: "auth",
	allowedRoles: ["CANDIDATE"],
})

const auth = useAuth()

const { data: resume, error } = await useAPI<ICreateResumeResponse>(`/resumes`)
</script>

<template>
	<ActionBar />
	<main class="flex-1 p-6 flex flex-col gap-y-6 max-w-5xl mx-auto w-full">
		<section class="flex flex-col gap-y-4">
			<div>
					<h1 class="text-2xl text-slate-900 font-medium font-lexend leading-normal">
						{{ auth.user?.name }}
					</h1>
					<h2 class="text-neutral-500 font-lexend text-lg leading-normal md:text-xl" v-if="resume?.objective">
						{{ resume?.objective }}
					</h2>
				</div>
			<div class="flex flex-col gap-y-2">
				<JobInfoIcon :icon="RiPhoneLine" class="!text-base">{{ auth.user?.phone }}</JobInfoIcon>
				<JobInfoIcon :icon="RiMailLine" class="!text-base">{{ auth.user?.email }}</JobInfoIcon>
				<!-- <JobInfoIcon :icon="RiMapPinLine" class="!text-base">{{ TODO }}</JobInfoIcon> -->
			</div>
		</section>
		<template v-if="resume">
			<section class="flex flex-col gap-y-3">
				<h1 class="text-lg text-slate-900 font-medium font-lexend">Resumo</h1>
				<p class="whitespace-pre-wrap">{{ resume.description }}</p>
			</section>
			<section class="flex flex-col gap-y-3" v-if="resume?.educations.length">
				<h1 class="text-lg text-slate-900 font-medium font-lexend">Escolaridade</h1>
				<div class="bg-white p-4 shadow rounded" v-for="education in resume.educations">
					<h2 class="text-slate-900 font-semibold mb-2">
						{{ education.course }}
					</h2>
					<div class="text-sm text-neutral-500 font-medium">
						<p>{{ education.institution }}</p>
						<p>{{ formatDate(education.startDate) }} - {{ formatDate(education.endDate) }}</p>
					</div>
				</div>
			</section>
			<section class="flex flex-col gap-y-3" v-if="resume?.professionalExperiences.length">
				<h1 class="text-lg text-slate-900 font-medium font-lexend">Experiência Profissional</h1>
				<div class="bg-white p-4 shadow rounded" v-for="experience in resume.professionalExperiences">
					<h2 class="text-slate-900 font-semibold mb-2">
						{{ experience.company }}
					</h2>
					<div class="flex flex-col gap-y-1 text-sm text-neutral-500 font-medium">
						<p>{{ formatDate(experience.startDate) }} - {{ formatDate(experience.endDate) }}</p>
						<p>{{ experience.description }}</p>
					</div>
				</div>
			</section>
		</template>

		<template v-else>
		<div class="flex flex-col items-center text-center text-neutral-500 mt-16 px-4">
			<h2 class="text-lg font-semibold mb-2">
				Você não possui nenhum currículo.
			</h2>
			<p>Por favor, crie um currículo para poder se candidatar às vagas.</p>
			<LinkButton href="/candidate/resume" class="!w-fit mt-8">Cadastrar currículo</LinkButton>
		</div>
	</template>
	</main>
</template>
