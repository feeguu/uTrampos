<script setup>
import { RiAddLine } from "vue-remix-icons"

const section = reactive({
	title: "",
	description: "",
	order: 0,
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
</script>

<template>
	<div class="flex-1">
		<form class="flex flex-col gap-y-6 w-full max-w-2xl mx-auto p-6" @submit.prevent="">
			<h1 class="text-2xl text-slate-900 font-lexend font-medium mb-2">
				Cadastrar <span class="text-sky-500">Vaga</span>
			</h1>
			<Input label-text="Título" placeholder="Ex.: Auxiliar Administrativo" />
			<Textarea label-text="Descrição" />
			<Input
				label-text="Endereço"
				placeholder="Ex.: Av. Paulista, 2023 - Bela Vista - São Paulo - SP"
			/>
			<div class="flex flex-col gap-x-2 gap-y-6 min-[480px]:flex-row">
				<Input label-text="Salário" container-class="flex-[2]" />
				<Select label-text="Tipo de contrato" container-class="flex-1">
					<option disabled value="">Selecione</option>
					<option value="CLT">CLT</option>
					<option value="PJ">PJ</option>
					<option value="INTERNSHIP">Estágio</option>
					<option value="TEMPORARY">Temporário</option>
					<option value="OTHER">Outro</option>
				</Select>
			</div>
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
					/>
					<Textarea
						label-text="Descrição da seção"
						v-model="section.description"
						placeholder="Ex.: Vale-transporte, adicional noturno, 14º salário"
					/>
					<Button class="!w-fit" theme="secondary" type="submit">
						<RiAddLine class="fill-current h-6 w-6" />
						Adicionar Seção
					</Button>
				</form>
			</section>
			<Button type="submit">Salvar Vaga</Button>
		</form>
	</div>
</template>
