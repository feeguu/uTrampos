<script setup lang="ts">
import { ICompany } from "~/types/api"

definePageMeta({
	layout: false,
})

async function registerCompany() {
	const { error, data } = await useFetch<ICompany>("http://localhost:3001/auth/register/company", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(register),
	})

	if (error.value || !data.value) return

	navigateTo("/company")
}

const register = reactive({
	cnpj: "",
	description: "",
	companySize: "",
})
</script>

<template>
	<div class="bg-neutral-100 px-6 w-full min-h-screen flex flex-col justify-center items-center">
		<Logo class="mb-12" />
		<form class="flex flex-col gap-y-4 w-full max-w-md" @submit.prevent="registerCompany">
			<Input label-text="CNPJ" v-model="register.cnpj" />
			<Select label-text="Tamanho da empresa" v-model="register.companySize">
				<option disabled value="">Selecione</option>
				<option value="pequena">Pequena</option>
				<option value="media">Média</option>
				<option value="grande">Grande</option>
			</Select>
			<Textarea label-text="Descrição" v-model="register.description" />
			<Button type="submit">Cadastrar</Button>
		</form>
	</div>
</template>
