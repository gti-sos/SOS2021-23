<script>
  import {
    Button,
  } from "sveltestrap";
  let isOpen = false;
  var BASE_API_PATH = "/api/v2";
  // Array de Datos
  var drugs=[];
  var hdis=[];
  var mhs=[];
  var unemps=[];
  // Valores que se van a mostrar en la grafica
  var xKeys = [];
  var drugsGraph=[];
  var hdisGraph=[];
  var mhsGraph=[];
  var unempsGraph=[];
  
  let errorPrint = "";
  async function getData() {
    const dataA = await fetch("/api/v1/du-stats");
    const dataB = await fetch("/api/v1/hdi-stats");
    const dataC = await fetch("/api/v1/mh-stats");
    const dataD = await fetch(BASE_API_PATH + "/unemployment-stats");
    
    if (dataA.ok && dataB.ok && dataC.ok && dataD.ok) { 
      drugs = await dataA.json();
      hdis = await dataB.json();
      mhs= await dataC.json();
      unemps= await dataD.json();

    
      // Se añaden las claves de cada banco de datos
      drugs.forEach(element=>{
        xKeys.push(element.country+","+parseInt(element.year));
      });
      hdis.forEach(element=>{
        xKeys.push(element.country+","+parseInt(element.year));
      });
      mhs.forEach(element=>{
        xKeys.push(element.country+","+parseInt(element.year));
      });
      unemps.forEach(element=>{
        xKeys.push(element.country+","+parseInt(element.year));
      });
      // Se añaden los valores de cada banco de datos que se van a mostrar
      // Drugs
      drugs.sort((a,b) => (a.year > b.year) ? 1 : ((b.year > a.year) ? -1 : 0));
      drugs.sort((a,b) => (a.country > b.country) ? 1 : ((b.country > a.country) ? -1 : 0));
      drugs.forEach(element=>{
        drugsGraph.push(parseFloat(element.dudead));
      });
      // Hdis
      hdis.sort((a,b) => (a.year > b.year) ? 1 : ((b.year > a.year) ? -1 : 0));
      hdis.sort((a,b) => (a.country > b.country) ? 1 : ((b.country > a.country) ? -1 : 0));
      hdis.forEach(element=>{
        hdisGraph.push(parseFloat(element.hdischolar));
   
      });
      // Mhs
      mhs.sort((a,b) => (a.year > b.year) ? 1 : ((b.year > a.year) ? -1 : 0));
      mhs.sort((a,b) => (a.country > b.country) ? 1 : ((b.country > a.country) ? -1 : 0));
      mhs.forEach(element=>{
        mhsGraph.push(parseFloat(element.population));
      });
              // Unemployment
      unemps.sort((a,b) => (a.year > b.year) ? 1 : ((b.year > a.year) ? -1 : 0));
      unemps.sort((a,b) => (a.country > b.country) ? 1 : ((b.country > a.country) ? -1 : 0));
      unemps.forEach(element=>{
        unempsGraph.push(parseFloat(element.knoperc));
      });
      
      
      // Eliminamos repetidos y ordenamos por país y año
      xKeys=new Set(xKeys);
      xKeys=Array.from(xKeys);
      xKeys.sort();
      
      
    } else {
      console.log("Error!");
    }
  }
  async function loadGraph() {
    getData().then(() => {
      Highcharts.chart('container', {
    chart: {
        type: 'spline',
        inverted: true
    },
    title: {
        text: 'Gráfica grupal'
    },
    yAxis: {
          title: {
            text: "Valor",
          },
        },
        xAxis: {
          title: {
            text: "País,Año",
          },
          categories: xKeys,
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
    plotOptions: {
        spline: {
            marker: {
                enable: false
            }
        }
    },
    series: [{
        name: 'Drugs',
        data: drugsGraph
        },
      {
        name: 'HDIS',
        data: hdisGraph
      },
      {
        name: 'MHS',
        data: mhsGraph
      },
      {
        name: 'Unemployment',
        data: unempsGraph
      },]
});
    });
  }
</script>

<svelte:head>
  <script src="https://code.highcharts.com/highcharts.js"></script>
  <script src="https://code.highcharts.com/modules/series-label.js"></script>
  <script src="https://code.highcharts.com/modules/exporting.js"></script>
  <script src="https://code.highcharts.com/modules/export-data.js"></script>
  <script src="https://code.highcharts.com/modules/accessibility.js" on:load={loadGraph}></script>
</svelte:head>

<main>
  <body>
      <Button id ="volverbtn" href="#/info">Volver</Button>

  {#if errorPrint}
    <div class="hideMe">
      <span class="alertERROR">
        <strong style="align:center">ERROR! </strong>
        <p />
        {errorPrint}
      </span>
    </div>
  {:else}
    <div style="margin-bottom: 15px">
      <figure class="highcharts-figure">
        <div id="container" />
        <p class="centrado">
          <strong>Gráfica en la que se muestran:</strong><br />
          · Drugs<br />
          · HDIS<br />
          . Mhs <br />
          . Unemps <br />
         
        </p>
      </figure>
    </div>
  {/if}
</main>

<style>
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