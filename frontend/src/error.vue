<script setup lang="ts">
interface IError {
	url: string
	statusCode: number
	statusMessage: string
	message: string
	description: string
	data?: any
}

defineProps<{
	error: IError
}>()

const handleError = () => clearError({ redirect: "/" })
</script>

<template>
	<div class="min-h-screen w-full bg-neutral-100 p-6 flex justify-center items-center">
		<div class="max-w-xl w-full text-center flex flex-col justify-center items-center">
			<p class="text-sky-500 font-medium font-lexend text-3xl mb-2">{{ error.statusCode }}</p>
			<h1 class="font-lexend font-medium text-2xl text-slate-900 mb-4 sm:text-3xl">
				{{ error.statusCode === 404 ? "Página não encontrada" : "Algo deu errado" }}
			</h1>
			<p class="text-neutral-500 mb-8">
				{{ error.message }}
				<br />
				{{ error.description }}
			</p>
			<Button class="!w-fit" @click="handleError">Página inicial</Button>
		</div>
	</div>
</template>
