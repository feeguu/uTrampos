<script setup lang="ts">
definePageMeta({
	layout: false,
	middleware: "auth",
	allowedRoles: ["CANDIDATE"],
})

const candidateRegister = reactive({
	cpf: "",
	birthDate: "",
})

const { registerCandidate } = useAuth()
</script>

<template>
	<div class="bg-neutral-100 px-6 w-full min-h-screen flex flex-col justify-center items-center">
		<Logo class="mb-12" />
		<form
			class="flex flex-col gap-y-4 w-full max-w-md"
			@submit.prevent="registerCandidate(candidateRegister)"
		>
			<Input label-text="CPF" v-model="candidateRegister.cpf" />
			<Input label-text="Data de nascimento" type="date" v-model="candidateRegister.birthDate" />
			<Button type="submit">Cadastrar</Button>
		</form>
	</div>
</template>
