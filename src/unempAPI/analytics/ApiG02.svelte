<script>
    import Button from "sveltestrap/src/Button.svelte";
    import { pop } from "svelte-spa-router";
    var miAPI = "https://sos2021-23.herokuapp.com/api/v2/unemployment-stats";
    var API2 = "https://oilstats.herokuapp.com/api/v2/oil-production-stats";
    async function loadGraph(){
        let dataG2 = [];
        let myData = [];
        let datosAñosUnemp = [];
        let datosIntperc = [];
        let distribucion = [];
        let datosAñosAceite = [];
               
        const resDataG2 = await fetch(API2);
        const resData = await fetch(miAPI);

        myData = await resData.json();
        dataG2 = await resDataG2.json();

        datosAñosUnemp = myData.map((myData)=> parseInt(myData.year));
        datosIntperc = myData.map((myData)=> myData.intperc);

        dataG2.forEach( (x) => {
                distribucion.push(parseInt(x.distribution));
                datosAñosAceite.push(x.year);
            
        });
        /*
        
        var trace1 = {
            x: [2011,2012,2013,2014,2015,2016,2017,2018,2019,2020],
            //x: datosAñosUnemp,
            y: datosIntperc,
            fill: 'tozeroy',
            type: 'scatter',
            mode: 'none'
            };

            var trace2 = {
            x: datosAñosUnemp,
            y: distribucion,
            fill: 'tonexty',
            type: 'scatter',
            mode: 'none'
            };

            var layout = {
            title: 'Relación entre el porcentaje de paro y la distribución de aceite'
            };

            var data = [trace1, trace2];
            Plotly.newPlot('myDiv', data, layout);

            */
            var traces = [
                {x: datosAñosUnemp, y: datosIntperc, stackgroup: 'two'},
                {x: datosAñosUnemp, y: distribucion, stackgroup: 'three'},
            ];

            Plotly.newPlot('myDiv', traces, {title: 'stacked and filled line chart'});
}

</script>

<svelte:head>
    <script src="https://cdn.plot.ly/plotly-latest.min.js" on:load={loadGraph}></script>
</svelte:head>


<main>
    
    <h3 style="text-align: center;"> Porcentaje de paro según Knoema.es y la distribucion de aceite</h3>

    <div id="myDiv"></div>
    <Button outline color="secondary" on:click="{pop}">Atrás</Button>
</main>