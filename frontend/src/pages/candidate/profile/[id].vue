<script setup lang="ts">
import { RiPencilLine, RiPhoneLine, RiMailLine, RiDeleteBinLine, RiArrowLeftSLine } from "vue-remix-icons"
import { ICreateResumeResponse } from "~/types/api"
import {
	SOCIAL_NETWORKS,
	EDUCATION_STATUS,
	EDUCATION_TYPES,
	EXPERIENCE_TIMES,
	LANGUAGE_LEVELS,
} from "~/types/enums/resume"

definePageMeta({
	middleware: "auth",
	allowedRoles: ["COMPANY"],
})

const route = useRoute()
const toast = useToast()

const { data: resume, error } = await useAPI<ICreateResumeResponse>(`/candidates/${route.params.id}/resume`)
</script>

<template>
	<div class="container flex-1 px-6 py-6 flex flex-col md:max-w-3xl gap-y-6 mx-auto">
		<template v-if="resume">
			<section class="flex flex-col gap-y-4">
				<BackButton />
				<div class="flex gap-x-4 justify-between">
					<div>
						<h1 class="text-2xl text-slate-900 font-medium font-lexend leading-none mb-2">
							{{ resume.candidate.user.name }}
						</h1>
						<h2 class="text-neutral-500 font-lexend leading-none empty:hidden">
							{{ resume.objective }}
						</h2>
					</div>
					<!-- <Dropdown v-if="resume">
						<button class="dropdown-option" @click="navigateTo('/candidate/resume')">
							<RiPencilLine class="fill-current h-6 w-6" />
							Editar
						</button>
						<button class="dropdown-option" @click="showDeleteResumeConfirmationModal = true">
							<RiDeleteBinLine class="fill-current h-6 w-6" />
							Excluir
						</button>
					</Dropdown> -->
				</div>
				<div class="flex flex-col gap-y-2 empty:hidden">
					<JobInfoIcon :icon="RiPhoneLine">{{ resume.candidate.user.phone }}</JobInfoIcon>
					<JobInfoIcon :icon="RiMailLine">{{ resume.candidate.user.email }}</JobInfoIcon>
				</div>
			</section>

			<main class="flex flex-col items-center gap-y-6">
				<Section title="Resumo" v-if="resume.description">
					<p class="whitespace-pre-wrap break-words">
						{{ resume.description }}
					</p>
				</Section>

				<Section title="Informações adicionais" v-if="resume.additionalInformation">
					<p class="whitespace-pre-wrap break-words">
						{{ resume.additionalInformation }}
					</p>
				</Section>

				<Section title="Redes sociais" v-if="resume.socialNetworks.length">
					<div
						class="bg-white p-4 shadow rounded flex flex-col justify-between text-slate-900 gap-x-4 gap-y-2 min-[480px]:flex-row min-[480px]:items-center"
						v-for="(socialNetwork, index) in resume.socialNetworks"
					>
						<div class="flex flex-col min-[480px]:flex-row gap-x-4 gap-y-1">
							<h2 class="text-slate-900 font-semibold">
								{{ SOCIAL_NETWORKS[socialNetwork.socialNetwork] }}
							</h2>
							<NuxtLink :href="socialNetwork.url" class="text-neutral-500">{{
								socialNetwork.url
							}}</NuxtLink>
						</div>
					</div>
				</Section>

				<Section title="Competências" v-if="resume.skills.length">
					<div
						class="bg-white p-4 shadow rounded flex flex-col justify-between text-slate-900 gap-x-4 gap-y-2 min-[480px]:flex-row min-[480px]:items-center"
						v-for="(skill, index) in resume.skills"
					>
						<div class="flex flex-col min-[480px]:flex-row gap-x-4 gap-y-1">
							<h2 class="text-slate-900 font-semibold">
								{{ skill.name }}
							</h2>
							<p class="text-neutral-500">{{ EXPERIENCE_TIMES[skill.experienceTime] }}</p>
						</div>
					</div>
				</Section>

				<Section title="Experiências profissionais" v-if="resume.professionalExperiences.length">
					<SectionCard
						:title="experience.position"
						v-for="(experience, index) in resume.professionalExperiences"
					>
						<p>{{ experience.company }}</p>
						<p>
							{{ `${formatDate(experience.startDate)} - ${formatDate(experience.endDate)}` }}
						</p>
						<p class="break-words whitespace-pre-wrap">
							{{ experience.description }}
						</p>
					</SectionCard>
				</Section>

				<Section title="Educação" v-if="resume.educations.length">
					<SectionCard :title="education.course" v-for="(education, index) in resume.educations">
						<p>{{ education.institution }}</p>
						<p>{{ EDUCATION_TYPES[education.educationType] }}</p>
						<p>{{ EDUCATION_STATUS[education.status] }}</p>
						<p>
							{{ `${formatDate(education.startDate)} - ${formatDate(education.endDate)}` }}
						</p>
					</SectionCard>
				</Section>

				<Section title="Projetos acadêmicos" v-if="resume.academicProjects.length">
					<SectionCard :title="project.title" v-for="(project, index) in resume.academicProjects">
						<p>
							{{ `${formatDate(project.startDate)} - ${formatDate(project.endDate)}` }}
						</p>
						<p class="break-words whitespace-pre-wrap">
							{{ project.description }}
						</p>
					</SectionCard>
				</Section>

				<Section title="Idiomas" v-if="resume.languages.length">
					<div
						class="bg-white p-4 shadow rounded flex flex-col justify-between text-slate-900 gap-x-4 gap-y-2 min-[480px]:flex-row min-[480px]:items-center"
						v-for="(language, index) in resume.languages"
					>
						<div class="flex flex-col min-[480px]:flex-row gap-x-4 gap-y-1">
							<h2 class="text-slate-900 font-semibold">
								{{ language.language }}
							</h2>
							<p class="text-neutral-500">{{ LANGUAGE_LEVELS[language.level] }}</p>
						</div>
					</div>
				</Section>
			</main>

			<!-- <footer class="flex gap-x-2">
				<Button
					class="!button-primary-outline md:w-auto"
					@click="showRejectApplyConfirmationModal = true"
				>
					<RiDeleteBinLine class="fill-current h-6 w-6" />
					Dispensar
				</Button>
				<Button class="md:w-auto">
					<RiPencilLine class="fill-current h-6 w-6" />
					Avançar
				</Button>
			</footer> -->
		</template>
		<template v-else>
			<div class="flex flex-col items-center gap-y-4 mt-16" v-if="!resume">
				<h1 class="text-lg text-center text-slate-900 font-medium font-lexend">
					Nenhum currículo encontrado
				</h1>
				<Button @click="$router.back()" class="md:w-auto">Voltar</Button>
			</div>
		</template>
	</div>
</template>
