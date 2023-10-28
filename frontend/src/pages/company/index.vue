<script setup lang="ts">
const { user, company } = useAuth()
</script>
<template>
	<div class="flex-1 flex flex-col justify-center items-center">
		<p class="text-slate-900 text-lg font-semibold mb-4">{{ user.name }}</p>
		<LinkButton href="/jobs/create" class="!w-fit">Cadastrar Vaga</LinkButton>
	</div>
</template>
