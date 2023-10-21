<template>
	<button
		@click="$emit('click', $event)"
		class="p-1 -m-1 rounded-full transition-colors hover:bg-neutral-200"
	>
		<slot />
	</button>
</template>
