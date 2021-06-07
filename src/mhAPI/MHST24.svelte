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

    let chiout = [];
    let chiout_country = [];
    let chiout_total = [];


    var msg = "";
    async function loadChart() {
      console.log("Obteniendo datos...");

      const resext = await fetch("https://sos2021-24.herokuapp.com/api/v2/children-out-school");
      if (resext.ok) {
        console.log("OK");
        chiout = await resext.json();
        chiout.forEach(stat => {
            console.log(stat);
            chiout_country.push(stat.country);
            chiout_total.push(stat.children_out_school_total/100);
        });
    }else {
        console.log("Not OK");
        }

      const res = await fetch(BASE_EDU_API_PATH);
      if (res.ok) {
        var i = 0;
        console.log("OK");
        mhsv = await res.json();
        mhsv.forEach(stat => {
            console.log(stat);
            if (chiout_country.includes(stat.country)) {
            i++;
            mhChartCountryDate.push(stat.country+"-"+stat.year);
            mhChartPopulation.push(parseFloat(stat.population));
            mhChartAnxdaly.push(parseFloat(stat.anxdaly));
            mhChartEating.push(parseFloat(stat.eating));
            mhChartAdhd.push(parseFloat(stat.adhd));
            mhChartBipolar.push(parseFloat(stat.bipolar));
            mhChartDepression.push(parseFloat(stat.depression));
            mhChartSchizophrenia.push(parseFloat(stat.schizophrenia)); 
            }
            console.log(i);
        msg="";
        });
      }else{
        console.log("Error");
        msg = "Por favor primero cargue los datos de la API";
      }

Highcharts.chart('container', {

  chart: {
    type: 'streamgraph',
    marginBottom: 0,
    zoomType: 'x'
  },

  title: {
    floating: true,
    align: 'left',
    text: 'MH+NoEscolarizados'
  },
  xAxis: {
    maxPadding: 0,
    type: 'category',
    crosshair: true,
    categories: mhChartCountryDate,
    labels: {
      align: 'left',
      reserveSpace: true,
      rotation: 0
    },
    lineWidth: 0,
    margin: 100,
    tickWidth: 0
  },

  yAxis: {
    visible: false,
    startOnTick: false,
    endOnTick: false
  },

  legend: {
    enabled: true
  },
  plotOptions: {
    series: {
      label: {
        minFontSize: 5,
        maxFontSize: 15,
        style: {
          color: 'rgba(255,255,255,0.75)'
        }
      }
    }
  },

  // Data parsed with olympic-medals.node.js
  series: [
          {
            name: "Población",
            data: mhChartPopulation,
          },
          {
            name: "T. Ansiedad+Alimenticios",
            data: mhChartAnxdaly,
          },
          {
            name: "T. Alimenticios",
            data: mhChartEating,
          },
          {
            name: "TDAH",
            data: mhChartAdhd,
          },
          {
            name: "Bipolaridad",
            data: mhChartBipolar,
          },
          {
            name: "Depresión",
            data: mhChartDepression,
          },
          {
            name: "Esquizofrenia",
            data: mhChartSchizophrenia,
          },
          {
            name: "No escolarizados",
            data: chiout_total.splice(0, mhChartSchizophrenia.length),
          },
  ],
  exporting: {
    sourceWidth: 800,
    sourceHeight: 600
    }
    });
}
  </script>
  <svelte:head>
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/modules/streamgraph.js"></script>
    <script src="https://code.highcharts.com/modules/series-label.js"></script>
    <script src="https://code.highcharts.com/modules/annotations.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    <script src="https://code.highcharts.com/modules/export-data.js"></script>
    <script on:load={loadChart} src="https://code.highcharts.com/modules/accessibility.js"></script>
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
        Gráfica HighCharts Integración Mh-stats y children_out_school
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