<script lang="ts">
  
	import Home from "./Home.svelte";
	import Router from 'svelte-spa-router';
	import MHST from "./MHST.svelte";
	import UnemploymentTable from "./unempAPI/unemploymentTable.svelte";
	import DUSTATS from "./duAPI/DUTable.svelte";
	import HDISTATS from "./hdiAPI/HDITable.svelte";
	import EUT from "./unempAPI/EditUnempTable.svelte";
	import DUS from "./duAPI/EditDUTable.svelte";
	
	const routes = {
		"/info":Home,
		"/unemployment-stats":UnemploymentTable,
		"/du-stats":DUSTATS,
		"/mh-stats":MHST,
		"/hdi-stats":HDISTATS,
		"/unemployment-stats/:country/:year":EUT,
		"/du-stats/:country/:year":DUS,};
</script>
<main>
	<Router {routes}> </Router>
</main>
<style>
</style>