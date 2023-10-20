<script setup lang="ts">
import { RiUser3Line, RiPhoneLine, RiMailLine, RiMapPinLine, RiPencilLine, RiAddLine } from "vue-remix-icons"

const name = "Kayky de Sousa"
const objective = "Desenvolvedor Front-end"
const phone = "+55 11 91234-1234"
const email = "kaykydesousa@gmail.com"
const local = "São Paulo, SP"
</script>
<template>
	<ActionBar />
	<main class="flex-1 p-6 flex flex-col gap-y-6 max-w-5xl mx-auto w-full">
		<section class="flex flex-col gap-y-4">
			<div class="flex flex-col md:flex-row gap-x-4">
				<RiUser3Line class="fill-slate-900 h-12 w-12 md:h-16 md:w-16 flex-shrink-0" />
				<div>
					<h1 class="text-2xl text-slate-900 font-medium font-lexend leading-normal">
						{{ name }}
					</h1>
					<h2 class="text-neutral-500 font-medium font-lexend text-lg leading-normal md:text-xl">
						{{ objective }}
					</h2>
				</div>
			</div>
			<div class="flex flex-col gap-y-2">
				<JobInfoIcon :icon="RiPhoneLine" class="!text-base">{{ phone }}</JobInfoIcon>
				<JobInfoIcon :icon="RiMailLine" class="!text-base">{{ email }}</JobInfoIcon>
				<JobInfoIcon :icon="RiMapPinLine" class="!text-base">{{ local }}</JobInfoIcon>
			</div>
		</section>
		<section class="flex flex-col gap-y-3">
			<div class="flex justify-between items-center">
				<h1 class="text-lg text-slate-900 font-medium font-lexend">Resumo</h1>
				<IconButton>
					<RiPencilLine class="fill-slate-900 h-6 w-6" />
				</IconButton>
			</div>
			<p class="whitespace-pre-wrap">
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum venenatis placerat odio,
				vitae tincidunt purus euismod ac. Phasellus sed purus aliquet, bibendum nibh nec, fringilla
				neque. Maecenas ac commodo nisi. Suspendisse id felis at enim aliquam pharetra. Donec sed sem
				bibendum sem gravida facilisis non in felis.
			</p>
		</section>
		<section class="flex flex-col gap-y-3">
			<div class="flex justify-between items-center">
				<h1 class="text-lg text-slate-900 font-medium font-lexend">Escolaridade</h1>
				<IconButton>
					<RiAddLine class="fill-slate-900 h-6 w-6" />
				</IconButton>
			</div>
			<div class="bg-white p-4 shadow rounded">
				<h2 class="text-slate-900 font-semibold mb-2">
					Graduação em Desenvolvimento de Software Multiplataforma
				</h2>
				<div class="flex items-end">
					<div class="flex-1 text-sm text-neutral-500 font-medium">
						<p>FATEC da Zona Leste</p>
						<p>São Paulo, SP</p>
						<p>02/2023 - 12/2025 (Cursando)</p>
						<p>Período: Manhã • Modelo: Presencial</p>
					</div>
					<IconButton>
						<RiPencilLine class="fill-slate-900 h-6 w-6" />
					</IconButton>
				</div>
			</div>
		</section>
	</main>
</template>
