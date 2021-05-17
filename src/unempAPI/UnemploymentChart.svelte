
<script>

  import { Table, Button, Nav, NavItem, NavLink } from "sveltestrap";
  let unemploymentData = [];
  let unemploymentChartData = [];
  let unemploymentCountryYearData = [];
  let unemploymentChartKnoperc = [];
  let unemploymentChartIntperc= [];
  let unemploymentChartGfperc = [];
  async function loadChart() {
      console.log("Fetching data...");
      const res = await fetch("/api/v2/unemployment-stats");
      unemploymentData = await res.json();
      if (res.ok) {
        unemploymentData.forEach(stat => {
          unemploymentCountryYearData.push(stat.country+"/"+stat.year);
          unemploymentChartKnoperc.push(stat["knoperc"]);
          unemploymentChartIntperc.push(stat["intperc"]);
          unemploymentChartGfperc.push(stat["gfperc"]);   
        });
      }
      
      console.log("Unemployment chart: " + unemploymentChartData);
      Highcharts.chart("container", {
        title: {
          text: "Porcentaje de paro",
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
          categories: unemploymentCountryYearData,
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
            name: "Porcentaje de paro según Knoema",
            data: unemploymentChartKnoperc,
          },
          {
            name: "Porcentaje de paro según InternetWorldStats",
            data: unemploymentChartIntperc,
          },
          {
            name: "Porcentaje de paro según Gfmag",
            data: unemploymentChartGfperc,
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
      src="https://code.highcharts.com/modules/accessibility.js"></script>
  </svelte:head>

  <main>

    <Button href="#/info">Pagina principal</Button>
    <Button href="#/unemployment-stats">Datos</Button>
  
    <div>
      <h2>
        Análiticas
      </h2>
    </div>
  
    <div>
      <figure class="highcharts-figure">
        <div id="container" />
        <p class="highcharts-description">
          Gráfico de líneas básico que muestra los diferentes valores para los campos de unemployment-stats.
        </p>
      </figure>
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