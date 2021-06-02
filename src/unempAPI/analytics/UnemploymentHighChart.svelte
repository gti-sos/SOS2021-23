<script>
  import{Nav, NavItem, NavLink } from "sveltestrap";
  const BASE_API_PATH = "/api/v2";
  let unemploymentData=[];
  let unemploymentChartCountryYear = [];
  let unemploymentChartKnoperc = [];
  let unemploymentChartIntperc = [];
  let unemploymentChartGfperc = [];
  let errorMsg="Tiene que cargar los datos para visualizar las analíticas.";
  let cargados = false;
  async function loadChart() {
      console.log("Fetching data...");
      const res = await fetch(BASE_API_PATH + "/unemployment-stats");
      unemploymentData = await res.json();
      if (res.ok) {
        unemploymentData.forEach(stat => {
          unemploymentChartCountryYear.push(stat.country+"-"+stat.year);
          //unemploymentChartKnoperc.push(stat["knoperc"]);
          //unemploymentChartIntperc.push(stat["intperc"]);
          //unemploymentChartGfperc.push(stat["gfperc"]);  
          unemploymentChartKnoperc.push(parseFloat(stat.knoperc));
          unemploymentChartIntperc.push(parseFloat(stat.intperc));
          unemploymentChartGfperc.push(parseFloat(stat.gfperc));
          });
          cargados=true;
      }
      
  console.log("Unemployment Chart data: " + unemploymentData);
          
  Highcharts.chart('container', {
    chart: {
        type: 'column'
    },
    title: {
        text: 'Porcentajes de paro según Knoema.es,InternetWorldStats.com y Gfmag.com'
    },
    xAxis: {
        categories: unemploymentChartCountryYear,
        crosshair: true
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Rainfall (mm)'
        }
    },
    tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
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
        name: 'Knoperc',
        data: unemploymentChartKnoperc

    }, {
        name: 'Intperc',
        data: unemploymentChartIntperc

    }, {
        name: 'Gfperc',
        data: unemploymentChartGfperc

    }]
});
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
        <NavLink href="#/info">Página Principal</NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="#/integrations">Integrations</NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="#/unemployment-stats">Datos</NavLink>
      </NavItem>
  </Nav>

  <div>
      <h2>
        Análiticas
      </h2>
    </div>

  <div>
      <figure class="highcharts-figure">
        <div id="container" />
        <p class="highcharts-description">
          Gráfico de columnas que muestran los porcentajes de paro.
        </p>
      </figure>
  </div>
  

  <div>
    {#if !cargados}
      <p class="error">{errorMsg}</p>
    {/if}
  </div>
</main>

<style>
  main {
      text-align: center;
      padding: 30px;       
  }
  p.error{
    color: red; 
    text-align:center;
    font-size: 20px;
    margin-top:80px;
  }
  
  .highcharts-figure,
  .highcharts-data-table table {
  /*min-width: 360px;
  max-width: 800px;*/
  margin: 1em auto;
   }
.highcharts-data-table table {
  font-family: Verdana, sans-serif;
  border-collapse: collapse;
  border: 1px solid #ebebeb;
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
.highcharts-data-table td,
.highcharts-data-table th,
.highcharts-data-table caption {
  padding: 0.5em;
}
.highcharts-data-table thead tr,
.highcharts-data-table tr:nth-child(even) {
  background: #f8f8f8;
}
.highcharts-data-table tr:hover {
  background: #f1f7ff;
}

</style>