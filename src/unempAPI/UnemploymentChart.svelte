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
          title: {
              text: 'Unemployment-stats'
          },
          yAxis: {
              title: {
                  text: 'Valor'
              }
          },
          xAxis: {
              title: {
                  text: 'País-Año'
              },
              categories: unemploymentChartCountryYear,
          },
          legend: {
              layout: 'vertical',
              align: 'right',
              verticalAlign: 'middle'
          },
      
       
      
          series: [{
              name: 'Porcentaje según Knoema',
              data: unemploymentChartKnoperc,
          }, {
              name: 'Porcentaje según InternetWorldStat',
              data: unemploymentChartIntperc,
          }, {
              name: 'Porcentaje según Gfmag',
              data: unemploymentChartGfperc,
          }],
          responsive: {
              rules: [{
                  condition: {
                      maxWidth: 800
                  },
                  chartOptions: {
                      legend: {
                          layout: 'horizontal',
                          align: 'center',
                          verticalAlign: 'bottom'
                      }
                  }
              }]
          }
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
          Gráfico de líneas básico que muestra los diferentes valores para los campos de life-stats.
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