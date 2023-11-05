<script setup lang="ts">
import { RiFacebookFill, RiGoogleFill } from "vue-remix-icons"

definePageMeta({
	layout: false,
	middleware: "auth",
	allowedRoles: ["GUEST"],
})

const formStep = ref(1)

const userRegister = reactive({
	email: "",
	password: "",
	name: "",
	phone: "",
	zipCode: "",
	type: "CANDIDATE",
})

const { register } = useAuth()
</script>

<template>
	<div class="bg-neutral-100 px-6 w-full min-h-screen flex flex-col justify-center items-center">
		<Logo class="mb-12" />
		<form
			class="flex flex-col gap-y-4 w-full max-w-md"
			@submit.prevent="formStep === 1 ? formStep++ : register(userRegister)"
		>
			<template v-if="formStep === 1">
				<div class="flex flex-col gap-y-2 text-slate-900">
					<p class="font-semibold">Sou um:</p>
					<label
						><input
							type="radio"
							name="account-type"
							class="text-sky-500 focus:ring-sky-500"
							value="CANDIDATE"
							v-model="userRegister.type"
						/><span class="ml-2">Candidato</span></label
					>
					<label
						><input
							type="radio"
							name="account-type"
							class="text-sky-500 focus:ring-sky-500"
							value="COMPANY"
							v-model="userRegister.type"
						/><span class="ml-2">Empresa</span></label
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

				<Input label-text="E-mail" type="email" v-model="userRegister.email" required />
				<Input label-text="Senha" type="password" v-model="userRegister.password" required />
				<Button type="submit">Continuar</Button>

				<NuxtLink to="/login" class="text-slate-900 text-sm text-center font-semibold">
					Já possui uma conta? <span class="text-sky-500">Entre</span>
				</NuxtLink>
			</template>
			<template v-if="formStep === 2">
				<Input
					:label-text="userRegister.type === 'CANDIDATE' ? 'Nome Completo' : 'Nome da Empresa'"
					v-model="userRegister.name"
					required
				/>
				<Input
					label-text="Telefone"
					type="tel"
					v-model="userRegister.phone"
					data-maska="(##) #####-####"
					required
				/>
				<Input label-text="CEP" v-model="userRegister.zipCode" data-maska="#####-###" required />
				<Button type="submit">Continuar</Button>
			</template>
		</form>
	</div>
</template>
