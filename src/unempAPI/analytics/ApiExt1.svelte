<script>
    import Button from "sveltestrap/src/Button.svelte";
    import { pop } from "svelte-spa-router";
    var miAPI = "api/v2/unemployment-stats";
    var APIExt1 = "https://www.7timer.info/bin/astro.php?lon=113.2&lat=23.1&ac=0&unit=metric&output=json&tzshift=0";
    async function loadGraph() {
        let data2 = [];
        let speed = [];
        let temp2m = [];
        let timepoint =[];
        let dataUnemp = [];
        let graficaUnemp = [];
        const resData = await fetch(APIExt1);
        data2 = await resData.json();
        data2 = data2.dataseries;

        
        const resData2 = await fetch(miAPI);
        dataUnemp = await resData2.json();
       
        data2.forEach((x) => {
            timepoint.push({name: x.timepoint, value: speed.length+1});
            if (x.rh2m == 10)
                speed.push({name: x.direction, value: speed.length+1});
            if (x.rh2m == 11)
                temp2m.push({name: x.direction, value: temp2m.length+1});
        });
        dataUnemp.forEach((x) => {
            graficaUnemp.push({ name: x.country, value: parseFloat(x.knoperc) });
        });
       
        let passengerCar = [
            {
                name:"Valores con rh2m=6" +" -> " + speed.length, 
                data: speed
            },
            {
                name:"Valores con rh2m=14"+" -> "+temp2m.length, 
                data: temp2m
            },
            {
                name:"Valores "+" -> "+timepoint.length, 
                data: timepoint
            },
            {
                name:"Porcentaje de paro según Knoperc", 
                data: graficaUnemp
            }
          
        ];      
        Highcharts.chart('container', {
            chart: {
                type: 'packedbubble',
                height: '55%'
            },
            title: {
                text: 'Api externa 1'
            },
            tooltip: {
                useHTML: true,
                pointFormat: '<b>{point.name}:</b> {point.value}</sub>'
            },
            plotOptions: {
                packedbubble: {
                    minSize: '20%',
                    maxSize: '100%',
                    zMin: 0,
                    zMax: 1000,
                    layoutAlgorithm: {
                        gravitationalConstant: 0.05,
                        splitSeries: true,
                        seriesInteraction: false,
                        dragBetweenSeries: true,
                        parentNodeLimit: true
                    },
                    dataLabels: {
                        enabled: true,
                        format: '{point.name}',
                        filter: {
                            property: 'y',
                            operator: '>',
                            value: 250
                        },
                        style: {
                            color: 'black',
                            textOutline: 'none',
                            fontWeight: 'normal'
                        }
                    }
                }
            },
            series: passengerCar
        });
    };
</script>
<svelte:head>
    <script src="https://code.highcharts.com/highcharts.js" ></script>
    <script src="https://code.highcharts.com/highcharts-more.js" ></script>
    <script src="https://code.highcharts.com/modules/exporting.js" ></script>
    <script src="https://code.highcharts.com/modules/accessibility.js"  on:load="{loadGraph}"></script>

</svelte:head>
<main>
    <figure class="highcharts-figure">
        <div id="container"></div>
        <p class="highcharts-description">
           En esta gráfica se muestra el la tasa de paro en relación a una api del tiempo en el que se muestran todos los elementos y los valores con rh2m=6 y 14.
        </p>
    </figure>
    <Button outline color="secondary" on:click="{pop}">Atrás</Button>
</main>
<style>
     #container {
      border: 1px solid black;
      margin: 10px auto;
    } 
    .highcharts-figure,
    .highcharts-data-table table {
        min-width: 320px;
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