<script setup lang="ts">
definePageMeta({
	layout: false,
})

const register = reactive({
	cnpj: "",
	description: "",
	companySize: "",
})

const { registerCompany } = useAuth()
</script>

<template>
	<div class="bg-neutral-100 px-6 w-full min-h-screen flex flex-col justify-center items-center">
		<Logo class="mb-12" />
		<form class="flex flex-col gap-y-4 w-full max-w-md" @submit.prevent="registerCompany(register)">
			<Input label-text="CNPJ" v-model="register.cnpj" />
			<Select label-text="Tamanho da empresa" v-model="register.companySize">
				<option disabled value="">Selecione</option>
				<option value="MICRO">Micro</option>
				<option value="SMALL">Pequena</option>
				<option value="MEDIUM">Média</option>
				<option value="BIG">Grande</option>
			</Select>
			<Textarea label-text="Descrição" v-model="register.description" />
			<Button type="submit">Cadastrar</Button>
		</form>
	</div>
</template>
