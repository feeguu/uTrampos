<script setup lang="ts">
import { RiFacebookFill, RiGoogleFill } from "vue-remix-icons"

definePageMeta({
	layout: false,
})

const { registerUser } = useAuth()

const register = reactive({
	cnpj: "",
	description: "",
	companySize: "",
})
</script>

<template>
	<div class="bg-neutral-100 px-6 w-full min-h-screen flex flex-col justify-center items-center">
		<Logo class="mb-12" />
		<form class="flex flex-col gap-y-4 w-full max-w-md" @submit.prevent="">
			<Input label-text="CNPJ" v-model="register.cnpj" />
			<Input label-text="Tamanho da empresa" v-model="register.companySize" />
			<Textarea label-text="Senha" v-model="register.description" />
			{{ register.description }}
			<Button type="submit">Cadastrar</Button>
		</form>
	</div>
</template>
