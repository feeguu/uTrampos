<script setup>
import { RiAddLine } from "vue-remix-icons"

const section = reactive({
	title: "",
	description: "",
	order: 1,
})

const job = reactive({
	title: "",
	description: "",
	address: "",
	salary: "",
	contractType: "",
	keywords: [],
	sections: [],
})

function handleSectionSubmit() {
	job.sections.push({ ...section })
	section.title = ""
	section.description = ""
	section.order++
}

async function handleSubmit() {
	const { data, error } = await useAPI("/jobs", {
		method: "POST",
		body: JSON.stringify(job),
	})

	if (error || !data) {
		const errorMessage = error?.data?.message ?? "Algo deu errado. Tente novamente mais tarde."
		console.error(errorMessage)
		toast.error(Array.isArray(errorMessage) ? errorMessage.join("\n") : errorMessage)
		return
	}

	navigateTo("/jobs")
}
</script>

<template>
	<div class="flex-1 flex flex-col gap-y-6 w-full max-w-2xl mx-auto p-6">
		<form id="create-job-form" class="flex flex-col gap-y-6 w-full" @submit.prevent="handleSubmit">
			<h1 class="text-2xl text-slate-900 font-lexend font-medium mb-2">
				Cadastrar <span class="text-sky-500">Vaga</span>
			</h1>
			<Input label-text="Título" placeholder="Ex.: Auxiliar Administrativo" v-model="job.title" />
			<Textarea label-text="Descrição" v-model="job.description" />
			<Input
				label-text="Endereço"
				placeholder="Ex.: Av. Paulista, 2023 - Bela Vista - São Paulo - SP"
				v-model="job.address"
			/>
			<div class="flex flex-col gap-x-2 gap-y-6 min-[480px]:flex-row">
				<Input label-text="Salário" container-class="flex-[2]" v-model.number="job.salary" />
				<Select label-text="Tipo de contrato" container-class="flex-1" v-model="job.contractType">
					<option disabled value="">Selecione</option>
					<option value="CLT">CLT</option>
					<option value="PJ">PJ</option>
					<option value="INTERNSHIP">Estágio</option>
					<option value="TEMPORARY">Temporário</option>
					<option value="OTHER">Outro</option>
				</Select>
			</div>
		</form>
		<KeywordInput v-model="job.keywords" />
		<section class="flex flex-col gap-y-6 w-full">
			<h2 class="text-2xl text-slate-900 font-lexend font-medium">Seções</h2>
			<section
				class="flex flex-col gap-y-3 bg-white p-4 shadow rounded"
				v-for="section in job.sections"
			>
				<h1 class="text-lg text-slate-900 font-medium font-lexend">{{ section.title }}</h1>
				<p class="whitespace-pre-wrap">{{ section.description }}</p>
			</section>
			<form class="flex flex-col gap-y-6 w-full" @submit.prevent="handleSectionSubmit">
				<Input
					label-text="Título da seção"
					v-model="section.title"
					placeholder="Ex.: Benefícios"
					required
				/>
				<Textarea
					label-text="Descrição da seção"
					v-model="section.description"
					placeholder="Ex.: Vale-transporte, adicional noturno, 14º salário"
					required
				/>
				<Button class="!w-fit" theme="secondary" type="submit">
					<RiAddLine class="fill-current h-6 w-6" />
					Adicionar Seção
				</Button>
			</form>
		</section>
		<Button type="submit" form="create-job-form">Salvar Vaga</Button>
	</div>
</template>
