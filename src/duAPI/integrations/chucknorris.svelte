<!-- <script>
    import {onMount} from "svelte";
	import {pop} from "svelte-spa-router";
	import Table from "sveltestrap/src/Table.svelte";
    import Button from "sveltestrap/src/Button.svelte";
    
    const url2 = "https://api.chucknorris.io/jokes/random";
    let apiExterna = [];
    //let MyData = [];
	async function loadGraph(){
        console.log("");	
		const res = await fetch(url2); 
		if (res.ok) {
			console.log("Ok, loaded successfully");
			const json = await res.json();
            apiExterna = json;
		} else {
			console.log("ERROR!");
        }
        let frase = apiExterna.value;
    
        var text = frase;
        var lines = text.split(/[,\. ]+/g),
        data = Highcharts.reduce(lines, function (arr, word) {
            var obj = Highcharts.find(arr, function (obj) {
            return obj.name === word;
            });
            if (obj) {
            obj.weight += 1;
            } else {
            obj = {
                name: word,
                weight: 1
            };
            arr.push(obj);
            }
            return arr;
        }, []);
        Highcharts.chart('container', {
        accessibility: {
            screenReaderSection: {
            beforeChartFormat: '<h5>{chartTitle}</h5>' +
                '<div>{chartSubtitle}</div>' +
                '<div>{chartLongdesc}</div>' +
                '<div>{viewTableButton}</div>'
            }
            },
            series: [{
                type: 'wordcloud',
                data: data,
                name: 'Occurrences'
            }],
            title: {
                text: 'Frases de Chucknorris'
            }
        });
        
    }
</script>

<svelte:head>
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/modules/wordcloud.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    <script src="https://code.highcharts.com/modules/export-data.js"></script>
    <script src="https://code.highcharts.com/modules/accessibility.js" on:load="{loadGraph}"></script>
</svelte:head>

<main>
    <figure class="highcharts-figure">
        <div id="container"></div>
        <p class="highcharts-description">
          {apiExterna.value}
        </p>
    </figure>
    <button type="button" class="btn btn-secondary" onclick="location.reload()" style="margin-left: 35%; width: 25%;"> Siguiente frase</button>
</main>

<style>
    .highcharts-figure, .highcharts-data-table table {
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
    .highcharts-data-table td, .highcharts-data-table th, .highcharts-data-table caption {
        padding: 0.5em;
    }
    .highcharts-data-table thead tr, .highcharts-data-table tr:nth-child(even) {
        background: #f8f8f8;
    }
    .highcharts-data-table tr:hover {
        background: #f1f7ff;
    }
</style> -->

<!-- <script>
	import {pop} from "svelte-spa-router";
    import Button from "sveltestrap/src/Button.svelte";
    var APIext = "https://api.quotable.io/random"

    let Quote = [];
	async function loadGraph(){
        console.log("");	
		const res = await fetch(APIext);  //Piped proxy
		if (res.ok) {
			console.log("Ok, loaded successfully");
			const json = await res.json();
            Quote = json;
		} else {
			console.log("ERROR!");
        }
        let frase = Quote.content;
    
        var text = frase;
        var lines = text.split(/[,\. ]+/g),
        data = Highcharts.reduce(lines, function (arr, word) {
            var obj = Highcharts.find(arr, function (obj) {
            return obj.name === word;
            });
            if (obj) {
            obj.weight += 1;
            } else {
            obj = {
                name: word,
                weight: 1
            };
            arr.push(obj);
            }
            return arr;
        }, []);
        Highcharts.chart('container', {
        accessibility: {
            screenReaderSection: {
            beforeChartFormat: '<h5>{chartTitle}</h5>' +
                '<div>{chartSubtitle}</div>' +
                '<div>{chartLongdesc}</div>' +
                '<div>{viewTableButton}</div>'
            }
            },
            series: [{
                type: 'wordcloud',
                data: data,
                name: 'Valor'
            }],
            title: {
                text: 'Frases célebres'
            }
        });
        
    }
</script>

<svelte:head>
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/modules/wordcloud.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    <script src="https://code.highcharts.com/modules/export-data.js"></script>
    <script src="https://code.highcharts.com/modules/accessibility.js" on:load="{loadGraph}"></script>
</svelte:head>

<main>
    <figure class="highcharts-figure">
        <div id="container"></div>
        <p class="highcharts-description">
          {Quote.content}<br> - {Quote.author}
        </p>
    </figure>
    <Button color="primary" onclick="location.reload()" style="margin-left: 35%; width: 25%;"> Siguiente frase</Button>

    <br>
    <Button id="back" outline color="secondary" on:click="{pop}"> Atrás</Button>
</main>

<style>
    .highcharts-figure {
        min-width: 320px; 
        max-width: 800px;
        margin: 1em auto;
    }
</style> -->

<script>
	import {pop} from "svelte-spa-router";
    import Button from "sveltestrap/src/Button.svelte";
    var APIext = "https://api.quotable.io/random"

    let Quote = [];
	async function loadGraph(){
        console.log("");	
		const res = await fetch(APIext);  //Piped proxy
		if (res.ok) {
			console.log("Ok, loaded successfully");
			const json = await res.json();
            Quote = json;
		} else {
			console.log("ERROR!");
        }
        let frase = Quote.content;
    
        var text = frase;
        var lines = text.split(/[,\. ]+/g),
        data = Highcharts.reduce(lines, function (arr, word) {
            var obj = Highcharts.find(arr, function (obj) {
            return obj.name === word;
            });
            if (obj) {
            obj.weight += 1;
            } else {
            obj = {
                name: word,
                weight: 1
            };
            arr.push(obj);
            }
            return arr;
        }, []);
        Highcharts.chart('container', {
        accessibility: {
            screenReaderSection: {
            beforeChartFormat: '<h5>{chartTitle}</h5>' +
                '<div>{chartSubtitle}</div>' +
                '<div>{chartLongdesc}</div>' +
                '<div>{viewTableButton}</div>'
            }
            },
            series: [{
                type: 'wordcloud',
                data: data,
                name: 'Valor'
            }],
            title: {
                text: 'Frases célebres'
            }
        });
        
    }
</script>

<svelte:head>
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/modules/wordcloud.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    <script src="https://code.highcharts.com/modules/export-data.js"></script>
    <script src="https://code.highcharts.com/modules/accessibility.js" on:load="{loadGraph}"></script>
</svelte:head>

<main>
    <figure class="highcharts-figure">
        <div id="container"></div>
        <p class="highcharts-description">
          {Quote.content}<br> - {Quote.author}
        </p>
    </figure>
    <Button color="primary" onclick="location.reload()" style="margin-left: 35%; width: 25%;"> Siguiente frase</Button>

    <br>
    <Button id="back" outline color="secondary" on:click="{pop}"> Atrás</Button>
</main>

<style>
    .highcharts-figure {
        min-width: 320px; 
        max-width: 800px;
        margin: 1em auto;
    }
</style>