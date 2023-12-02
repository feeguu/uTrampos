<script setup lang="ts">
import { RiFilter3Fill } from "vue-remix-icons"
import type { IJob, Apply } from "~/types/api"

definePageMeta({
	middleware: "auth",
	allowedRoles: ["COMPANY"],
})

const toast = useToast()
const route = useRoute()
const showFilters = ref(false)

const candidateToRejectConfirmationModal = ref<Apply | null>(null)

const { data: job } = await useAPI<IJob>(`/jobs/${route.params.slug}`)
const { data: applies } = await useAPI<Apply[]>(`/jobs/${route.params.slug}/applies`)

async function proceedCandidate(apply: Apply) {
	const { data, error } = await useAPI(`/applies/${apply.id}/proceed`, {
		method: "POST",
	})

	if (error || !data) return

	toast.success("Candidato aprovado para a próxima etapa!")
	window.location.reload()
}

async function rejectCandidate(apply: Apply) {
	const { data, error } = await useAPI(`/applies/${apply.id}/reject`, {
		method: "POST",
	})

	if (error || !data) return

	toast.success("Candidato dispensado")
	window.location.reload()
}
</script>
<template>
	<div class="flex-1 p-6">
		<!-- <form
			@submit.prevent="handleSubmitFilters"
			class="bg-white p-6 gap-y-4 gap-x-3 flex flex-col shadow rounded max-w-6xl mx-auto md:flex-row md:items-end"
		>
			<h1 class="sr-only">Buscar vagas</h1>
			<Input
				label-text="Palavras-chave"
				placeholder="Ex.: Desenvolvedor, designer"
				container-class="md:flex-[2]"
				v-model="filters.q"
			/>
			<Input
				label-text="Local"
				placeholder="Ex.: São Paulo - SP"
				container-class="md:flex-[2]"
				v-model="filters.location"
			/>
			<Button type="submit" class="md:flex-1">Pesquisar</Button>
		</form> -->
		<main class="flex flex-col max-w-6xl mx-auto">
			<div class="flex items-center justify-between mb-4 gap-x-4">
				<div>
					<h1 class="text-2xl text-slate-900 font-lexend font-medium">{{ job?.title }}</h1>
					<p class="text-neutral-500 mt-1">Candidaturas: {{ applies?.length ?? 0 }}</p>
				</div>
				<!-- <button
					@click="showFilters = true"
					class="text-slate-900 flex justify-center items-center py-1 px-2 -mr-2 rounded transition-colors hover:text-sky-500"
				>
					<span class="font-semibold mr-1">Filtrar</span>
					<RiFilter3Fill class="fill-current h-6 w-6" />
				</button> -->
			</div>
			<div v-if="applies?.length" class="grid md:grid-cols-2 gap-4">
				<CandidateCard
					:apply="apply"
					v-for="apply in applies"
					@proceed="proceedCandidate(apply)"
					@reject="candidateToRejectConfirmationModal = apply"
				/>
			</div>
			<div class="text-center text-neutral-500 mt-16 px-4" v-else>
				<h2 class="text-lg font-semibold mb-2">Ainda não há candidatos para a vaga.</h2>
				<p>Por favor, verifique novamente mais tarde.</p>
			</div>
		</main>
	</div>

	<ModalContainer
		:show="!!candidateToRejectConfirmationModal"
		@close="candidateToRejectConfirmationModal = null"
	>
		<span
			class="font-lexend text-red-500 text-3xl font-black leading-[3rem] text-center h-12 w-12 bg-red-500 bg-opacity-20 rounded-full"
			>!</span
		>
		<p class="text-xl text-slate-900 font-semibold">Deseja dispensar candidato?</p>
		<p class="text-neutral-500">
			Você está prestes a excluir o candidato
			<strong>{{ candidateToRejectConfirmationModal?.candidate.user.name }}</strong> do processo
			seletivo. Essa ação é irreversível. Por favor, confirme sua decisão.
		</p>
		<div class="flex w-full flex-col gap-y-2">
			<Button class="!button-primary-outline" @click="candidateToRejectConfirmationModal = null"
				>Cancelar</Button
			>
			<Button
				class="!bg-red-500 hover:!bg-red-600"
				@click="rejectCandidate(candidateToRejectConfirmationModal!)"
				>Excluir</Button
			>
		</div>
	</ModalContainer>
</template>
