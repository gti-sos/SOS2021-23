<script lang="ts">
  
	import Home from "./Home.svelte";
	import Router from 'svelte-spa-router';
	import Analytics from "./Analytics.svelte";
	import Integrations from "./Integrations.svelte";
	import About from "./About.svelte";
	import PreApi from "./PreApi.svelte";



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
	import UnemploymentHighCharts from "./unempAPI/analytics/UnemploymentHighChart.svelte";
	import UnemploymentAwesomeCharts from "./unempAPI/analytics/UnemploymentAwesomeChart.svelte";
	import GraphApiExt1 from './unempAPI/analytics/ApiExt1.svelte';
	import GraphApiExt2 from './unempAPI/analytics/ApiExt2.svelte';
	import Graph01Divorce from './unempAPI/analytics/ApiG01Divorce.svelte';
	import Graph01Life from './unempAPI/analytics/ApiG01Life.svelte';
	import Graph02 from './unempAPI/analytics/ApiG02.svelte';
	import Graph24 from './unempAPI/analytics/ApiG24.svelte';

	//DRUGS
	
	import DrugChart1 from './duAPI/analytics/graph1.svelte';
	import DrugChart2 from './duAPI/analytics/graphMorris.svelte';
	import EXTschool from './duAPI/integrations/schoolgraph.svelte';
	import EXTobesity from './duAPI/integrations/obesitygraph.svelte';
	import EXTchuck from './duAPI/integrations/chucknorris.svelte';
	import EXTrick from './duAPI/integrations/rick.svelte';

	import MHST04 from './mhAPI/MHST04.svelte';
	import MHST24 from './mhAPI/MHST24.svelte';
	import MHSTcurrency from './mhAPI/MHSTcurrency.svelte';
	import MHSTnhl from './mhAPI/MHSTnhl.svelte';
	//RUTAS
	const routes = {
		//"/":PreApi,
		"/":PreApi,
		"/info":Home,
		"/analytics":Analytics,
		"/integrations":Integrations,
		"/about":About,


		"/unemployment-stats":UnemploymentTable,
		"/unemployment-stats/:country/:year":EUT,
		"/unemployment-stats/unemploymentHighCharts":UnemploymentHighCharts,
		"/unemployment-stats/unemploymentAwesomeCharts":UnemploymentAwesomeCharts,
		"/unemployment-graph/graphApiExt1":GraphApiExt1,
		"/unemployment-graph/graphApiExt2":GraphApiExt2,
		"/unemployment-graph/graph01Divorce":Graph01Divorce,
		"/unemployment-graph/graph01Life":Graph01Life,
		"/unemployment-graph/graphG02":Graph02,
		"/unemployment-graph/graphG24":Graph24,

		"/du-stats/graph1": DrugChart1,
		"/du-stats/graphMorris": DrugChart2,
		"/du-stats/schoolgraph": EXTschool,
		"/du-stats/obesitygraph": EXTobesity,
		"/du-stats/chucknorris": EXTchuck,
		"/du-stats/rick": EXTrick,
		


		"/du-stats":DUSTATS,
		"/mh-stats":MHST,
		"/hdi-stats":HDISTATS,
		"/du-stats/:country/:year":DUS,
		"/hdi-stats/:country/:year":EHDI,
		"/du-stats/Graph":DrugChart,
		"/mh-stats/chart":MHSTChart,
		"/hdi-stats/Graph":HDIChart,
		"/mh-stats/education_expenditure":MHST04,
		"/mh-stats/children_out_school":MHST24,
		"/mh-stats/currencyscoop":MHSTcurrency,
		"/mh-stats/nhl_records":MHSTnhl,
		};
</script>
<main>
	<!-- svelte-ignore missing-declaration -->
	<Router {routes}> </Router>
</main>
<style>
</style>