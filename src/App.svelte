<script lang="ts">
  
	import Home from "./Home.svelte";
	import Router from 'svelte-spa-router';
	import MHST from "./MHST.svelte";
	const routes = {
		"/":Home,
		"/mh-stats": MHST};
</script>
<main>
	<Router {routes}> </Router>
</main>
<style>
</style>