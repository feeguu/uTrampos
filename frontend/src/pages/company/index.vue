<script setup lang="ts">
import type { IJob } from "~/types/api"

definePageMeta({
	middleware: "auth",
	allowedRoles: ["COMPANY"],
})

const toast = useToast()
const { user } = useAuth()
const jobs = ref<IJob[] | null>(null)

const { data, error } = await useAPI<IJob[]>("/companies/jobs")
jobs.value = data
</script>
<template>
	<div class="flex-1 flex flex-col p-6">
		<section class="flex flex-col w-full max-w-6xl mx-auto md:px-0">
			<h1 class="text-2xl text-slate-900 font-lexend font-medium mb-6">{{ user?.name }}</h1>
			<div class="mb-4 flex flex-col items-start justify-between md:flex-row md:items-center">
				<div class="mb-2">
					<h1 class="text-2xl text-slate-900 font-lexend font-medium">Gerenciar Vagas</h1>
					<p class="text-neutral-500 mt-1">Vagas publicadas: {{ jobs?.length ?? 0 }}</p>
				</div>
				<LinkButton href="/jobs/create" class="!button-secondary !w-fit">Nova vaga</LinkButton>
			</div>
			<div v-if="jobs?.length" class="grid md:grid-cols-2 gap-4">
				<JobCard
					v-for="job in jobs"
					:id="job.id"
					:slug="job.slug"
					:title="job.title"
					:company="job.company.user.name"
					:local="job.address"
					:salary="job.salary"
					:contract="job.contractType"
					:keywords="job.keywords"
					favorite
					already-hired
				/>
			</div>
			<div class="text-center text-neutral-500 mt-16 px-4" v-else>
				<h2 class="text-lg font-semibold mb-2">
					Não foi possível encontrar vagas para os filtros selecionados.
				</h2>
				<p>Por favor, tente novamente com outros critérios de busca.</p>
			</div>
		</section>
	</div>
</template>
