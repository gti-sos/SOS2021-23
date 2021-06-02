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
        let divorcerate = [];
        let datosPaisDivorce = [];
        let datosAñosDivorce=[];
        
        console.log("antes del fetch");
        const resDataG2 = await fetch(API2);
        const resData = await fetch(miAPI);
        console.log("despues del fetch");

        console.log("antes del json");
        myData = await resData.json();
        dataG2 = await resDataG2.json();
        console.log("despues del json");

        datosPaisUnemp = myData.map((myData)=> (myData.country));
        datosIntperc = myData.map((myData)=> myData.intperc);
        datosAñosUnemp = myData.map((myData)=> myData.year);

        dataG2.forEach( (x) => {
            
                divorcerate.push(parseFloat(x['ratio-actual'])); 
                datosPaisDivorce.push(x.country);
                datosAñosDivorce.push(x.date);
        });
        var x = divorcerate;
        var y = datosAñosDivorce;

        var trace = {
            x: y,
            y:x,
            type: 'histogram',
          };
        var data = [trace];
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