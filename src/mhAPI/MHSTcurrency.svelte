<script>
    import { onMount } from "svelte";
    import { Table, Button, Nav, NavItem, NavLink } from "sveltestrap";
    const BASE_EDU_API_PATH = "/api/v1/mh-stats";
    let mhsv = [];
    let mhChartCountryDate = [];
    let mhChartPopulation = [];
    let mhChartAnxdaly = [];
    let mhChartEating = [];
    let mhChartAdhd = [];
    let mhChartBipolar = [];
    let mhChartDepression = [];
    let mhChartSchizophrenia = [];

    let edex = [];
    let edex_values = [];

    var msg = "";
    async function loadChart() {
      console.log("Obteniendo datos...");

      const resext = await fetch("https://api.currencyscoop.com/v1/historical?api_key=69a2057b320b11653a1027d15bc10078&date=2017-07-07");
      if (resext.ok) {
        console.log("OK");
        edex = await resext.json();
        edex_values.push(parseFloat(edex.response.rates.CAD));
        edex_values.push(parseFloat(edex.response.rates.EUR));
        edex_values.push(parseFloat(edex.response.rates.EUR));
        edex_values.push(parseFloat(edex.response.rates.EUR));
        edex_values.push(parseFloat(edex.response.rates.MXN));
        edex_values.push(parseFloat(edex.response.rates.DKK));
        edex_values.push(parseFloat(edex.response.rates.USD));
        edex_values.push(parseFloat(edex.response.rates.EUR));
        edex_values.push(parseFloat(edex.response.rates.EUR));
        edex_values.push(parseFloat(edex.response.rates.EUR));
        edex_values.push(parseFloat(edex.response.rates.KZT));
        edex_values.push(parseFloat(edex.response.rates.GBP));
        edex_values.push(parseFloat(edex.response.rates.BRR));
        edex_values.push(parseFloat(edex.response.rates.COP));
        edex_values.push(parseFloat(edex.response.rates.JPY));
        edex_values.push(parseFloat(edex.response.rates.EUR));
        edex_values.push(parseFloat(edex.response.rates.EUR));
        console.log("Lista completa: "+edex_values);
        }else {
        console.log("Not OK");
        }

      const res = await fetch(BASE_EDU_API_PATH);
      if (res.ok) {
        console.log("OK");
        mhsv = await res.json();
        mhsv.forEach(stat => {
            console.log(stat);
            mhChartCountryDate.push(stat.country+"-"+stat.year);
            mhChartPopulation.push(parseFloat(stat.population));
            mhChartAnxdaly.push(parseFloat(stat.anxdaly));
            mhChartEating.push(parseFloat(stat.eating));
            mhChartAdhd.push(parseFloat(stat.adhd));
            mhChartBipolar.push(parseFloat(stat.bipolar));
            mhChartDepression.push(parseFloat(stat.depression));
            mhChartSchizophrenia.push(parseFloat(stat.schizophrenia)); 
        msg="";
        });
      }else{
        console.log("Error");
        msg = "Por favor primero cargue los datos de la API";
      }
      var data = [{
    name: mhChartCountryDate[0],
    low: 0,
    high: edex_values[0]
},{
    name: mhChartCountryDate[1],
    low: 0,
    high: edex_values[1]
},{
    name: mhChartCountryDate[2],
    low: 0,
    high: edex_values[2]
},{
    name: mhChartCountryDate[3],
    low: 0,
    high: edex_values[3]
},{
    name: mhChartCountryDate[4],
    low: 0,
    high: edex_values[4]
},{
    name: mhChartCountryDate[5],
    low: 0,
    high: edex_values[5]
},{
    name: mhChartCountryDate[5],
    low: 0,
    high: edex_values[5]
},{
    name: mhChartCountryDate[6],
    low: 0,
    high: edex_values[6]
},
];

Highcharts.chart('container', {

    chart: {
        type: 'dumbbell',
        inverted: true
    },

    legend: {
        enabled: false
    },

    subtitle: {
        text: 'Valor moneda en 2017 (base dólar)'
    },

    title: {
        text: 'Según CurrencyScoop'
    },

    tooltip: {
        shared: true
    },

    xAxis: {
        type: 'category'
    },

    yAxis: {
        title: {
            text: 'Valor de la moneda'
        }
    },

    series: [{
        name: 'Datos históricos para la moneda de cada país',
        data: data
    }]

});
    }
  </script>
  <svelte:head>
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/highcharts-more.js"></script>
    <script src="https://code.highcharts.com/modules/dumbbell.js"></script>
    <script src="https://code.highcharts.com/modules/series-label.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    <script src="https://code.highcharts.com/modules/export-data.js"></script>
    <script
      src="https://code.highcharts.com/modules/accessibility.js"
      on:load={loadChart}></script>
  </svelte:head>
  <main>
    <Nav>
      <NavItem>
        <NavLink href="/#/info">Página Principal</NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="#/mh-stats">Datos</NavLink>
      </NavItem>
    </Nav>
  
    <div>
      <h2>
        Gráfica API Ext 1: Valor moneda en los países de Mh-Stats
      </h2>
    </div>
  
    {#if msg}
      <p>{msg}</p>
    {:else}
    <figure class="highcharts-figure">
      <div id="container"></div>
  </figure>
    {/if}
  </main>
  <style>
    main {
      text-align: center;
      padding: 1em;
      margin: 0 auto;
    }
    div{
      margin-bottom: 15px;
    }
    p {
      display: inline;
    }
    .msgRed {
      padding: 8px;
      background-color: #f8d7da;
    }
    .msgGreen {
      padding: 8px;
      background-color: #d4edda;
    }
    .highcharts-figure, .highcharts-data-table table {
    min-width: 310px; 
    max-width: 800px;
    margin: 1em auto;
}

.highcharts-data-table table {
	font-family: Verdana, sans-serif;
	border-collapse: collapse;
	border: 1px solid #EBEBEB;
	margin: 10px auto;
	text-align: center;
	width: 100%;
	max-width: 500px;
}
.highcharts-data-table caption {
    padding: 1em 0;
    font-size: 1.2em;
    color: #555;
}
.highcharts-data-table th {
	font-weight: 600;
    padding: 0.5em;
}
.highcharts-data-table td, .highcharts-data-table th, .highcharts-data-table caption {
    padding: 0.5em;
}
.highcharts-data-table thead tr, .highcharts-data-table tr:nth-child(even) {
    background: #f8f8f8;
}
.highcharts-data-table tr:hover {
    background: #f1f7ff;
}
  </style>