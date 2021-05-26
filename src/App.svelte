<script lang="ts">
  
	import Home from "./Home.svelte";
	import Router from 'svelte-spa-router';
	import Analytics from "./Analytics.svelte";
	import Integrations from "./Integrations.svelte";


	import MHST from "./mhAPI/MHST.svelte";
	import DUSTATS from "./duAPI/DUTable.svelte";
	import HDISTATS from "./hdiAPI/HDITable.svelte";
	import DUS from "./duAPI/EditDUTable.svelte";
	import EHDI from "./hdiAPI/EditHDITable.svelte";
	import DrugChart from "./duAPI/Graph.svelte";
	import MHSTChart from "./mhAPI/MHSTChart.svelte";
	import HDIChart from "./hdiAPI/Graph.svelte";


		//UNEMPLOYMENT
	import UnemploymentTable from "./unempAPI/unemploymentTable.svelte";
	import EUT from "./unempAPI/EditUnempTable.svelte";
	import UnemploymentCharts from "./unempAPI/analytics/UnemploymentChart.svelte";
	import GraphApiExt1 from './unempAPI/analytics/ApiExt1.svelte';
	import GraphApiExt2 from './unempAPI/analytics/ApiExt2.svelte';
	import Graph01Divorce from './unempAPI/analytics/ApiG01Divorce.svelte';
	import Graph01Life from './unempAPI/analytics/ApiG01Life.svelte';
	import Graph02 from './unempAPI/analytics/ApiG02.svelte';
	import Graph24 from './unempAPI/analytics/ApiG24.svelte';




	//RUTAS
	const routes = {
		"/":Home,
		"/info":Home,
		"/analytics":Analytics,
		"/integrations":Integrations,


		"/unemployment-stats":UnemploymentTable,
		"/unemployment-stats/:country/:year":EUT,
		"/unemployment-stats/unemploymentCharts":UnemploymentCharts,
		"/unemployment-graph/graphApiExt1":GraphApiExt1,
		"/unemployment-graph/graphApiExt2":GraphApiExt2,
		"/unemployment-graph/graph01Divorce":Graph01Divorce,
		"/unemployment-graph/graph01Life":Graph01Life,
		"/unemployment-graph/graphG02":Graph02,
		"/unemployment-graph/graphG24":Graph24,



		"/du-stats":DUSTATS,
		"/mh-stats":MHST,
		"/hdi-stats":HDISTATS,
		"/du-stats/:country/:year":DUS,
		"/hdi-stats/:country/:year":EHDI,
		"/du-stats/Graph":DrugChart,
		"/mh-stats/chart":MHSTChart,
		"/hdi-stats/Graph":HDIChart,
          
          
		};
</script>
<main>
	<Router {routes}> </Router>
</main>
<style>
</style>