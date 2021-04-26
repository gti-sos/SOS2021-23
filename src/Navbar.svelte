<script>
	import Logo from './Logo.svelte'
	import Hamburger from './Hamburger.svelte'
	import Menu from './Menu.svelte'
	export let sidebar = false
</script>
<header style="background:#343a40" class="flex justify-between p-2 items-center border-b-2">
	<nav class="flex">
		<Hamburger bind:open={sidebar}/>
		<Logo/>	
	</nav>
	
	<Menu/>
</header>