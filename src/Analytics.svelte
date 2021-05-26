<script>
  import {
    Button,
    Jumbotron,
    Navbar,
    Nav,
    NavItem,
    NavLink,
    NavbarBrand,
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
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
  
  var int = 0;
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
        drugsGraph.push(parseInt(element.dudead));
      });
      // Hdis
      hdis.sort((a,b) => (a.year > b.year) ? 1 : ((b.year > a.year) ? -1 : 0));
      hdis.sort((a,b) => (a.country > b.country) ? 1 : ((b.country > a.country) ? -1 : 0));
      hdis.forEach(element=>{
        hdisGraph.push(parseInt(element.hdischolar));
   
      });
      // Mhs
      mhs.sort((a,b) => (a.year > b.year) ? 1 : ((b.year > a.year) ? -1 : 0));
      mhs.sort((a,b) => (a.country > b.country) ? 1 : ((b.country > a.country) ? -1 : 0));
      mhs.forEach(element=>{
        mhsGraph.push(parseInt(element.population));
      });
              // Activities
      unemps.sort((a,b) => (a.year > b.year) ? 1 : ((b.year > a.year) ? -1 : 0));
      unemps.sort((a,b) => (a.country > b.country) ? 1 : ((b.country > a.country) ? -1 : 0));
      unemps.forEach(element=>{
        unempsGraph.push(parseInt(element.knoperc));
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
      Highcharts.chart("container", {
        title: {
          text: "",
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
        series: [
          {
            name: "Drugs",
            data: drugsGraph,
          },
          {
            name: "Hdis",
            data: hdisGraph,
          },
          
          {
            name: "Mhs",
            data: mhsGraph,
          },
          
          {
            name: "Unemps",
            data: unempsGraph,
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
      <Button href="#/info">Volver</Button>

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
  .alertERROR {
    margin: 0 auto;
    display: table;
    padding: 20px;
    background-color: #f44336;
    color: white;
  }
  .hideMe {
    -moz-animation: cssAnimation 0s ease-in 5s forwards;
    /* Firefox */
    -webkit-animation: cssAnimation 0s ease-in 5s forwards;
    /* Safari and Chrome */
    -o-animation: cssAnimation 0s ease-in 5s forwards;
    /* Opera */
    animation: cssAnimation 0s ease-in 5s forwards;
    -webkit-animation-fill-mode: forwards;
    animation-fill-mode: forwards;
  }
  @keyframes cssAnimation {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
      left: -9999px;
      position: absolute;
    }
  }
  @-webkit-keyframes cssAnimation {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
      left: -9999px;
      position: absolute;
    }
  }
  .titulo2 {
    color: #000000;
    text-align: center;
    font-size: 150%;
  }
  .mainDiv {
    text-align: center;
    margin: 20px;
  }
  .centrado {
    text-align: center;
    padding: 1em;
    margin: 0 auto;
  }
</style>