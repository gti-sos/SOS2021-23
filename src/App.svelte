<script lang="ts">
  
	import Home from "./Home.svelte";
	import Router from 'svelte-spa-router';
	import MHST from "./MHST.svelte";
	import UnemploymentTable from "./unempAPI/unemploymentTable.svelte";
	import DUSTATS from "./duAPI/DUTable.svelte";
	import HDISTATS from "./hdiAPI/HDITable.svelte";
	import EUT from "./unempAPI/EditUnempTable.svelte";
	import DUS from "./duAPI/EditDUTable.svelte";
	import EHDI from "./hdiAPI/EditHDITable.svelte";
	import UnemploymentCharts from "./unempAPI/unemploymentChart.svelte";
	import DrugChart from "./duAPI/DrugsAnalytic.svelte";
	
	const routes = {
		"/info":Home,
		"/unemployment-stats":UnemploymentTable,
		"/du-stats":DUSTATS,
		"/mh-stats":MHST,
		"/hdi-stats":HDISTATS,
		"/unemployment-stats/:country/:year":EUT,
		"/du-stats/:country/:year":DUS,
		"/hdi-stats/:country/:year":EHDI,
		"/unemployment-stats/unemploymentCharts":UnemploymentCharts,
		"/du-stats/DrugsAnalytic":DrugChart
		};
</script>
<main>
	<Router {routes}> </Router>
</main>
<style>
</style>