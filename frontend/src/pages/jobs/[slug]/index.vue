<script setup lang="ts">
import {
	RiMapPinLine,
	RiMoneyDollarCircleLine,
	RiFileList3Line,
	RiBriefcaseLine,
	RiArrowLeftSLine,
	RiDeleteBinLine,
	RiPencilLine,
} from "vue-remix-icons"
import type { IJob } from "~/types/api"
import { CONTRACT_TYPES } from "~/types/enums/job"

const showApplyConfirmationModal = ref(false)
const showWithdrawConfirmationModal = ref(false)
const showDeleteJobConfirmationModal = ref(false)
const alreadyApplied = ref(false)

const route = useRoute()
const auth = useAuth()
const toast = useToast()

const { data: job, error } = await useAPI<IJob>(`/jobs/${route.params.slug}`)

async function handleDeleteJob() {
	const { error } = await useAPI(`/jobs/${job?.slug}`, {
		method: "DELETE",
	})

	if (error) return

	toast.success("Vaga excluída com sucesso!")

	navigateTo("/")
}

async function handleApply() {
	const { error } = await useAPI(`/jobs/${job?.slug}/apply`, {
		method: "POST",
	})

	if (error) return

	toast.success("Candidatura enviada com sucesso!")
	showApplyConfirmationModal.value = false
	alreadyApplied.value = !alreadyApplied.value
}

async function handleWithdraw() {
	const { error } = await useAPI(`/jobs/${job?.slug}/withdraw`, {
		method: "POST",
	})

	if (error) return

	toast.success("Candidatura cancelada com sucesso!")
	showWithdrawConfirmationModal.value = false
	alreadyApplied.value = false
}

const alreadyHired = false
const favorite = false
</script>

<template>
	<template v-if="job">
		<main class="container flex-1 px-6 py-6 flex flex-col md:max-w-3xl gap-y-6 mx-auto">
			<section class="flex flex-col gap-y-4">
				<BackButton />
				<div class="flex gap-x-4 justify-between items-start">
					<div>
						<h1 class="text-2xl text-slate-900 font-medium font-lexend leading-none mb-2">
							{{ job.title }}
						</h1>
						<h2 class="text-neutral-500 font-lexend leading-none">
							{{ job.company.user.name }}
						</h2>
					</div>
					<template v-if="auth.company?.id === job.company.id || auth.admin">
						<div class="flex gap-x-2">
							<Button
								class="!button-primary-outline flex-shrink-0 hidden !px-2 md:flex md:w-auto"
								@click="showDeleteJobConfirmationModal = true"
							>
								<RiDeleteBinLine class="fill-current h-6 w-6" />
							</Button>
							<LinkButton
								:href="`/jobs/edit/${job.slug}`"
								class="!button-primary-outline flex-shrink-0 hidden !px-2 md:flex md:w-auto"
							>
								<RiPencilLine class="fill-current h-6 w-6" />
							</LinkButton>
						</div>
					</template>
					<template v-else-if="auth.candidate">
						<Button
							@click="showApplyConfirmationModal = true"
							class="flex-shrink-0 hidden md:block md:w-auto"
							v-if="!alreadyApplied"
							>Candidatar-se</Button
						>
						<Button
							@click="showWithdrawConfirmationModal = true"
							class="flex-shrink-0 hidden md:block md:w-auto !text-red-600 !bg-red-100 hover:!bg-red-200"
							v-else
							>Cancelar candidatura</Button
						>
					</template>
				</div>
				<div class="flex flex-col gap-y-2 empty:hidden">
					<JobInfoIcon :icon="RiMapPinLine" v-if="job.address">{{ job.address }}</JobInfoIcon>
					<JobInfoIcon :icon="RiMoneyDollarCircleLine" v-if="job.salary">{{
						formatToBRL(job.salary)
					}}</JobInfoIcon>
					<JobInfoIcon :icon="RiFileList3Line" v-if="job.contractType">{{
						CONTRACT_TYPES[job.contractType]
					}}</JobInfoIcon>
					<JobInfoIcon :icon="RiBriefcaseLine" v-if="alreadyHired"
						><p>
							Já contratou pela&nbsp;<span class="font-lexend font-medium"
								><span class="text-sky-500">u</span>Trampos</span
							>
						</p></JobInfoIcon
					>
				</div>
				<div class="flex flex-wrap gap-2" v-if="job.keywords?.length">
					<JobKeyword v-for="keyword in job.keywords">{{ keyword }}</JobKeyword>
				</div>
			</section>
			<Section title="Descrição">
				<p class="whitespace-pre-wrap break-words">
					{{ job.description }}
				</p>
			</Section>
			<Section title="Sobre a empresa">
				<p class="whitespace-pre-wrap break-words">
					{{ job.company.description }}
				</p>
			</Section>
			<Section :title="section.title" v-for="section in job.sections">
				<p class="whitespace-pre-wrap break-words">
					{{ section.description }}
				</p>
			</Section>

			<template v-if="auth.company?.id === job.company.id || auth.admin">
				<div class="flex gap-x-2">
					<Button
						class="!button-primary-outline !px-2 md:w-auto"
						@click="showDeleteJobConfirmationModal = true"
					>
						<RiDeleteBinLine class="fill-current h-6 w-6" />
					</Button>
					<LinkButton
						:href="`/jobs/edit/${job.slug}`"
						class="!button-primary-outline !px-2 md:w-auto"
					>
						<RiPencilLine class="fill-current h-6 w-6" />
					</LinkButton>
					<LinkButton
						:href="`/jobs/${job.slug}/applies`"
						class="md:w-fit"
						v-if="auth.company?.id === job.company.id"
						>Candidaturas</LinkButton
					>
				</div>
			</template>
			<template v-else-if="auth.candidate">
				<Button @click="showApplyConfirmationModal = true" class="md:w-fit" v-if="!alreadyApplied"
					>Candidatar-se</Button
				>
				<Button
					@click="showWithdrawConfirmationModal = true"
					class="md:w-fit !text-red-600 !bg-red-100 hover:!bg-red-200"
					v-else
					>Cancelar candidatura</Button
				>
			</template>
		</main>
	</template>

	<template v-else>
		<div class="flex-1 flex flex-col justify-center items-center text-center text-neutral-500 p-4">
			<h2 class="text-lg font-semibold mb-2">
				Não foi possível encontrar a vaga que você está procurando.
			</h2>
			<p>Contate a empresa responsável pela vaga para mais detalhes.</p>
			<LinkButton href="/jobs" class="!w-fit mt-8">Voltar para vagas</LinkButton>
		</div>
	</template>

	<ModalContainer :show="showApplyConfirmationModal" @close="showApplyConfirmationModal = false">
		<span
			class="font-lexend text-sky-500 text-3xl font-black leading-[3rem] text-center h-12 w-12 bg-sky-500 bg-opacity-20 rounded-full"
			>!</span
		>
		<p class="text-xl text-slate-900 font-semibold">Deseja Continuar?</p>
		<p class="text-neutral-500">
			Você está prestes a confirmar sua candidatura para a vaga de <strong>{{ job?.title }}</strong
			>. Por favor, revise seu currículo com atenção antes de prosseguir.
		</p>
		<div class="flex w-full flex-col gap-y-2">
			<LinkButton class="!button-primary-outline" href="/candidate/profile"
				>Revisar Currículo</LinkButton
			>
			<Button @click="handleApply">Continuar</Button>
		</div>
	</ModalContainer>

	<ModalContainer :show="showDeleteJobConfirmationModal" @close="showDeleteJobConfirmationModal = false">
		<span
			class="font-lexend text-red-500 text-3xl font-black leading-[3rem] text-center h-12 w-12 bg-red-500 bg-opacity-20 rounded-full"
			>!</span
		>
		<p class="text-xl text-slate-900 font-semibold">Deseja excluir essa vaga?</p>
		<p class="text-neutral-500">
			Você está prestes a excluir a vaga de emprego de <strong>{{ job?.title }}</strong
			>. Essa ação é irreversível. Por favor, confirme sua decisão.
		</p>
		<div class="flex w-full flex-col gap-y-2">
			<Button class="!button-primary-outline" @click="showDeleteJobConfirmationModal = false"
				>Cancelar</Button
			>
			<Button class="!bg-red-500 hover:!bg-red-600" @click="handleDeleteJob">Excluir</Button>
		</div>
	</ModalContainer>

	<ModalContainer :show="showWithdrawConfirmationModal" @close="showWithdrawConfirmationModal = false">
		<span
			class="font-lexend text-red-500 text-3xl font-black leading-[3rem] text-center h-12 w-12 bg-red-500 bg-opacity-20 rounded-full"
			>!</span
		>
		<p class="text-xl text-slate-900 font-semibold">Deseja cancelar a candidatura?</p>
		<p class="text-neutral-500">
			Você está prestes a cancelar sua candidatura para a vaga de <strong>{{ job?.title }}</strong
			>. Por favor, confirme sua decisão.
		</p>
		<div class="flex w-full flex-col gap-y-2">
			<Button class="!button-primary-outline" @click="showWithdrawConfirmationModal = false"
				>Cancelar</Button
			>
			<Button class="!bg-red-500 hover:!bg-red-600" @click="handleWithdraw"
				>Cancelar candidatura</Button
			>
		</div>
	</ModalContainer>
</template>
