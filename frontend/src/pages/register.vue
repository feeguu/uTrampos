<script setup lang="ts">
import { RiFacebookFill, RiGoogleFill } from "vue-remix-icons"

definePageMeta({
	layout: false,
})

const register = reactive({
	email: "",
	password: "",
	name: "NameTest",
	phone: "11923451234",
	zipCode: "08081-530",
	type: "candidate",
})

async function registerUser() {
	try {
		const res: any = await $fetch("http://localhost:3001/auth/register", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(register),
		})

		const token = useCookie("utrampos.token")
		token.value = res.token

		navigateTo("/")
	} catch (error) {
		console.error(error)
	}
}
</script>

<template>
	<div class="bg-neutral-100 px-6 w-full min-h-screen flex flex-col justify-center items-center">
		<Logo class="mb-12" />
		<form class="flex flex-col gap-y-4 w-full max-w-md" @submit.prevent="registerUser">
			<div class="flex flex-col gap-y-2">
				<p class="text-slate-900 font-semibold">Sou um:</p>
				<label
					><input type="radio" name="account-type" checked /><span class="ml-2"
						>Candidato</span
					></label
				>
				<label><input type="radio" name="account-type" /><span class="ml-2">Empresa</span></label>
			</div>
			<div class="flex gap-x-4">
				<Button>
					<RiFacebookFill class="fill-white h-6 w-6" />
					Facebook
				</Button>
				<Button>
					<RiGoogleFill class="fill-white h-6 w-6" />
					Google
				</Button>
			</div>
			<Separator>ou continue com</Separator>

			<Input label-text="E-mail" v-model="register.email" />
			<Input label-text="Senha" v-model="register.password" />
			<Button type="submit">Cadastrar</Button>

			<NuxtLink to="/login" class="text-slate-900 text-sm text-center font-semibold">
				Já possui uma conta? <span class="text-sky-500">Entre</span>
			</NuxtLink>
		</form>
	</div>
</template>
