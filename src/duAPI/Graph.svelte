<script>
  import{Nav, NavItem, NavLink } from "sveltestrap";
    
  const BASE_API_PATH_SEC="/api/v1";

  let drugData = [];

  let drugChartChartCountryYear = []; 
  let drugChartPopulation = [];
  let drugChartDead = [];
  let drugChartDependence = [];
  let drugChartDaly = [];

  
  let errorMsg="Tiene que cargar los datos para visualizar las analíticas.";
  let cargados = false;

  async function loadChart() {
      console.log("Fetching data...");
      
      const res = await fetch(BASE_API_PATH_SEC + "/du-stats");
      drugData = await res.json();
      
      if (res.ok) {
          drugData.forEach(stat => {
            drugChartChartCountryYear.push(parseFloat(stat.country+"/"+stat.year));
          drugChartPopulation.push(parseFloat(stat["dupopulation"]));
          drugChartDead.push(parseFloat(stat["dudead"]));   
          drugChartDependence.push(parseFloat(stat["dudependenceperc"])); 
          drugChartDaly.push(parseFloat(stat["dudaly"]));   
        });
        cargados=true;
      }
      
      console.log("Drug use chart: " + drugData);
      Highcharts.chart("container", {
        title: {
          text: "Consumo de drogas",
        },
        yAxis: {
          title: {
            text: "Valor",
          },
        },
        xAxis: {
          title: {
            text: "País/Año",
          },
          categories: drugChartCountryDateData,
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
            name: "Población",
            data: drugChartPopulation,
          },
          {
            name: "Muertes por consumo de drogas",
            data: drugChartDead,
          },
          {
            name: "Porcentaje de dependencia",
            data: drugChartDependence,
          },
          {
            name: "D.A.L.Y",
            data: drugChartDaly,
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
        <NavLink href="#/du-stats">Datos</NavLink>
      </NavItem>
  </Nav>
  
      <div>
          <h1 style="text-align: center;">Analítica <strong>(Consumo de drogas)</strong></h1>
        </div>
      
      <div>
          <figure class="highcharts-figure">
            <div id="container" />
            <p class="highcharts-description">
              Gráfico de lí­neas básico que muestra valores con respecto al consumo de drogas en varios países
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