<script>
    import { pop }from "svelte-spa-router";
    import Button from "sveltestrap/src/Button.svelte";

    const BASE_API_PATH_SEC="/api/v1";    
    
    let drugData = [];
    let drugChartCountryDateData = []; 
    let drugChartPopulation = [];
    let drugChartDead = [];
    let drugChartDependence = [];

    async function loadGraph(){
        console.log("Fetching data...");
        const res = await fetch(BASE_API_PATH_SEC + "/du-stats");
        drugData = await res.json();
        if(res.ok){
            drugData.forEach(stat => {
                drugData.forEach(stat => {
                drugChartCountryDateData.push(stat.country+"/"+stat.year);
                drugChartPopulation.push(parseFloat(stat["dupopulation"]));
                drugChartDead.push(parseFloat(stat["dudead"]));   
                drugChartDependence.push(parseFloat(stat["dudependenceperc"])); 
                });
        }),
        
        console.log("Drug use chart: " + drugData);
        console.log("We have " + drugChartCountryDateData.length + " countries");
        console.log("We hace " + drugChartPopulation.length + " datas of the population");
        console.log("We hace " + drugChartDead.length + " datas from deads in the countries");
        console.log("We hace " + drugChartDependence.length + " datas of the dependencies");
        
        new Morris.Bar({
            
            //Tratamiento de datos de la integración manual
            data: [
                { drugChartCountryDateData: "Spain", value: drugChartPopulation[0] , value2: drugChartDead[0], value3: drugChartDependence[0]},
                { drugChartCountryDateData: "Italy", value: drugChartPopulation[1] , value2: drugChartDead[1], value3: drugChartDependence[1]},
                { drugChartCountryDateData: "USA", value: drugChartPopulation[2] , value2: drugChartDead[2], value3: drugChartDependence[2]},
                { drugChartCountryDateData: "Brazil", value: drugChartPopulation[3] , value2: drugChartDead[2], value3: drugChartDependence[3]},
            ],
            xkey: 'Países',
            ykeys: ['value', 'value2', 'value3'],
            labels: ['Población', 'Muertes', 'Dependencia']
            });
        }}
     
</script>

<svelte:head>

    <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/morris.js/0.5.1/morris.css">
    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js"></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/raphael/2.1.0/raphael-min.js"></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/morris.js/0.5.1/morris.min.js" on:load="{loadGraph}"></script>

</svelte:head>


<main>
    <h1 style="text-align: center">Estadística de consumo de drogas en 2017</h1>
    <div id="myfirstchart" style="height: 250px;"></div>
    <p style="text-align: center;" class="highcharts-description">
    Gráfico que muestra los datos de diferentes países sobre el consumo de droga en 2017.</p>

  
 
</main>