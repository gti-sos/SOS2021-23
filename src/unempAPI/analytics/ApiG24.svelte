<script>
    import Button from "sveltestrap/src/Button.svelte";
    import { pop } from "svelte-spa-router";
    var miAPI = "https://sos2021-23.herokuapp.com/api/v2/unemployment-stats";
    var API2 = "https://sos2021-23.herokuapp.com/api/v2/childrenemployment"; //proxy
    async function loadGraph(){
        let dataG2 = [];
        let myData = [];
        let datosAñosUnemp = [];
        let datosKnoperc = [];
        let childrenEmp = [];
        let datosAñosEmp = [];
        let datosPaisUnemp =[];
        let childrenCountry=[];
               
        const resDataG2 = await fetch(API2);
        const resData = await fetch(miAPI);

        myData = await resData.json();
        dataG2 = await resDataG2.json();

        datosPaisUnemp = myData.map((myData)=> myData.country);
        datosAñosUnemp = myData.map((myData)=> myData.year);
        datosKnoperc = myData.map((myData)=> parseFloat(myData.knoperc));

        dataG2.forEach( (x) => {
                childrenEmp.push(parseFloat(x.percent_children_employment_t));
                datosAñosEmp.push(x.year);
                childrenCountry.push(x.country);
        });

        /*
            
        var trace1 = {
        x: datosAñosUnemp,
        y: datosKnoperc,
        mode: 'markers',
        marker: {
            size: [ 80, 100]
        }
        };
        var trace2 = {
        x: datosAñosUnemp,
        y: childrenEmp,
        mode: 'markers',
        marker: {
            size: [20,40, 60, 80, 100]
        }
        };

        var data = [trace1,trace2];

        var layout = {
        title: 'Marker Size',
        showlegend: false,
        height: 600,
        width: 600
        };

        Plotly.newPlot('myDiv', data, layout);
        */
        var trace1 = {
            x: datosPaisUnemp,
            y: datosKnoperc,
            name: 'Unemployment',
            type: 'bar'
            };

        var trace2 = {
            x: childrenCountry,
            y: childrenEmp,
            name: 'Children Employment',
            type: 'bar'
            };

            var data = [trace1, trace2];

            var layout = {barmode: 'group'};

            Plotly.newPlot('myDiv', data, layout);
        
        
}
</script>

<svelte:head>
    <script src="https://cdn.plot.ly/plotly-latest.min.js" on:load="{loadGraph}"></script>
</svelte:head>


<main>
    
    <h3 style="text-align: center;"> Porcentaje de paro según Knoema.es y el total de niños y niñas empleados</h3>

    <div id="myDiv"></div>
    <Button outline color="secondary" on:click="{pop}">Atrás</Button>
</main>