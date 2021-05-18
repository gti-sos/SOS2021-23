<script>
    import { Button, Nav, NavItem, NavLink } from "sveltestrap";
    const BASE_CONTACT_API_PATH_V1 = "/api/v1";
    const BASE_CONTACT_API_PATH_v2 = "/api/v2";
    let drugData = [];
    let drugChartData = [];
    let hdiData = [];
    let hdiChartData = [];
    let mhData=[];
    let mhChartData = [];
    let unemploymentData=[];
    let unemploymentChartData = [];
    var years = [];
    let msg = "";
    function distinctRecords(MYJSON, prop) {
      return MYJSON.filter((obj, pos, arr) => {
        return arr.map((mapObj) => mapObj[prop]).indexOf(obj[prop]) === pos;
      });
    }
    async function loadChart() {
      console.log("Fetching data...");
      const res = await fetch( "/api/v1/du-stats");
      const res1 = await fetch("/api/v1/hdi-stats");
      const res2 = await fetch("/api/v1/mh-stats");
      const res3 = await fetch("/api/v2/unemployment-stats");
      if (res.ok && res1.ok && res2.ok && res3.ok) {
        console.log("procesing Mh data....");
        if (res1.ok) {
          hdiData = await res1.json();
          console.log("RES OK");
          //Quitamos fechas repetidas y las ordenamos
          var distinctDates1 = distinctRecords(hdiData, "year");
          distinctDates1.sort(function (a, b) {
            return a.year - b.year;
          });
          distinctDates1.forEach((element) => {
            years.push(element.year);
            console.log("years: " + element.year);
          });
          console.log("Distinct dates: " + years);
          //Sumamos los valores para las fechas iguales
         
          years.forEach((e) => {
            var yAxis = hdiData
              .filter((d) => d.year === e)
              .map((dr) => dr["hdirank"])
              .reduce((acc, dr) => dr + acc);
            console.log("YAxis: " + yAxis);
            hdiChartData.push(Math.round(yAxis));
          });
          msg = "";
        }
        console.log("procesing Drug data....");
        if (res.ok) {
          drugData = await res.json();
          console.log("RES OK");
          //Quitamos fechas repetidas y las ordenamos
          var distinctDates = distinctRecords(drugData, "year");
          distinctDates.sort(function (a, b) {
            return a.year - b.year;
          });
          distinctDates.forEach((element) => {
            if (!years.includes(element.year)) {
              years.push(element.year);
              console.log("years: " + element.year);
            }
          });
          console.log("Distinct years: " + years);
          //Sumamos los valores para las fechas iguales
          
          
          //natalityChartData.push("");
          
          years.forEach((e) => {
            var yAxis = drugData
              .filter((d) => d.year === e)
              .map((nr) => nr["dupopulation"])
              .reduce((acc, nr) => nr + acc,0);
            console.log("YAxis: " + yAxis);
            drugChartData.push(Math.round(yAxis));
            
          });
          msg = "";
        }
        if(res2.ok){
          mhData = await res2.json();
          console.log("RES2 OK");
          //Quitamos fechas repetidas y las ordenamos
          var distinctDates = distinctRecords(mhData, "year");
          distinctDates.sort(function (a, b) {
            return a.year - b.year;
          });
          distinctDates.forEach((element) => {
            if (!years.includes(element.year)) {
                years.push(element.year);
              console.log("years: " + element.year);
            }
          });
          console.log("Distinct years: " + years);
          //Sumamos los valores para las fechas iguales         
          years.forEach((e) => {
            var yAxis = mhData
              .filter((d) => d.year === e)
              .map((qli) => qli["population"])
              .reduce((acc, qli) => qli + acc,0);
            console.log("YAxis: " + yAxis);
            mhChartData.push(Math.round(yAxis));
            
          });
          msg = "";
        }
        if(res3.ok){
          unemploymentData = await res3.json();
          console.log("RES2 OK");
          //Quitamos fechas repetidas y las ordenamos
          var distinctDates = distinctRecords(unemploymentData, "year");
          distinctDates.sort(function (a, b) {
            return a.year - b.year;
          });
          distinctDates.forEach((element) => {
            if (!years.includes(element.year)) {
                years.push(element.year);
              console.log("years: " + element.year);
            }
          });
          console.log("Distinct years: " + years);
          //Sumamos los valores para las fechas iguales         
          years.forEach((e) => {
            var yAxis = unemploymentData
              .filter((d) => d.year === e)
              .map((qli) => qli["knoperc"])
              .reduce((acc, qli) => qli + acc,0);
            console.log("YAxis: " + yAxis);
            unemploymentChartData.push(Math.round(yAxis));
            
          });
          msg = "";
        }
      } else {
        console.log("ERROR MSG");
        msg = "Por favor primero cargue los datos en todas las APIs";
      }
      console.log("Drug Chart DaTa: " + drugChartData);
      console.log("HDI Chart DaTa: " + hdiChartData);
      console.log("MH Chart Data: " + mhChartData);
      console.log("UNEMP Chart Data: " + mhChartData);
      Highcharts.chart("container", {
        title: {
          text: "du-stats | hdi-stats | mh-stats | unemployment-stats",
        },
        yAxis: {
          title: {
            text: "Ratio",
          },
        },
        xAxis: {
          title: {
            text: "Años",
          },
          categories: years,
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
                point: "year",
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
            name: "Drug",
            data: drugChartData,
          },
          {
            name: "HDI",
            data: hdiChartData,
          },
          {
            name: "MH",
            data: mhChartData,
          },
          {
            name: "Paro",
            data: unemploymentChartData,
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
        <NavLink href="#/info">Volver</NavLink>
      </NavItem>
    </Nav>
  
    <div>
      <h2>Análiticas</h2>
    </div>
  
    {#if msg}
      <p>{msg}</p>
    {:else}
      <figure class="highcharts-figure">
        <div id="container" />
        <p class="highcharts-description">
          Gráfico de líneas básico que muestra las tendencias anuales para todos los países, para el índice de
          estilo de vida y los ratios de natalidad y divorcios.
        </p>
      </figure>
    {/if}
  </main>
  
  <style>
    main {
      text-align: center;
      padding: 1em;
      margin: 0 auto;
    }
    .highcharts-figure,
    .highcharts-data-table table {
      min-width: 360px;
      max-width: 800px;
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