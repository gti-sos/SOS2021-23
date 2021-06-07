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
    let edex_country = [];
    let edex_capita = [];

    var msg = "";
    async function loadChart() {
      console.log("Obteniendo datos...");

      const resext = await fetch("/eduexpends");
      if (resext.ok) {
        console.log("OK");
        edex = await resext.json();
        edex.forEach(stat => {
            console.log(stat);
            edex_country.push(stat.country);
            edex_capita.push(stat.education_expenditure_per_capita);
            });
        }else {
        console.log("Not OK");
        }



      const res = await fetch(BASE_EDU_API_PATH);
      if (res.ok) {
        console.log("OK");
        mhsv = await res.json();
        mhsv.forEach(stat => {
            console.log(stat);
            if (edex_country.includes(stat.country)) {
            mhChartCountryDate.push(stat.country+"-"+stat.year);
            mhChartPopulation.push(parseFloat(stat.population));
            mhChartAnxdaly.push(parseFloat(stat.anxdaly));
            mhChartEating.push(parseFloat(stat.eating));
            mhChartAdhd.push(parseFloat(stat.adhd));
            mhChartBipolar.push(parseFloat(stat.bipolar));
            mhChartDepression.push(parseFloat(stat.depression));
            mhChartSchizophrenia.push(parseFloat(stat.schizophrenia)); 
            }
        msg="";
        });
      }else{
        console.log("Error");
        msg = "Por favor primero cargue los datos de la API";
      }
    
      const chart = Highcharts.chart('container', {
  chart: {
    zoomType: 'xy'
  }
});

let countSeries = chart.series.length;
while (countSeries--) {
  chart.series[countSeries].remove(false);
}

chart.update({
  xAxis: [{
    categories: mhChartCountryDate,
    crosshair: true
  }],
  yAxis: { // Primary yAxis
    id: 0,
    labels: {
      format: '{value} kk',
      style: {
        color: Highcharts.getOptions().colors[2]
      }
    },
    opposite: true

  },
  title: {
    text: 'Relación Población-GDP-Salud Mental(Depresión)'
  },
  tooltip: {
    shared: true
  },
  legend: {
    layout: 'vertical',
    align: 'left',
    x: 80,
    verticalAlign: 'top',
    y: 55,
    floating: true,
    backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
  }
});

const axes = [{ // Secondary yAxis
  id: 1,
  gridLineWidth: 0,
  title: {
    text: 'GDP per capita',
    style: {
      color: Highcharts.getOptions().colors[0]
    }
  },
  labels: {
    format: 'm.p.c',
    style: {
      color: Highcharts.getOptions().colors[0]
    }
  }

}, { // Tertiary yAxis
  id: 2,
  gridLineWidth: 0,
  title: {
    text: 'Depresión (por cada 100k)',
    style: {
      color: Highcharts.getOptions().colors[1]
    }
  },
  labels: {
    format: '{value} casos',
    style: {
      color: Highcharts.getOptions().colors[1]
    }
  },
  opposite: true
}]

chart.addAxis(axes[0]);
chart.addAxis(axes[1]);

const series = [{
  name: 'GDP',
  type: 'column',
  yAxis: 1,
  data: edex_capita.splice(0, mhChartCountryDate.length),
  tooltip: {
    valueSuffix: 'm.p.c'
  }

}, {
  name: 'Depresión',
  type: 'spline',
  yAxis: 2,
  data: mhChartDepression,
  marker: {
    enabled: false
  },
  dashStyle: 'shortdot',
  tooltip: {
    valueSuffix: ' mb'
  }

}, {
  name: 'Población',
  type: 'spline',
  yAxis: 0,
  data: mhChartPopulation,
  tooltip: {
    valueSuffix: ' kk'
  }
}];

series.forEach((seriesElement) => {
  chart.addSeries(seriesElement, false);
});

chart.redraw();

    }
  </script>
  <svelte:head>
    <script src="https://code.highcharts.com/highcharts.js"></script>
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
        Gráfica API SOS 2: education_expenditure + mh-stats
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