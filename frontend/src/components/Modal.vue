<script setup lang="ts">
interface ModalProps {
	show: boolean
}

defineProps<ModalProps>()
</script>

<template>
	<div
		class="fixed z-50 top-0 left-0 bg-black min-h-screen w-full flex items-end justify-center bg-opacity-70 p-4 md:items-center"
		v-if="show"
	>
		<div
			class="bg-white w-full rounded p-6 flex flex-col justify-center items-center text-center gap-y-4 md:max-w-lg"
		>
			<span
				class="font-lexend text-sky-500 text-3xl font-black leading-[3rem] text-center h-12 w-12 bg-sky-500 bg-opacity-20 rounded-full"
				>!</span
			>
			<p class="text-xl text-slate-900 font-semibold">Deseja Continuar?</p>
			<p class="text-neutral-500">
				Você está prestes a confirmar sua candidatura para a vaga de emprego. Por favor, revise seu
				currículo com atenção antes de prosseguir.
			</p>
			<div class="flex w-full flex-col gap-y-2">
				<LinkButton href="/profile/curriculum">Revisar Currículo</LinkButton>
				<Button>Continuar</Button>
			</div>
		</div>
	</div>
</template>
