<script lang="ts">
  
	import Home from "./Home.svelte";
	import Router from 'svelte-spa-router';
	import MHST from "./MHST.svelte";
	import UnemploymentTable from "./unempApi/unemploymentTable.svelte";
	import DUTable from "./duApi/DUTable.svelte";
	const routes = {
		"/":Home,
		"/unemployment-stats":UnemploymentTable,
		"/du-stats": DUTable,
		"/mh-stats": MHST};
</script>
<main>
	<Router {routes}> </Router>
</main>
<style>
</style>