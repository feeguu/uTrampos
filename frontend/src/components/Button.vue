<template>
	<button
		type="button"
		@click="$emit('click', $event)"
		class="w-full bg-slate-900 flex justify-center gap-x-1 items-center h-12 px-4 text-white rounded font-semibold"
	>
		<slot />
	</button>
</template>
