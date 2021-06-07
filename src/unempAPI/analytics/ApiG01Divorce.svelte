<script>
    import Button from "sveltestrap/src/Button.svelte";
    import { pop } from "svelte-spa-router";
    var miAPI = "https://sos2021-23.herokuapp.com/api/v2/unemployment-stats";
    var API2 = "https://sos2021-01.herokuapp.com/api/v2/divorce-stats";
    async function loadGraph(){
        let dataG2 = [];
        let myData = [];
        let datosPaisUnemp=[];
        let datosAñosUnemp = [];
        let datosIntperc = [];
        let ratioactual = [];
        let datosPaisDivorce = [];
        let datosAñosDivorce=[];
        
        const resDataG2 = await fetch(API2);
        const resData = await fetch(miAPI);

        myData = await resData.json();
        dataG2 = await resDataG2.json();

        datosPaisUnemp = myData.map((myData)=> (myData.country));
        datosIntperc = myData.map((myData)=> myData.intperc);
        datosAñosUnemp = myData.map((myData)=> myData.year);

        dataG2.forEach( (x) => {
            
                ratioactual.push(parseFloat(x['ratio-actual'])); 
                datosPaisDivorce.push(x.country);
                datosAñosDivorce.push(x.date);
        });
        var x = ratioactual;
        var y = datosAñosDivorce;
        var z=datosIntperc;
        var w=datosAñosUnemp;

        var trace = {
            x: x,
            y:y,
            type: 'histogram',
          };

          var trace1 = {
            x: z,
            y:w,
            type: 'histogram',
          };
        var data = [trace,trace1];
        Plotly.newPlot('myDiv', data);
        
    }
</script>

<svelte:head>
    <script src='https://cdn.plot.ly/plotly-2.0.0-rc.2.min.js' on:load={loadGraph}></script>
</svelte:head>


<main>
    
    <h3 style="text-align: center;"> Ratio de divorcios</h3>

    <div id="myDiv"></div>
    <Button outline color="secondary" on:click="{pop}">Atrás</Button>
</main>