<script setup lang="ts">
import { RiAddLine, RiDeleteBinLine, RiPencilLine } from "vue-remix-icons"
import { ICreateResumeRequest } from "~/types/api"
import {
	EXPERIENCE_TIMES,
	EDUCATION_STATUS,
	EDUCATION_TYPES,
	LANGUAGE_LEVELS,
	SOCIAL_NETWORKS,
} from "~/types/enums/resume"

definePageMeta({
	middleware: "auth",
	allowedRoles: ["CANDIDATE"],
})

const toast = useToast()
const formStep = ref(1)

const patch = ref(false)
const resume = ref<ICreateResumeRequest>({
	objective: "",
	description: "",
	additionalInformation: "",
	skills: [],
	professionalExperiences: [],
	academicProjects: [],
	languages: [],
	socialNetworks: [],
	educations: [],
})

const { data: oldResume, error } = await useAPI<any>("/resumes")

if (oldResume) {
	patch.value = true
	const { languages, ...restOldResume } = oldResume
	const newLanguage = languages.map(({ language, ...rest }: any) => ({
		name: language,
		...rest,
	}))

	resume.value = {
		languages: newLanguage,
		...restOldResume,
	}
}

async function handleSubmit() {
	if (patch.value) {
		console.log(oldResume.id)

		const { data, error } = await useAPI(`/resumes/${oldResume.id}`, {
			method: "PATCH",
			body: JSON.stringify(resume.value),
		})
		if (error || !data) return
	} else {
		const { data, error } = await useAPI("/resumes", {
			method: "POST",
			body: JSON.stringify(resume.value),
		})
		if (error || !data) return
	}

	toast.success("Currículo cadastrado com sucesso!")
	navigateTo("/candidate/profile")
}
</script>

<template>
	<div class="flex-1 p-6">
		<div class="max-w-2xl w-full mx-auto">
			<BackButton class="mb-4" />
			<Steps
				class="mb-6"
				:steps="[
					'Objetivo e resumo',
					'Informações adicionais',
					'Redes sociais',
					'Competências',
					'Experiências profissionais',
					'Educação',
					'Projetos acadêmicos',
					'Idiomas',
				]"
				@stepClick="(step) => (formStep = step)"
				:current-step="formStep"
			/>

			<!-- Cadastrar currículo -->
			<form class="flex flex-col gap-y-6 w-full" v-if="formStep === 1" @submit.prevent="formStep++">
				<div class="mb-4">
					<h1 class="text-2xl text-slate-900 font-lexend font-medium">Cadastrar currículo</h1>
					<p class="text-neutral-500 mt-1">
						Defina suas metas! Na primeira etapa, compartilhe seu objetivo profissional e um
						resumo que destaque suas habilidades e paixões.
					</p>
				</div>
				<Input
					label-text="Objetivo"
					placeholder="Ex.: Auxiliar Administrativo"
					v-model="resume.objective"
					required
				/>
				<Textarea label-text="Resumo" v-model="resume.description" required />
				<Button type="submit">Continuar</Button>
			</form>

			<!-- Informações adicionais -->
			<form class="flex flex-col gap-y-6 w-full" v-if="formStep === 2" @submit.prevent="formStep++">
				<div class="mb-4">
					<h1 class="text-2xl text-slate-900 font-lexend font-medium">Informações adicionais</h1>
					<p class="text-neutral-500 mt-1">
						Toque pessoal! Aqui é o lugar para os detalhes que tornam você único. Compartilhe
						informações extras que refletem quem você é, se sentir à vontade.
					</p>
				</div>
				<Textarea
					label-text="Informações adicionais"
					v-model="resume.additionalInformation"
					required
				/>
				<Button type="submit">Continuar</Button>
			</form>

			<!-- Redes sociais -->
			<form class="flex flex-col gap-y-6 w-full" v-if="formStep === 3" @submit.prevent="formStep++">
				<div class="mb-4">
					<h1 class="text-2xl text-slate-900 font-lexend font-medium">Redes sociais</h1>
					<p class="text-neutral-500 mt-1">
						Mais do que palavras! Adicione seus perfis de redes sociais. Nesta etapa, a sua
						presença online é tão importante quanto as suas habilidades profissionais.
					</p>
				</div>

				<DynamicSections v-model="resume.socialNetworks">
					<template #sections="{ deleteSection, editSection }">
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
							<div class="flex items-center justify-end gap-x-4">
								<IconButton title="Excluir" @click="deleteSection(index)"
									><RiDeleteBinLine class="fill-slate-900 h-6 w-6"
								/></IconButton>
								<IconButton title="Editar" @click="editSection(index)"
									><RiPencilLine class="fill-slate-900 h-6 w-6"
								/></IconButton>
							</div>
						</div>
					</template>

					<template #form="{ formData }">
						<div class="flex flex-col w-full gap-x-2 gap-y-6 md:flex-row">
							<Select
								v-model="formData.socialNetwork"
								label-text="Rede Social"
								container-class="flex-1"
								required
							>
								<option disabled value="">Selecione</option>
								<option value="GITHUB">Github</option>
								<option value="LINKEDIN">Linkedin</option>
								<option value="X">X</option>
								<option value="DRIBBBLE">Dribbble</option>
								<option value="BEHANCE">Behance</option>
								<option value="PORTFOLIO">Portfólio</option>
								<option value="OTHER">Outro</option>
							</Select>

							<Input
								type="url"
								label-text="Link"
								:placeholder="`Ex.: https://${
									formData.socialNetwork?.toLowerCase() ?? 'rede'
								}.com/username`"
								container-class="flex-[2]"
								v-model="formData.url"
								required
							/>
						</div>

						<Button class="!button-secondary !w-fit" type="submit">
							<RiAddLine class="fill-current h-6 w-6" />
							Adicionar Rede
						</Button>
					</template>
				</DynamicSections>

				<Button type="submit">Continuar</Button>
			</form>

			<!-- Competências -->
			<form class="flex flex-col gap-y-6 w-full" v-if="formStep === 4" @submit.prevent="formStep++">
				<div class="mb-4">
					<h1 class="text-2xl text-slate-900 font-lexend font-medium">Competências</h1>
					<p class="text-neutral-500 mt-1">
						Destaque-se! Liste suas habilidades nesta etapa. É a sua oportunidade de mostrar o que
						faz de você um candidato excepcional.
					</p>
				</div>

				<DynamicSections v-model="resume.skills">
					<template #sections="{ deleteSection, editSection }">
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
							<div class="flex items-center justify-end gap-x-4">
								<IconButton title="Excluir" @click="deleteSection(index)"
									><RiDeleteBinLine class="fill-slate-900 h-6 w-6"
								/></IconButton>
								<IconButton title="Editar" @click="editSection(index)"
									><RiPencilLine class="fill-slate-900 h-6 w-6"
								/></IconButton>
							</div>
						</div>
					</template>

					<template #form="{ formData }">
						<div class="flex flex-col w-full gap-x-2 gap-y-6 md:flex-row">
							<Input
								label-text="Competência"
								placeholder="Ex.: Java, Excel, Photoshop"
								container-class="flex-[2]"
								v-model="formData.name"
								required
							/>

							<Select
								v-model="formData.experienceTime"
								label-text="Tempo de experiência"
								container-class="flex-1"
								required
							>
								<option disabled value="">Selecione</option>
								<option value="LESS_THAN_ONE_YEAR">Menos de 1 ano</option>
								<option value="ONE_TO_THREE_YEARS">1 a 3 anos</option>
								<option value="THREE_TO_FIVE_YEARS">3 a 5 anos</option>
								<option value="FIVE_TO_TEN_YEARS">5 a 10 anos</option>
								<option value="MORE_THAN_TEN_YEARS">Mais de 10 anos</option>
							</Select>
						</div>

						<Button class="!button-secondary !w-fit" type="submit">
							<RiAddLine class="fill-current h-6 w-6" />
							Adicionar Competência
						</Button>
					</template>
				</DynamicSections>

				<Button type="submit">Continuar</Button>
			</form>

			<!-- Experiências profissionais -->
			<form class="flex flex-col gap-y-6 w-full" v-if="formStep === 5" @submit.prevent="formStep++">
				<div class="mb-4">
					<h1 class="text-2xl text-slate-900 font-lexend font-medium">
						Experiências profissionais
					</h1>
					<p class="text-neutral-500 mt-1">
						Caminho de sucesso! Adicione suas experiências nesta etapa. Cada posição é uma peça do
						quebra-cabeça que forma a sua trajetória única.
					</p>
				</div>

				<DynamicSections v-model="resume.professionalExperiences">
					<template #sections="{ deleteSection, editSection }">
						<SectionCard
							:title="experience.position"
							:show-options="true"
							@delete="deleteSection(index)"
							@edit="editSection(index)"
							v-for="(experience, index) in resume.professionalExperiences"
						>
							<p>{{ experience.company }}</p>
							<p>
								{{
									`${formatDate(experience.startDate)} - ${formatDate(experience.endDate)}`
								}}
							</p>
							<p class="break-words whitespace-pre-wrap">
								{{ experience.description }}
							</p>
						</SectionCard>
					</template>

					<template #form="{ formData }">
						<Input
							label-text="Cargo"
							placeholder="Ex.: Desenvolvedor Front-end Jr."
							v-model="formData.position"
							required
						/>

						<Input
							label-text="Empresa"
							placeholder="Ex.: FATEC da Zona Leste"
							v-model="formData.company"
							required
						/>

						<Textarea label-text="Descrição" v-model="formData.description" />

						<div class="flex flex-col w-full gap-x-2 gap-y-6 md:flex-row">
							<Input
								label-text="Data de início"
								type="date"
								v-model="formData.startDate"
								container-class="flex-1"
								required
							/>

							<Input
								label-text="Data de fim"
								type="date"
								v-model="formData.endDate"
								container-class="flex-1"
								required
							/>
						</div>

						<Button class="!button-secondary !w-fit" type="submit">
							<RiAddLine class="fill-current h-6 w-6" />
							Adicionar Experiência
						</Button>
					</template>
				</DynamicSections>

				<Button type="submit">Continuar</Button>
			</form>

			<!-- Educação -->
			<form class="flex flex-col gap-y-6 w-full" v-if="formStep === 6" @submit.prevent="formStep++">
				<div class="mb-4">
					<h1 class="text-2xl text-slate-900 font-lexend font-medium">Educação</h1>
					<p class="text-neutral-500 mt-1">
						Jornada acadêmica! Registre sua trajetória educacional nesta etapa. Cada conquista
						acadêmica é um passo em direção ao seu sucesso profissional.
					</p>
				</div>

				<DynamicSections v-model="resume.educations">
					<template #sections="{ deleteSection, editSection }">
						<SectionCard
							:title="education.course"
							:show-options="true"
							@delete="deleteSection(index)"
							@edit="editSection(index)"
							v-for="(education, index) in resume.educations"
						>
							<p>{{ education.institution }}</p>
							<p>{{ EDUCATION_TYPES[education.educationType] }}</p>
							<p>{{ EDUCATION_STATUS[education.status] }}</p>
							<p>
								{{ `${formatDate(education.startDate)} - ${formatDate(education.endDate)}` }}
							</p>
						</SectionCard>
					</template>

					<template #form="{ formData }">
						<Input
							label-text="Curso"
							placeholder="Ex.: Desenvolvimento de Software Multiplataforma"
							v-model="formData.course"
							required
						/>

						<Input
							label-text="Instituição"
							placeholder="Ex.: FATEC da Zona Leste"
							v-model="formData.institution"
							required
						/>

						<div class="flex flex-col w-full gap-x-2 gap-y-6 md:flex-row">
							<Select
								v-model="formData.educationType"
								label-text="Grau acadêmico"
								container-class="flex-1"
								required
							>
								<option disabled value="">Selecione</option>
								<option value="TECHNICAL_COURSE">Curso Técnico</option>
								<option value="GRADUATION">Graduação</option>
								<option value="POSTGRADUATION">Pós-graduação</option>
								<option value="MASTER">Mestrado</option>
								<option value="DOCTORATE">Doutorado</option>
								<option value="SECONDARY">Ensino Médio</option>
							</Select>

							<Select
								v-model="formData.status"
								label-text="Situação"
								container-class="flex-1"
								required
							>
								<option disabled value="">Selecione</option>
								<option value="FINISHED">Concluído</option>
								<option value="IN_PROGRESS">Em andamento</option>
								<option value="INCOMPLETE">Incompleto</option>
							</Select>
						</div>

						<div class="flex flex-col w-full gap-x-2 gap-y-6 md:flex-row">
							<Input
								label-text="Data de início"
								type="date"
								v-model="formData.startDate"
								container-class="flex-1"
								required
							/>

							<Input
								label-text="Previsão de término"
								type="date"
								v-model="formData.endDate"
								container-class="flex-1"
								required
							/>
						</div>

						<Button class="!button-secondary !w-fit" type="submit">
							<RiAddLine class="fill-current h-6 w-6" />
							Adicionar Educação
						</Button>
					</template>
				</DynamicSections>

				<Button type="submit">Continuar</Button>
			</form>

			<!-- Projetos acadêmicos -->
			<form class="flex flex-col gap-y-6 w-full" v-if="formStep === 7" @submit.prevent="formStep++">
				<div class="mb-4">
					<h1 class="text-2xl text-slate-900 font-lexend font-medium">Projetos acadêmicos</h1>
					<p class="text-neutral-500 mt-1">
						Projetos em destaque! Compartilhe seus projetos acadêmicos nesta etapa. Mostre como
						suas ideias ganharam vida e contribuíram para sua formação.
					</p>
				</div>

				<DynamicSections v-model="resume.academicProjects">
					<template #sections="{ deleteSection, editSection }">
						<SectionCard
							:title="project.title"
							:show-options="true"
							@delete="deleteSection(index)"
							@edit="editSection(index)"
							v-for="(project, index) in resume.academicProjects"
						>
							<p>
								{{ `${formatDate(project.startDate)} - ${formatDate(project.endDate)}` }}
							</p>
							<p class="break-words whitespace-pre-wrap">
								{{ project.description }}
							</p>
						</SectionCard>
					</template>

					<template #form="{ formData }">
						<Input
							label-text="Título"
							placeholder="Ex.: uTrampos - Plataforma para primeiro emprego"
							v-model="formData.title"
							required
						/>

						<Textarea label-text="Descrição" v-model="formData.description" />

						<div class="flex flex-col w-full gap-x-2 gap-y-6 md:flex-row">
							<Input
								label-text="Data de início"
								type="date"
								v-model="formData.startDate"
								container-class="flex-1"
								required
							/>

							<Input
								label-text="Data de fim"
								type="date"
								v-model="formData.endDate"
								container-class="flex-1"
								required
							/>
						</div>

						<Button class="!button-secondary !w-fit" type="submit">
							<RiAddLine class="fill-current h-6 w-6" />
							Adicionar Projeto
						</Button>
					</template>
				</DynamicSections>

				<Button type="submit">Continuar</Button>
			</form>

			<!-- Idiomas -->
			<form class="flex flex-col gap-y-6 w-full" v-if="formStep === 8" @submit.prevent="handleSubmit">
				<div class="mb-4">
					<h1 class="text-2xl text-slate-900 font-lexend font-medium">Idiomas</h1>
					<p class="text-neutral-500 mt-1">
						Poliglota em ação! Etapa de idiomas. Liste suas habilidades linguísticas e mostre como
						a comunicação transcende barreiras.
					</p>
				</div>

				<DynamicSections v-model="resume.languages">
					<template #sections="{ deleteSection, editSection }">
						<div
							class="bg-white p-4 shadow rounded flex flex-col justify-between text-slate-900 gap-x-4 gap-y-2 min-[480px]:flex-row min-[480px]:items-center"
							v-for="(language, index) in resume.languages"
						>
							<div class="flex flex-col min-[480px]:flex-row gap-x-4 gap-y-1">
								<h2 class="text-slate-900 font-semibold">
									{{ language.name }}
								</h2>
								<p class="text-neutral-500">{{ LANGUAGE_LEVELS[language.level] }}</p>
							</div>
							<div class="flex items-center justify-end gap-x-4">
								<IconButton title="Excluir" @click="deleteSection(index)"
									><RiDeleteBinLine class="fill-slate-900 h-6 w-6"
								/></IconButton>
								<IconButton title="Editar" @click="editSection(index)"
									><RiPencilLine class="fill-slate-900 h-6 w-6"
								/></IconButton>
							</div>
						</div>
					</template>

					<template #form="{ formData }">
						<div class="flex flex-col w-full gap-x-2 gap-y-6 md:flex-row">
							<Input
								label-text="Idioma"
								placeholder="Ex.: Inglês, Espanhol, Japonês"
								container-class="flex-[2]"
								v-model="formData.name"
								required
							/>

							<Select
								v-model="formData.level"
								label-text="Nível de proficiência"
								container-class="flex-1"
								required
							>
								<option disabled value="">Selecione</option>
								<option value="BEGINNER">Básico</option>
								<option value="INTERMEDIATE">Intermediário</option>
								<option value="ADVANCED">Avançado</option>
								<option value="PROFICIENT">Fluente</option>
							</Select>
						</div>

						<Button class="!button-secondary !w-fit" type="submit">
							<RiAddLine class="fill-current h-6 w-6" />
							Adicionar Idioma
						</Button>
					</template>
				</DynamicSections>

				<Button type="submit">Salvar currículo</Button>
			</form>
		</div>
	</div>
</template>
