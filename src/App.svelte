<script lang="ts">
  
	import Home from "./Home.svelte";
	import Router from 'svelte-spa-router';
	import MHST from "./MHST.svelte";
<<<<<<< HEAD
	import UnemploymentTable from "./unempApi/unemploymentTable.svelte";
	import DUTable from "./duApi/DUTable.svelte";
	const routes = {
		"/":Home,
		"/unemployment-stats":UnemploymentTable,
		"/du-stats": DUTable,
		"/mh-stats": MHST};
=======
	import UnemploymentTable from "./unempAPI/unemploymentTable.svelte";
	import DUSTATS from "./duAPI/DUTable.svelte";

	const routes = {
		"/":Home,
		"/unemployment-stats":UnemploymentTable,
		"/du-stats":DUSTATS,
		"/mh-stats":MHST};
>>>>>>> c87969489e5962ab854a1684379444ee04c413aa
</script>
<main>
	<Router {routes}> </Router>
</main>
<style>
</style>