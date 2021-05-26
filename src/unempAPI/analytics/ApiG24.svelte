<script>
    import Button from "sveltestrap/src/Button.svelte";
    import { pop } from "svelte-spa-router";
    var miAPI = "https://sos2021-23.herokuapp.com/api/v2/unemployment-stats";
    var API2 = "https://sos2021-24.herokuapp.com/api/v2/children-employment";
    async function loadGraph(){
        let dataG2 = [];
        let myData = [];
        let datosAñosUnemp = [];
        let datosKnoperc = [];
        let childrenEmp = [];
        let datosAñosEmp = [];
               
        const resDataG2 = await fetch(API2);
        const resData = await fetch(miAPI);

        myData = await resData.json();
        dataG2 = await resDataG2.json();

        datosAñosUnemp = myData.map((myData)=> parseInt(myData.year));
        datosKnoperc = myData.map((myData)=> myData.knoperc);

        dataG2.forEach( (x) => {
            if (x.year == 2016) {
                childrenEmp.push(parseInt(x.percent_children_employment_t));
                datosAñosEmp.push(x.year);
            }
        });
        function makeTrace(i) {
            if (i == 0) {
                return {
                    x: datosAñosUnemp,
                    y: Array.apply(null, datosKnoperc),
                    line: { 
                        color: 'green'
                    },
                    visible: i === 0,
                    name: 'Paro según Knoema.es',
                };
            } else if (i == 1) {
                return {
                    x: datosAñosEmp,
                    y: Array.apply(null, childrenEmp),
                    line: { 
                        color: 'black'
                    },
                    visible: i === 0,
                    name: 'Niños y niñas empleados en total',
                };
            }
            
        }
        Plotly.plot('graph', [0, 1].map(makeTrace), {
            updatemenus: [{
                y: 1,
                yanchor: 'top',
                buttons: [{
                    method: 'restyle',
                    args: ['visible', [true, false]],
                    label: 'Paro según Knoema.es'
                }, {
                    method: 'restyle',
                    args: ['visible', [false, true]],
                    label: 'Niños y niñas empleados en total'
                },
                {
                    method: 'restyle',
                    args: ['visible', [true, true]],
                    label: 'Gráfica Conjunta'
                }]
            }],
        });
        
        
    }
</script>

<svelte:head>
    <script src="https://cdn.plot.ly/plotly-latest.min.js" on:load="{loadGraph}"></script>
</svelte:head>


<main>
    
    <h3 style="text-align: center;"> Porcentaje de paro según Knoema.es y el total de niños y niñas empleados en 2016</h3>

    <div id="graph"></div>
    <Button outline color="secondary" on:click="{pop}">Atrás</Button>
</main>