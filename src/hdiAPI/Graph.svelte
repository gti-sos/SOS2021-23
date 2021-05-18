<script>
  import{Nav, NavItem, NavLink } from "sveltestrap";
    
  const BASE_API_PATH_SEC="/api/v1";

  let hdiData = [];
  let hdiChartCountryDateData = []; 
  let hdiChartvalue = [];
  let hdiChartrank = [];
  let hdiChartscholar= [];
 

  
  let errorMsg="Tiene que cargar los datos para visualizar las analíticas.";
  let cargados = false;

  async function loadChart() {
      console.log("Fetching data..");
      
      const res = await fetch(BASE_API_PATH_SEC + "/hdi-stats");
      hdiData = await res.json();
      
      if (res.ok) {
          hdiData.forEach(stat => {
          hdiChartCountryDateData.push(stat.country+"/"+stat.year);
          hdiChartvalue.push(parseFloat(stat["hdivalue"]));
          hdiChartrank.push(parseFloat(stat["hdirank"]));   
          hdiChartscholar.push(parseFloat(stat["hdischolar"])); 
          
        });
        cargados=true;
      }
      
      console.log("hdi use chart: " + hdiData);
      Highcharts.chart("container", {
        title: {
          text: "Evaluacion hdi",
        },
        yAxis: {
          title: {
            text: "Valor",
          },
        },
        xAxis: {
          title: {
            text: "País/Añoo",
          },
          categories: hdiChartCountryDateData,
        },
        legend: {
          layout: "vertical",
          align: "right",
          verticalAlign: "middle",
        },
        annotations: [
          {
            labels: [
              {
                point: "date",
                text: "",
              },
              {
                point: "min",
                text: "Min",
                backgroundColor: "white",
              },
            ],
          },
        ],
        series: [
          {
            name: "Valoracion",
            data: hdiChartvalue,
          },
          {
            name: "Rango hdi",
            data: hdiChartrank,
          },
          {
            name: "Escolaridad",
            data: hdiChartscholar,
          }
          
        ],
        responsive: {
          rules: [
            {
              condition: {
                maxWidth: 500,
              },
              chartOptions: {
                legend: {
                  layout: "horizontal",
                  align: "center",
                  verticalAlign: "bottom",
                },
              },
            },
          ],
        },
      });
    }
  </script>
  <svelte:head>
    <script src="https://code.highcharts.com/highcharts.js"on:load={loadChart}></script>
    <script src="https://code.highcharts.com/modules/series-label.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    <script src="https://code.highcharts.com/modules/export-data.js"></script>
    <script
      src="https://code.highcharts.com/modules/accessibility.js">></script>
  </svelte:head>
  
  <main>
    <Nav>
      <NavItem>
        <NavLink href="#/info">Página Principal</NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="#/hdi-stats">Datos</NavLink>
      </NavItem>
  </Nav>
  
      <div>
          <h1 style="text-align: center;">Analítica <strong>(HDI)</strong></h1>
        </div>
      
      <div>
          <figure class="highcharts-figure">
            <div id="container" />
            <p class="highcharts-description">
              Gráfico de lí­neas básico que muestra valores con respecto al hdi en varios países
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
        padding: 1em;
        margin: 0 auto;
      }
      div{
        margin-bottom: 15px;
      }
      p {
        display: inline;
      }
    </style>