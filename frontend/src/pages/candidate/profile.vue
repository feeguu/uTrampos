<script setup lang="ts">
import { RiUser3Line, RiPhoneLine, RiMailLine, RiMapPinLine, RiPencilLine, RiAddLine } from "vue-remix-icons"
import { ICreateResumeResponse } from "~/types/api"

definePageMeta({
	middleware: "auth",
	allowedRoles: ["CANDIDATE"],
})

const auth = useAuth()

const { data: resume, error } = await useAPI<ICreateResumeResponse>(`/resumes`)

if (!resume) navigateTo("/candidate/resume")

const name = "Kayky de Sousa"
const objective = "Desenvolvedor Front-end"
const phone = "+55 11 91234-1234"
const email = "kaykydesousa@gmail.com"
const local = "São Paulo, SP"
</script>
<template>
	<ActionBar />
	<main class="flex-1 p-6 flex flex-col gap-y-6 max-w-5xl mx-auto w-full">
		<section class="flex flex-col gap-y-4">
			<div class="flex flex-col md:flex-row gap-x-4">
				<RiUser3Line class="fill-slate-900 h-12 w-12 md:h-16 md:w-16 flex-shrink-0" />
				<div>
					<h1 class="text-2xl text-slate-900 font-medium font-lexend leading-normal">
						{{ auth.user?.name }}
					</h1>
					<h2 class="text-neutral-500 font-lexend text-lg leading-normal md:text-xl">
						{{ resume?.objective }}
					</h2>
				</div>
			</div>
			<div class="flex flex-col gap-y-2">
				<JobInfoIcon :icon="RiPhoneLine" class="!text-base">{{ auth.user?.phone }}</JobInfoIcon>
				<JobInfoIcon :icon="RiMailLine" class="!text-base">{{ auth.user?.email }}</JobInfoIcon>
				<!-- <JobInfoIcon :icon="RiMapPinLine" class="!text-base">{{ TODO }}</JobInfoIcon> -->
			</div>
		</section>
		<section class="flex flex-col gap-y-3">
			<h1 class="text-lg text-slate-900 font-medium font-lexend">Resumo</h1>
			<p class="whitespace-pre-wrap">{{ resume?.description }}</p>
		</section>
		<section class="flex flex-col gap-y-3">
			<h1 class="text-lg text-slate-900 font-medium font-lexend">Escolaridade</h1>
			<div class="bg-white p-4 shadow rounded">
				<h2 class="text-slate-900 font-semibold mb-2">
					Graduação em Desenvolvimento de Software Multiplataforma
				</h2>
				<div class="text-sm text-neutral-500 font-medium">
					<p>FATEC da Zona Leste</p>
					<p>São Paulo, SP</p>
					<p>02/2023 - 12/2025 (Cursando)</p>
					<p>Período: Manhã • Modelo: Presencial</p>
				</div>
			</div>
		</section>
	</main>
</template>
