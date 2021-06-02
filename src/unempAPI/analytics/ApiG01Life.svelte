<script>
    import Button from "sveltestrap/src/Button.svelte";
    import { pop } from "svelte-spa-router";
    var miAPI = "https://sos2021-23.herokuapp.com/api/v2/unemployment-stats";
    var API2 = "https://sos2021-01-life-stats.herokuapp.com/api/v2/life-stats/";
    async function loadGraph(){
        let dataG2 = [];
        let myData = [];
        let datosPaisUnemp=[];
        let datosAñosUnemp = [];
        let datosIntperc = [];
        let safety_index = [];
        let datosAñosLife = [];
        let datosPaisLife =[];
               
        const resDataG2 = await fetch(API2);
        const resData = await fetch(miAPI);

        myData = await resData.json();
        dataG2 = await resDataG2.json();

        datosPaisUnemp = myData.map((myData)=> (myData.country));
        datosAñosUnemp = myData.map((myData)=> parseInt(myData.year));
        datosIntperc = myData.map((myData)=> myData.intperc);
        
        datosPaisLife = dataG2.map((dataG2)=> dataG2.country);
        datosAñosLife = dataG2.map((dataG2)=> dataG2.date);
        safety_index = dataG2.map((dataG2)=> dataG2.safety_index);
        
        dataG2.forEach((e) => {
        datosPaisLife.push(e.country);
        safety_index.push(e.safety_index);
        datosAñosLife.push(e.date);
        });
    
        var trace1 = {
        x: datosAñosUnemp,
        y: datosIntperc,
        mode: 'markers',
        type: 'scatter',
        name: 'Porcentaje de paro según InternetWorldStat',
        text: datosPaisUnemp,
        marker: { size: 12 }
        };

        var trace2 = {
        x: datosAñosUnemp,
        y: safety_index,
        mode: 'markers',
        type: 'scatter',
        name: 'Safety Index',
        text: datosPaisLife,
        marker: { size: 12 }
        };

        var data = [ trace1, trace2];

        var layout = {
        xaxis: {
            range: datosAñosUnemp
        },
        yaxis: {
            range: [0, 100]
        },
        title:'Data Labels Hover'
        };

        Plotly.newPlot('myDiv', data, layout);
}
</script>

<svelte:head>
    <script src="https://cdn.plot.ly/plotly-latest.min.js" on:load="{loadGraph}"></script>
</svelte:head>


<main>
    
    <h3 style="text-align: center;"> Porcentaje de paro según Knoema.es y life stat en 2019</h3>

    <div id="myDiv"></div>
    <Button outline color="secondary" on:click="{pop}">Atrás</Button>
</main>