<script setup lang="ts">
import { RiFilter3Fill } from "vue-remix-icons"
import type { IJob } from "~/types/api"

const toast = useToast()

const { data: jobs, error } = await useAPI<IJob[]>("/jobs")

if (error) {
	const errorMessage = error?.data?.message ?? "Algo deu errado. Tente novamente mais tarde."
	console.error(errorMessage)
	toast.error(Array.isArray(errorMessage) ? errorMessage.join("\n") : errorMessage)
}
</script>
<template>
	<div class="bg-neutral-100 flex-1 md:pt-6 md:px-6">
		<form
			class="bg-white p-6 gap-y-4 gap-x-3 flex flex-col shadow rounded max-w-6xl mx-auto md:flex-row md:items-end"
		>
			<h1 class="sr-only">Buscar vagas</h1>
			<Input label-text="Palavras-chave" container-class="md:flex-[2]" />
			<Input label-text="Local" container-class="md:flex-[2]" />
			<Button class="md:flex-1">Pesquisar</Button>
		</form>
		<main class="flex flex-col px-4 pb-6 mt-5 max-w-6xl mx-auto md:px-0">
			<div class="flex items-center justify-between mb-4 gap-x-4 md:px-4">
				<div>
					<h1 class="text-2xl text-slate-900 font-lexend font-medium">Vagas</h1>
					<p class="text-neutral-500">Vagas disponíveis: 20</p>
				</div>
				<button
					class="text-slate-900 flex justify-center items-center py-1 px-2 -mr-2 rounded transition-colors hover:text-sky-500"
				>
					<span class="font-semibold mr-1">Filtrar</span>
					<RiFilter3Fill class="fill-current h-6 w-6" />
				</button>
			</div>
			<div v-if="jobs" class="grid md:grid-cols-2 gap-4">
				<!-- <JobCard
					id="1"
					title="Desenvolvedor Front-end Jr."
					company="Microsoft"
					local="Remoto"
					:salary="2000"
					contract="CLT"
					favorite
					already-hired
					:keywords="['Javascript', 'Front-end', 'React']"
				/>
				<JobCard
					id="2"
					title="Estágiário Back-end"
					company="IBM"
					local="São Paulo - SP"
					:salary="1500"
					contract="Estágio"
					:keywords="['PHP', 'Laravel', 'Eloquent ORM', 'Período Manhã']"
				/>
				<JobCard
					id="3"
					title="Estagiário"
					company="FATEC da Zona Leste"
					local="Cidade A.E. Carvalho, São Paulo - SP"
					:salary="1300"
					contract="Estágio"
					favorite
					already-hired
					:keywords="['2º Semestre', 'DSM', 'Período Tarde']"
				/>
				<JobCard
					id="4"
					title="Estagiário"
					company="FATEC da Zona Leste"
					local="Cidade A.E. Carvalho, São Paulo - SP"
					:salary="1300"
					contract="Estágio"
					already-hired
					:keywords="['2º Semestre', 'DSM', 'Período Tarde']"
				/> -->
				<JobCard
					v-for="job in jobs"
					:id="job.id"
					:slug="job.slug"
					:title="job.title"
					:company="job.company.user.name"
					:local="job.address"
					:salary="job.salary"
					contract="TO DO"
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
		</main>
	</div>
</template>
