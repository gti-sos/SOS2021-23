<script>
    import Button from "sveltestrap/src/Button.svelte";
    import { pop } from "svelte-spa-router";
    var APIExt2 = "https://datausa.io/api/data?drilldowns=Nation&measures=Population";
    async function loadGraph() {
        
        let data2 = [];
        let añoNation =[];
        let population=[]
         
        
        /*Api externa*/
        const resData = await fetch(APIExt2);
        data2 = await resData.json();
        data2=data2.data;

        data2.forEach((x) => {
            population.push(parseInt(x.Population));
            añoNation.push(x.Year);
        });

        var data = [{
        values: population,
        labels: ['2018', '2017', '2016','2015','2014','2013'],
        type: 'pie'
        }];

        var layout = {
        height: 400,
        width: 500
        };

        Plotly.newPlot('myDiv', data, layout);

    };
</script>

<svelte:head>
    <script src='https://cdn.plot.ly/plotly-1.58.4.min.js'  on:load="{loadGraph}"></script>

</svelte:head>

<main>
        <div id="myDiv"></div>

        <p>Uso de la api https://datausa.io/api/data?drilldowns=Nation&measures=Population </p>
</main>
