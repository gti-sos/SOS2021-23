<script>
    import { onMount } from "svelte";
    import { Table, Button, Nav, NavItem, NavLink } from "sveltestrap";


    let edex = [];
    let edex_revelationplace = [];
    let edex_versecount = [];
    let edex_capitulo = [];

    var msg = "";
    async function loadChart() {
      console.log("Obteniendo datos...");

      const resext = await fetch("https://api.quran.com/api/v4/chapters?language=es");
      if (resext.ok) {
        console.log("OK");
        edex = await resext.json();
        for (var i = 0; i < edex.chapters.length; i++) {
          edex_revelationplace.push(edex.chapters[i].revelation_place);
          edex_versecount.push(parseInt(edex.chapters[i].verses_count));
          edex_capitulo.push(parseInt(edex.chapters[i].id));
        }
        console.log("Lista lugar revelaciones: " + edex_revelationplace);
        console.log("Lista numero versos: " + edex_versecount);
        console.log("Lista capitulos: " + edex_capitulo);
        console.log("OK");
        }else {
        console.log("Not OK");
        }
        Highcharts.chart('container', {

chart: {
    type: 'variwide'
},

title: {
    text: 'Lugar de revelación y conteo de versos en los capítulos del Corán'
},

subtitle: {
    text: 'Fuente: quran.com'
},

xAxis: {
    type: 'category',
},

legend: {
    enabled: false
},

series: [{
        name: 'Lugar-Capitulos-MediaVersos',
        data: [
            [edex_revelationplace[0], edex_capitulo[0], edex_versecount[0]],
            [edex_revelationplace[1], edex_capitulo[1], edex_versecount[1]],
            [edex_revelationplace[2], edex_capitulo[2], edex_versecount[2]],
            [edex_revelationplace[3], edex_capitulo[3], edex_versecount[3]],
            [edex_revelationplace[4], edex_capitulo[4], edex_versecount[4]],
            [edex_revelationplace[5], edex_capitulo[5], edex_versecount[5]],
            [edex_revelationplace[6], edex_capitulo[6], edex_versecount[6]],
            [edex_revelationplace[7], edex_capitulo[7], edex_versecount[7]],
            [edex_revelationplace[8], edex_capitulo[8], edex_versecount[8]],
            [edex_revelationplace[9], edex_capitulo[9], edex_versecount[9]],
            [edex_revelationplace[10], edex_capitulo[10], edex_versecount[10]],
            [edex_revelationplace[11], edex_capitulo[11], edex_versecount[11]],
            [edex_revelationplace[12], edex_capitulo[12], edex_versecount[12]],
        ],
        dataLabels: {
            enabled: false,
            format: '{point.y:.0f}'
        },
        tooltip: {
            pointFormat: 'Capitulos: <b>{point.y}</b><br>' +
                'Media versos: <b> {point.z}</b><br>'
        },
        colorByPoint: true
    }]

});

    }
  </script>
  <svelte:head>
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/modules/variwide.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    <script src="https://code.highcharts.com/modules/export-data.js"></script>
    <script
      src="https://code.highcharts.com/modules/accessibility.js"
      on:load={loadChart}></script>
  </svelte:head>
  <main>
    <Nav>
      <NavItem>
        <NavLink href="/#/info">Página Principal</NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="#/mh-stats">Datos</NavLink>
      </NavItem>
    </Nav>
  
    <div>
      <h2>
        Gráfica API Ext2: Corán - Lugar revelación/N. versos/Capitulo
      </h2>
    </div>
  
    {#if msg}
      <p>{msg}</p>
    {:else}
    <figure class="highcharts-figure">
      <div id="container"></div>
  </figure>
    {/if}
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
    .msgRed {
      padding: 8px;
      background-color: #f8d7da;
    }
    .msgGreen {
      padding: 8px;
      background-color: #d4edda;
    }
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