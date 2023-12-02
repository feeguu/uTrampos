<script setup lang="ts">
import { IDashboard } from "~/types/api"

definePageMeta({
	middleware: "auth",
	allowedRoles: ["ADMIN"],
})

const { data: dashboard } = await useAPI<IDashboard>("/dashboard")
</script>

<template>
	<div class="flex-1 p-6" v-if="dashboard">
		<div class="grid grid-cols-1 gap-4 max-w-6xl mx-auto min-[480px]:grid-cols-2 md:grid-cols-3">
			<DashboardCard title="Candidatos" :value="`${Number(dashboard.candidates.toFixed(2))}`" />
			<DashboardCard title="Currículos" :value="`${Number(dashboard.resumes.toFixed(2))}`" />
			<DashboardCard title="Empresas" :value="`${Number(dashboard.companies.toFixed(2))}`" />
			<DashboardCard title="Vagas" :value="`${Number(dashboard.jobs.toFixed(2))}`" />
			<DashboardCard title="Candidaturas" :value="`${Number(dashboard.applies.toFixed(2))}`" />
			<DashboardCard
				title="Taxa de respostas (%)"
				:value="`${Number(dashboard.percentageOfAnswerApplies.toFixed(2))}%`"
			/>
			<DashboardCard
				title="Candidatos contratados"
				:value="`${Number(dashboard.candidatesHired.toFixed(2))}`"
			/>
			<DashboardCard
				title="Candidatos com pelo menos uma candidatura"
				:value="`${Number(dashboard.candidatesWithLeastOneApply.toFixed(2))}`"
			/>
			<DashboardCard
				title="Candidatos com pelo menos uma candidatura (%)"
				:value="`${Number(dashboard.candidatesWithLeastOneApplyPercentage.toFixed(2))}%`"
			/>
			<DashboardCard
				title="Candidaturas por vaga (média)"
				:value="`${Number(dashboard.appliesPerJobAverage.toFixed(2))}`"
			/>
			<DashboardCard
				title="Candidaturas por candidato (média)"
				:value="`${Number(dashboard.appliesPerCandidateAverage.toFixed(2))}`"
			/>
			<DashboardCard
				title="Candidatos por vaga (média)"
				:value="`${Number(dashboard.candidatesPerJobAverage.toFixed(2))}`"
			/>
		</div>
	</div>
</template>
