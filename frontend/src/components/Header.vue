<script setup lang="ts">
import { RiMenu3Fill } from "vue-remix-icons"

const auth = useAuth()
const showMenu = ref(false)
</script>

<template>
	<header
		class="z-40 h-[4.5rem] w-full bg-white sticky top-0 left-0 px-6 flex items-center justify-between border-neutral-300 border-b"
	>
		<Logo class="!text-2xl" />
		<div class="hidden items-center gap-x-4 md:flex">
			<Anchor href="/jobs">Vagas</Anchor>
			<template v-if="auth.candidate">
				<Anchor href="/candidate/profile">Perfil</Anchor>
			</template>
			<template v-if="auth.company">
				<Anchor href="/company">Suas vagas</Anchor>
			</template>
			<template v-if="auth.admin">
				<Anchor href="/admin/dashboard">Dashboard</Anchor>
			</template>
			<template v-if="auth.user">
				<Button class="!button-secondary !w-fit" @click="auth.logout">Sair</Button>
			</template>
			<template v-else>
				<LinkButton class="!button-secondary !w-fit" href="/login">Entrar</LinkButton>
			</template>
		</div>
		<button class="md:hidden" @click="showMenu = true">
			<RiMenu3Fill class="fill-slate-900 h-6 w-6" />
		</button>
		<SideBar :show="showMenu" @close="showMenu = false">
			<Anchor href="/jobs">Vagas</Anchor>
			<template v-if="auth.candidate">
				<Anchor href="/candidate/profile">Perfil</Anchor>
			</template>
			<template v-if="auth.company">
				<Anchor href="/company">Suas vagas</Anchor>
			</template>
			<template v-if="auth.admin">
				<Anchor href="/admin/dashboard">Dashboard</Anchor>
			</template>
			<template v-if="auth.user">
				<Button class="!button-secondary" @click="auth.logout">Sair</Button>
			</template>
			<template v-else>
				<LinkButton class="!button-secondary" href="/login">Entrar</LinkButton>
			</template>
		</SideBar>
	</header>
</template>
