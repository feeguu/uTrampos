<script setup lang="ts">
import { RiFacebookFill, RiGoogleFill } from "vue-remix-icons"

definePageMeta({
	layout: false,
})

const { registerUser } = useAuth()

const register = reactive({
	email: "",
	password: "",
	name: "NameTest",
	phone: "11923451234",
	zipCode: "08081-530",
	type: "candidate",
})
</script>

<template>
	<div class="bg-neutral-100 px-6 w-full min-h-screen flex flex-col justify-center items-center">
		<Logo class="mb-12" />
		<form class="flex flex-col gap-y-4 w-full max-w-md" @submit.prevent="registerUser(register)">
			<div class="flex flex-col gap-y-2 text-slate-900">
				<p class="font-semibold">Sou um:</p>
				<label
					><input
						type="radio"
						name="account-type"
						class="text-sky-500 focus:ring-sky-500"
						checked
					/><span class="ml-2">Candidato</span></label
				>
				<label
					><input type="radio" name="account-type" class="text-sky-500 focus:ring-sky-500" /><span
						class="ml-2"
						>Empresa</span
					></label
				>
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
