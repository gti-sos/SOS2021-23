<script>
  
const BASE_API_PATH_SEC="/api/v1";

let drugData = [];
let drugChartCountryDateData = []; 
let drugChartPopulation = [];
let drugChartDead = [];
let drugChartDependence = [];
let drugChartDaly = [];

    async function loadChart() {
        console.log("Fetching data...");
        const res = await fetch(BASE_API_PATH_SEC + "/du-stats");
        drugData = await res.json();
    if (res.ok) {
          drugData.forEach(stat => {
          drugChartCountryDateData.push(stat.country+"/"+stat.year);
          drugChartPopulation.push(parseFloat(stat["dupopulation"]));
          drugChartDead.push(parseFloat(stat["dudead"]));   
          drugChartDependence.push(parseFloat(stat["dudependenceperc"])); 
          drugChartDaly.push(parseFloat(stat["dudaly"]));   
        });
        }
        
        console.log("Drug use chart: " + drugData);
        
        Highcharts.chart("container", {
          chart: {
            type: 'cylinder',
            options3d: {
                enabled: true,
                alpha: 15,
                beta: 20,
                depth: 50,
                viewDistance: 60
            }
        },
          title: {
            text: "Consumo de droga en el 2017",
          },
          yAxis: {
            title: {
              text: "Valor",
            },
          },
          xAxis: {
            title: {
              text: "",
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
                  backgroundColor: "gray",
                },
              ],
            },
          ],
         plotOtions: {
            series: {
                depth: 30,
                colorByPoint: false
            }
        },
          series: [
            {
              name: "Población de cada país (millones)",
              data: drugChartPopulation,
              color: "#5062a0 "
            },  
          {
              name: "Muertes por consumo de drogas (millones)",
              data: drugChartDead,
              color: "#3c8dbc"
            },
            {
              name: "Porcentaje de dependencia",
              data: drugChartDependence,
              color: "#7DCEA0",
            },
            {
              name: "D.A.L.Y",
              data: drugChartDaly,
              color: "#EC7063",
            }
            
          ],
          responsive: {
            rules: [
              {
                condition: {
                  maxWidth: 3700,
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
      <script src="https://code.highcharts.com/highcharts.js" on:load={loadChart}></script>
      <script src="https://code.highcharts.com/modules/series-label.js"></script>
      <script src="https://code.highcharts.com/highcharts-3d.js"></script>
      <script src="https://code.highcharts.com/modules/cylinder.js"></script>
      <script src="https://code.highcharts.com/modules/exporting.js"></script>
      <script src="https://code.highcharts.com/modules/export-data.js"></script>
      <script src="https://code.highcharts.com/modules/accessibility.js"></script>
    </svelte:head>
    
    <main>
        <div>
            <h1 style="text-align: center;">Analítica <strong>(Consumo de drogas)</strong></h1>
          </div>
        
        <div>
            <figure class="highcharts-figure">
              <div id="container" />
              <p style="text-align: center;" class="highcharts-description">
                Gráfico 3D que muestra el consumo de drogas en diferentes países (2017).
              </p>
            </figure>
          </div>
    </main>