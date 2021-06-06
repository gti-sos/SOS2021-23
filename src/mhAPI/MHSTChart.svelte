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

    var msg = "";
    async function loadChart() {
      console.log("Obteniendo datos...");
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

      Highcharts.chart("container", {
        chart: {
        type: 'column',
        options3d: {
          enabled: true,
          alpha: 15,
          beta: 15,
          viewDistance: 25,
          depth: 40
        }
  },
        title: {
        text: 'Highcharts responsive chart'
        },

        subtitle: {
        text: 'Resize the frame or click buttons to change appearance'
        },

        legend: {
        align: 'right',
        verticalAlign: 'middle',
        layout: 'vertical'
        },

        xAxis: {
        categories: mhChartCountryDate,
        labels: {
            x: -10
        }
    },
    yAxis: {
        allowDecimals: false,
        title: {
            text: 'Afectados por cada 100 mil habitantes'
        }
    },
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
          
        ],
        responsive: {
          rules: [{
            condition: {
                maxWidth: 500
            },
            chartOptions: {
                legend: {
                    align: 'center',
                    verticalAlign: 'bottom',
                    layout: 'horizontal'
                },
                yAxis: {
                    labels: {
                        align: 'left',
                        x: 0,
                        y: -5
                    },
                    title: {
                        text: null
                    }
                },
                subtitle: {
                    text: null
                },
                credits: {
                    enabled: false
                }
            }
        }]
    }
});
    }
  </script>
  <svelte:head>
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/highcharts-3d.js"></script>
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
        Gráfica
      </h2>
    </div>
  
    {#if msg}
      <p>{msg}</p>
    {:else}
    <figure class="highcharts-figure">
      <div id="container"></div>
      <p class="highcharts-description">
        La gráfica muestra el número de afectados por cada 100 mil habitantes a través de barras.
      </p>
  </figure>
    {/if}
    <div id="visualization"></div>
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