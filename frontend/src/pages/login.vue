<script setup lang="ts">
import { RiFacebookFill, RiGoogleFill } from "vue-remix-icons"

definePageMeta({
	layout: false,
	middleware: "auth",
	allowedRoles: ["GUEST"],
})

const loginData = reactive({
	email: "",
	password: "",
})

const { login } = useAuth()
</script>

<template>
	<div class="bg-neutral-100 px-6 w-full min-h-screen flex flex-col justify-center items-center">
		<Logo class="mb-12" />
		<form class="flex flex-col gap-y-4 w-full max-w-md" @submit.prevent="login(loginData)">
			<Input label-text="E-mail" type="email" v-model="loginData.email" />
			<Input label-text="Senha" type="password" v-model="loginData.password" />
			<Button type="submit">Entrar</Button>
			<Separator>ou continue com</Separator>
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
			<NuxtLink to="/register" class="text-slate-900 text-sm text-center font-semibold">
				Ainda não possui uma conta? <span class="text-sky-500">Cadastre-se</span>
			</NuxtLink>
		</form>
	</div>
</template>
