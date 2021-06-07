<script>
    import Button from "sveltestrap/src/Button.svelte";
</script>
<html lang="ES">

<head>
    <title>
        Integrations
    </title>
</head>

<body>
    <div>
        <h1>Integrations</h1>

        <div style="text-align:left;padding-bottom: 1%">
            <Button outline color="primary" onclick="location.href='#/info'">Inicio</Button>
        </div>

        <li style="font-size: 22px;"><strong>Unemployment-Stats</strong></li>
        <ul style="font-size: 22px;"><strong>Integraciones</strong></ul>

        <ul style="list-style-type:circle; font-size: 20px;">
            <li><a href="#/unemployment-graph/graphApiExt1">Api Externa 1</a></li>
        </ul>
        <ul style="list-style-type:circle; font-size: 20px;">
            <li><a href="#/unemployment-graph/graph01Life">Api Grupo 01 Life</a></li>
        </ul>
        <ul style="list-style-type:circle; font-size: 20px;">
            <li><a href="#/unemployment-graph/graphG02">Api Grupo 02</a></li>
        </ul>
        <ul style="list-style-type:circle; font-size: 20px;">
            <li><a href="#/unemployment-graph/graphG24">Api Grupo 24</a></li>
        </ul> 
        
        <ul style="list-style-type:circle; font-size: 20px;">
            <li><a href="#/unemployment-graph/graph01Divorce">Api Grupo 01 Divorce</a></li>
        </ul>

        <ul style="font-size: 22px;"><strong>Uso</strong></ul>

        <ul style="list-style-type:circle; font-size: 20px;">
            <li><a href="#/unemployment-graph/graphApiExt2">Api Externa 2</a></li>
        </ul>



        <ul style="font-size: 22px;"><strong>Personal</strong></ul>

        <ul style="list-style-type:circle; font-size: 20px;">
            <li><a href="#/unemployment-stats/unemploymentHighCharts">Gráfica Unemployment(HighChart)</a></li>
        </ul>
        <ul style="list-style-type:circle; font-size: 20px;">
            <li><a href="#/unemployment-stats/unemploymentAwesomeCharts">Gráfica Unemployment(Awesome)</a></li>
        </ul>

        <li style="font-size: 22px;"><strong>Drugs-Stats</strong></li>

        <ul style="list-style-type:circle; font-size: 20px;">
            <li><a href="#/du-stats/graph1">Api Drug-Use(Highchart)</a></li>
        </ul>
        <ul style="list-style-type:circle; font-size: 20px;">
            <li><a href="#/du-stats/graphMorris">API Drug-Use(Awesome)</a></li>
        </ul>
        <ul style="list-style-type:circle; font-size: 20px;">
            <li><a href="#/du-stats/schoolgraph">API Grupo 24 School</a></li>
        </ul>
        <ul style="list-style-type:circle; font-size: 20px;">
            <li><a href="#/du-stats/obesitygraph">API Grupo 10 Obesity</a></li>
        </ul>
        
        <ul style="list-style-type:circle; font-size: 20px;">
            <li><a href="#/du-stats/chucknorris">API Externa Chuck Norris</a></li>
        </ul>
        <ul style="list-style-type:circle; font-size: 20px;">
            <li><a href="#/du-stats/rick">API Externa Rick & Morty</a></li>
        </ul>
        
        <li style="font-size: 22px;"><strong>MH-STATS</strong></li>

        <ul style="list-style-type:circle; font-size: 20px;">
            <li><a href="#/mh-stats/chart">HighChart Salud Mental</a></li>
            <li><a href="/public/mhzing.html">ZingChart Salud Mental</a></li>
            <li><a href="#/mh-stats/education_expenditure">API SOS education_expenditure</a></li>
            <li><a href="#/mh-stats/children_out_school">API SOS children_out_school</a></li>
            <li><a href="#/mh-stats/currencyscoop">API Ext1 CurrencyScoop-mh</a></li>
            <li><a href="#/mh-stats/quran">API Ext2 Quran</a></li>
        </ul>


</div>
</body>

</html>