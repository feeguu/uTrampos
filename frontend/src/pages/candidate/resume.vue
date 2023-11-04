<script setup lang="ts">
import { RiAddLine } from "vue-remix-icons"

const toast = useToast()

const professionalExperience = reactive({
	company: "",
	position: "",
	description: "",
    startDate: "",
    endDate: ""
})

const education = reactive({
	institution: "",
	educationType: "GRADUATION",
	status: "IN_PROGRESS",
	startDate: "",
	endDate: "",
	course: ""
})

const resume = reactive({
    objective: "",
    description: "",
    additionalInformation: "",
	skills: [],
    professionalExperiences: [],
	academicProjects: [],
	languages: [],
	socialNetworks: [],
	educations: []
})

function handleProfessionalExperienceSubmit() {
    resume.professionalExperiences.push({ ...professionalExperience })
	professionalExperience.company = ""
	professionalExperience.position = ""
	professionalExperience.description = ""
	professionalExperience.startDate = ""
	professionalExperience.endDate = ""
}

function handleEducationSubmit() {
	resume.educations.push({ ...education })
	education.course = ""
	education.educationType = "GRADUATION"
	education.endDate = ""
	education.startDate = ""
	education.institution = ""
	education.status = "IN_PROGRESS"
}

async function handleSubmit() {
	const { data, error } = await useAPI("/resumes", {
		method: "POST",
		body: JSON.stringify(resume),
	})

	if (error || !data) {
		const errorMessage = error?.data?.message ?? "Algo deu errado. Tente novamente mais tarde."
		console.error(errorMessage)
		toast.error(Array.isArray(errorMessage) ? errorMessage.join("\n") : errorMessage)
		return
	}

	navigateTo("/candidate/profile")
}

</script>
<template>
    <div class="flex-1 flex flex-col gap-y-6 w-full max-w-2xl mx-auto p-6">
		<form id="resume-form" class="flex flex-col gap-y-6 w-full" @submit.prevent="handleSubmit">
			<h1 class="text-2xl text-slate-900 font-lexend font-medium mb-2">
				Cadastrar <span class="text-sky-500">Currículo</span>
			</h1>
			<Input label-text="Objetivo" placeholder="Ex.: Desenvolvedor Front-end" v-model="resume.objective" />
			<Textarea label-text="Resumo" v-model="resume.description" />
			<Textarea label-text="Informações Adicionais" v-model="resume.additionalInformation" />
        </form>

        <section class="flex flex-col gap-y-6 w-full">
			<h2 class="text-2xl text-slate-900 font-lexend font-medium">Experiência Profissional</h2>
			<div class="bg-white p-4 shadow rounded" v-for="experience in resume.professionalExperiences">
				<h2 class="text-slate-900 font-semibold mb-2">
					{{ experience.position }}
				</h2>
				<div class="flex flex-col gap-y-1 text-sm text-neutral-500 font-medium">
					<p>{{ experience.company }}</p>
					<p>{{ formatDate(experience.startDate) }} - {{ formatDate(experience.endDate) }}</p>
					<p>{{ experience.description }}</p>
				</div>
			</div>
			<form class="flex flex-col gap-y-6 w-full" @submit.prevent="handleProfessionalExperienceSubmit">
				<Input
					label-text="Empresa"
					v-model="professionalExperience.company"
					placeholder="Ex.: uTrampos"
					required
				/>
				<Input
					label-text="Posição"
					v-model="professionalExperience.position"
					placeholder="Ex.: Auxiliar Administrativo"
					required
				/>
                <Textarea
					label-text="Descrição"
					v-model="professionalExperience.description"
					required
				/>
                <div class="flex flex-col min-[480px]:flex-row gap-y-6 gap-x-2">
                    <Input
                        label-text="Data de início"
                        v-model="professionalExperience.startDate"
                        placeholder="Ex.: 01/01/2020"
						type="date"
						container-class="flex-1"
                        required
				    />

                    <Input
                        label-text="Data de fim"
                        v-model="professionalExperience.endDate"
                        placeholder="Ex.: 01/01/2023"
						type="date"
						container-class="flex-1"
                        required
				    />
                </div>
				<Button class="!w-fit" theme="secondary" type="submit">
					<RiAddLine class="fill-current h-6 w-6" />
					Adicionar Experiência
				</Button>
			</form>
		</section>

		<section class="flex flex-col gap-y-6 w-full">
			<h2 class="text-2xl text-slate-900 font-lexend font-medium">Escolaridade</h2>
			<div class="bg-white p-4 shadow rounded" v-for="education in resume.educations">
				<h2 class="text-slate-900 font-semibold mb-2">
					{{ education.course }}
				</h2>
				<div class="flex flex-col gap-y-1 text-sm text-neutral-500 font-medium">
					<p>{{ education.institution }}</p>
					<p>{{ formatDate(education.startDate) }} - {{ formatDate(education.endDate) }}</p>
				</div>
			</div>
			<form class="flex flex-col gap-y-6 w-full" @submit.prevent="handleEducationSubmit">
				<Input
					label-text="Curso"
					v-model="education.course"
					placeholder="Ex.: Administração de Empresas"
					required
				/>
				<Input
					label-text="Instituição"
					v-model="education.institution"
					placeholder="Ex.: FATEC da Zona Leste"
					required
				/>
                <div class="flex flex-col min-[480px]:flex-row gap-y-6 gap-x-2">
                    <Input
                        label-text="Data de início"
                        v-model="education.startDate"
                        placeholder="Ex.: 01/01/2020"
						type="date"
						container-class="flex-1"
                        required
				    />

                    <Input
                        label-text="Data de fim"
                        v-model="education.endDate"
                        placeholder="Ex.: 01/01/2023"
						type="date"
						container-class="flex-1"
                        required
				    />
                </div>
				<Button class="!w-fit" theme="secondary" type="submit">
					<RiAddLine class="fill-current h-6 w-6" />
					Adicionar Escolaridade
				</Button>
			</form>
		</section>

		<Button type="submit" form="resume-form">Salvar Currículo</Button>
	</div>
    
</template>