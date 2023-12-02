<script setup lang="ts">
import { RiAddLine, RiDraggable, RiArrowDownSLine, RiDeleteBinLine, RiPencilLine } from "vue-remix-icons"
import { ICreateJobsRequest } from "~/types/api"

definePageMeta({
	middleware: "auth",
	allowedRoles: ["ADMIN", "COMPANY"],
})

const formStep = ref(1)
const sectionAccordeon = ref<number | null>(null)
const toast = useToast()
const route = useRoute()

const job = ref<ICreateJobsRequest>({
	title: "",
	description: "",
	address: "",
	salary: 0,
	contractType: "",
	keywords: [],
	sections: [],
})

const { data, error } = await useAPI<any>(`/jobs/${route.params.slug}`)
job.value = data

async function handleSubmit() {
	console.log(job)

	const { data, error } = await useAPI(`/jobs/${route.params.slug}`, {
		method: "PATCH",
		body: JSON.stringify(job.value),
	})

	if (error || !data) return

	toast.success("Vaga atualizada com sucesso!")
	navigateTo("/")
}
</script>

<template>
	<div class="flex-1 p-6 flex items-center">
		<div class="max-w-2xl w-full mx-auto">
			<BackButton class="mb-4" />
			<Steps
				class="mb-6"
				:steps="['Título e descrição', 'Informações adicionais', 'Seções']"
				@stepClick="(step) => (formStep = step)"
				:current-step="formStep"
			/>
			<form class="flex flex-col gap-y-6 w-full" v-if="formStep === 1" @submit.prevent="formStep++">
				<div class="mb-4">
					<h1 class="text-2xl text-slate-900 font-lexend font-medium">Cadastrar Vaga</h1>
					<p class="text-neutral-500 mt-1">
						Dê vida à sua vaga! Crie um título e uma descrição que chamem a atenção dos
						candidatos.
					</p>
				</div>
				<Input label-text="Título" placeholder="Ex.: Auxiliar Administrativo" v-model="job.title" />
				<Textarea label-text="Descrição" v-model="job.description" />
				<Button type="submit">Continuar</Button>
			</form>

			<form class="flex flex-col gap-y-6 w-full" v-if="formStep === 2" @submit.prevent="formStep++">
				<div class="mb-4">
					<h1 class="text-2xl text-slate-900 font-lexend font-medium">Informações Adicionais</h1>
					<p class="text-neutral-500 mt-1">
						Fornecer detalhes é a chave! Informe o endereço, salário, tipo de contrato e
						palavras-chave para otimizar a busca por talentos.
					</p>
				</div>
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
				<KeywordInput v-model="job.keywords" />
				<Button type="submit">Continuar</Button>
			</form>

			<form class="flex flex-col gap-y-6 w-full" v-if="formStep === 3" @submit.prevent="handleSubmit">
				<div class="mb-4">
					<h1 class="text-2xl text-slate-900 font-lexend font-medium">Seções</h1>
					<p class="text-neutral-500 mt-1">
						Sua vaga, suas regras! Personalize seções com títulos e descrições que destaquem os
						aspectos únicos da sua vaga.
					</p>
				</div>

				<DynamicSections v-model="job.sections">
					<template #sections="{ deleteSection, editSection }">
						<section
							class="flex flex-col gap-y-3 bg-white px-4 py-3 shadow rounded"
							v-for="(section, index) in job.sections"
						>
							<div
								class="flex items-center cursor-pointer"
								@click="
									sectionAccordeon === index
										? (sectionAccordeon = null)
										: (sectionAccordeon = index)
								"
							>
								<RiDraggable class="h-6 w-6 fill-slate-900 cursor-grab" />
								<h1 class="ml-2 text-lg text-slate-900 font-medium font-lexend">
									{{ section.title }}
								</h1>
								<RiArrowDownSLine
									:class="[
										'ml-auto h-6 w-6 fill-slate-900 cursor-pointer transition-transform',
										sectionAccordeon === index ? 'rotate-0' : 'rotate-180',
									]"
								/>
							</div>
							<div
								:class="[
									'w-full flex flex-col overflow-hidden transition-all duration-300',
									sectionAccordeon !== null && sectionAccordeon === index
										? 'h-auto'
										: 'h-0 -mt-3',
								]"
							>
								<p class="break-words whitespace-pre-wrap">
									{{ section.description }}
								</p>
								<div class="flex items-center justify-end gap-x-4">
									<IconButton title="Excluir" @click="deleteSection(index)"
										><RiDeleteBinLine class="fill-slate-900 h-6 w-6"
									/></IconButton>
									<IconButton title="Editar" @click="editSection(index)"
										><RiPencilLine class="fill-slate-900 h-6 w-6"
									/></IconButton>
								</div>
							</div>
						</section>
					</template>

					<template #form="{ formData }">
						<Input
							label-text="Título da seção"
							v-model="formData.title"
							placeholder="Ex.: Benefícios"
							required
						/>
						<Textarea
							label-text="Descrição da seção"
							v-model="formData.description"
							placeholder="Ex.: Vale-transporte, adicional noturno, 14º salário"
							required
						/>
						<Button class="!button-secondary !w-fit" type="submit" @click="formData.order = 1">
							<RiAddLine class="fill-current h-6 w-6" />
							Adicionar Seção
						</Button>
					</template>
				</DynamicSections>

				<Button type="submit">Publicar Vaga</Button>
			</form>
		</div>
	</div>
</template>
