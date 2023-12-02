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
		<Logo class="mb-10" />
		<form
			class="flex flex-col gap-y-4 w-full max-w-md"
			@submit.prevent="formStep === 1 ? formStep++ : register(userRegister)"
		>
			<template v-if="formStep === 1">
				<div class="flex flex-col text-slate-900">
					<p class="font-semibold mb-3">Sou um:</p>

					<div class="w-full flex flex-col gap-2 min-[320px]:flex-row">
						<div class="w-full">
							<input
								type="radio"
								name="account-type"
								value="CANDIDATE"
								v-model="userRegister.type"
								class="hidden peer"
								id="account-type-candidate"
							/>
							<label
								for="account-type-candidate"
								class="w-full cursor-pointer ring-gray-300 font-semibold text-slate-900 ring-1 px-3 flex justify-center items-center bg-white h-10 rounded ring-inset peer-checked:ring-sky-500 peer-checked:border-sky-500 peer-checked:ring-2"
								>Candidato</label
							>
						</div>

						<div class="w-full">
							<input
								type="radio"
								name="account-type"
								value="COMPANY"
								v-model="userRegister.type"
								class="hidden peer"
								id="account-type-company"
							/>
							<label
								for="account-type-company"
								class="w-full cursor-pointer ring-gray-300 font-semibold text-slate-900 ring-1 px-3 flex justify-center items-center bg-white h-10 rounded ring-inset peer-checked:ring-sky-500 peer-checked:border-sky-500 peer-checked:ring-2"
								>Empresa</label
							>
						</div>
					</div>
				</div>
				<!-- <div class="flex flex-col gap-2 min-[320px]:flex-row">
					<Button>
						<RiGoogleFill class="fill-white h-6 w-6" />
						Google
					</Button>
				</div>
				<Separator>ou continue com</Separator> -->

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
