<script setup lang="ts">
interface StepsProps {
	currentStep: number
	steps: string[]
}

defineProps<StepsProps>()
</script>

<template>
	<div
		class="grid grid-cols-1 justify-between border-b pb-4 gap-x-6 gap-y-2 md:gap-y-4 md:grid-cols-[repeat(3,auto)]"
	>
		<button
			type="button"
			@click="$emit('stepClick', index + 1, step)"
			class="inline-flex items-center"
			v-for="(step, index) in steps"
		>
			<div
				:class="[
					'h-8 w-8 flex-shrink-0 font-semibold rounded text-center leading-[2rem]',
					currentStep === index + 1 ? 'bg-sky-500 text-white' : 'bg-sky-100 text-sky-500',
				]"
			>
				{{ index + 1 }}
			</div>
			<p class="ml-2 text-neutral-500 text-start">{{ step }}</p>
		</button>
	</div>
</template>
