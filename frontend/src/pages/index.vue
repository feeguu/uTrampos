<script setup lang="ts">
function signOut() {
	const token = useCookie("utrampos.token")
	token.value = null
	navigateTo("/login")
}
</script>

<template>
	<div class="bg-neutral-100 px-6 w-full min-h-screen flex flex-col justify-center items-center">
		<div class="w-full max-w-md flex flex-col gap-y-8">
			<h1 class="text-slate-900 font-semibold text-5xl text-center">
				Usuário <br /><span class="text-sky-500">Autenticado</span>
			</h1>
			<Button @click="signOut">Deslogar</Button>
		</div>
	</div>
</template>
