<script lang="ts">
  
	import Home from "./Home.svelte";
	import Router from 'svelte-spa-router';
	import MHST from "./MHST.svelte";
	import UnemploymentTable from "./unempAPI/unemploymentTable.svelte";
	import DUSTATS from "./duAPI/DUTable.svelte";
	import HDISTATS from "./hdiAPI/HDITable.svelte";
	
	const routes = {
		"/":Home,
		"/unemployment-stats":UnemploymentTable,
		"/du-stats":DUSTATS,
		"/mh-stats":MHST,
		"/hdi-stats":HDISTATS};
</script>
<main>
	<Router {routes}> </Router>
</main>
<style>
</style>