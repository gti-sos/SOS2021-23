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
  
        var x0=unemploymentChartCountryYear;
        var y0 = unemploymentChartKnoperc;
        var y1 = unemploymentChartIntperc;
        var y2 = unemploymentChartGfperc;
  
        var trace0 = {
          x:x0,
          y: y0,
          type: 'box'
        };
  
        var trace1 = {
          x:x0,
          y: y1,
          type: 'box'
        };
        var trace2 = {
          x:x0,
          y: y2,
          type: 'box'
        };
        var data = [trace0,trace1, trace2];
  
        Plotly.newPlot('myDiv', data);
    }
  </script>
  
  <svelte:head>
    <script src='https://cdn.plot.ly/plotly-1.58.4.min.js' on:load={loadChart}></script>
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
  
        <p color="blue">Marca azul: Porcentaje de paro según Knoema|| Marca naranja: Porcentaje de paro según InternetWorldStats
          ||Marca verde:Porcentaje de paro según InternetWorldStats </p>
    </Nav>
  
    <div id="myDiv"></div>
    
  
    <div>
      {#if !cargados}
        <p class="error">{errorMsg}</p>
      {/if}
    </div>
  </main>
  