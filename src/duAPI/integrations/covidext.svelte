<script>
    import { pop }from "svelte-spa-router";
    import { Button } from "sveltestrap";
    var covidStats = [];
    var errorMsg = "";
    console.log("Cargando página...");
    function cleanChar(str, char) {
      while (true) {
          var result_1 = str.replace(char, '');
          if (result_1 === str) {
              break;
          }
          str = result_1;
      }
      return str;
  }
    
    async function getCovidStats() {
      console.log("Fetching covid data...");
      const res = await fetch("https://corona-virus-world-and-india-data.p.rapidapi.com/api", {
        "method": "GET",
        "headers": {
          "x-rapidapi-key": "8bc009cf62msh21716bede95b074p10450fjsnae5393291199",
          "x-rapidapi-host": "corona-virus-world-and-india-data.p.rapidapi.com"
        }
  }); 
      console.log(res);
      if (res.ok) {
        const json = await res.json();
        covidStats = json;
        console.log(`We have received ${covidStats.length} covid-stats.`);
        console.log("Ok");
      } else {
        errorMsg = "Error recuperando datos de ansiedad";
        console.log("ERROR!" + errorMsg);
      }
    }
    async function loadGraph() {
      console.log("Inicio getStats");
      await getCovidStats();
      console.log('Datos ansiedad recibidos para pintar el grafo:');
      console.log(covidStats);
      Highcharts.chart('container', {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Monthly Average Rainfall'
        },
        xAxis: {
            categories: [
                covidStats.countries_stat[11].country_name,
                covidStats.countries_stat[12].country_name,
                covidStats.countries_stat[13].country_name,
                covidStats.countries_stat[3].country_name,
                covidStats.countries_stat[4].country_name,
                covidStats.countries_stat[5].country_name,
                covidStats.countries_stat[6].country_name,
                covidStats.countries_stat[7].country_name,
                covidStats.countries_stat[8].country_name,
                covidStats.countries_stat[9].country_name,
                covidStats.countries_stat[10].country_name
            ],
            crosshair: true
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Valor númerico'
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y} personas</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: [{
            name: 'Muertes',
            data: [parseInt(cleanChar(covidStats.countries_stat[11].deaths,",")),
            parseInt(cleanChar(covidStats.countries_stat[12].deaths,",")), parseInt(cleanChar(covidStats.countries_stat[13].deaths,",")),
            parseInt(cleanChar(covidStats.countries_stat[3].deaths,",")), parseInt(cleanChar(covidStats.countries_stat[4].deaths,",")),
            parseInt(cleanChar(covidStats.countries_stat[5].deaths,",")), parseInt(cleanChar(covidStats.countries_stat[6].deaths,",")), 
            parseInt(cleanChar(covidStats.countries_stat[7].deaths,",")), parseInt(cleanChar(covidStats.countries_stat[8].deaths,",")),
            parseInt(cleanChar(covidStats.countries_stat[9].deaths,",")), parseInt(cleanChar(covidStats.countries_stat[10].deaths,","))]
        }, {
            name: 'Casos activos',
            data: [parseInt(cleanChar(covidStats.countries_stat[11].active_cases,",")),
            parseInt(cleanChar(covidStats.countries_stat[12].active_cases,",")), parseInt(cleanChar(covidStats.countries_stat[13].active_cases,",")),
            parseInt(cleanChar(covidStats.countries_stat[3].active_cases,",")), parseInt(cleanChar(covidStats.countries_stat[4].active_cases,",")),
            parseInt(cleanChar(covidStats.countries_stat[5].active_cases,",")), parseInt(cleanChar(covidStats.countries_stat[6].active_cases,",")), 
            parseInt(cleanChar(covidStats.countries_stat[7].active_cases,",")), parseInt(cleanChar(covidStats.countries_stat[8].active_cases,",")),
            parseInt(cleanChar(covidStats.countries_stat[9].active_cases,",")), parseInt(cleanChar(covidStats.countries_stat[10].active_cases,","))]
        }, {
            name: 'Total de recuperados',
            data: [parseInt(cleanChar(covidStats.countries_stat[11].total_recovered,",")/10),
            parseInt(cleanChar(covidStats.countries_stat[12].total_recovered,",")/10), parseInt(cleanChar(covidStats.countries_stat[13].total_recovered,",")/10),
            parseInt(cleanChar(covidStats.countries_stat[3].total_recovered,",")/10), parseInt(cleanChar(covidStats.countries_stat[4].total_recovered,",")/10),
            parseInt(cleanChar(covidStats.countries_stat[5].total_recovered,",")/10), parseInt(cleanChar(covidStats.countries_stat[6].total_recovered,",")/10), 
            parseInt(cleanChar(covidStats.countries_stat[7].total_recovered,",")/10), parseInt(cleanChar(covidStats.countries_stat[8].total_recovered,",")/10),
            parseInt(cleanChar(covidStats.countries_stat[9].total_recovered,",")/10), parseInt(cleanChar(covidStats.countries_stat[10].total_recovered,",")/10)]
        }]
    });
  };
  </script>
  
  <svelte:head>
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    <script src="https://code.highcharts.com/modules/export-data.js"></script>
    <script src="https://code.highcharts.com/modules/accessibility.js" on:load={loadGraph}></script>
  </svelte:head>
  
  <main>
    <div>
      <h2>Integración API SOS covid-stats</h2>
    </div>
    {#if errorMsg}
      <p>{errorMsg}</p>
    {:else}
    <style>
            .highcharts-figure, .highcharts-data-table table {
          min-width: 310px; 
          max-width: 800px;
          margin: 1em auto;
      }
      #container {
          height: 400px;
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
  
    <figure class="highcharts-figure">
      <div id="container"></div>
  </figure>
    <br>
    <br>
    <h6>Gráfico en dónde se muestra las muertes por coronavirus, casos activos y total de recuperados (divididos en un factor de 10)</h6>
    {/if}
    <Button outline color="secondary" on:click="{pop}">Atrás</Button>
  </main>
  
  <style>
    main {
      text-align: center;
      padding: 1em;
      margin: 0 auto;
    }
    div {
      margin-bottom: 15px;
    }
  </style>