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
        <ul style="list-style-type:circle; font-size: 20px;">
            <li><a href="#/unemployment-graph/graphApiExt1">Api Externa(Highchart)</a></li>
        </ul>
        <ul style="list-style-type:circle; font-size: 20px;">
            <li><a href="#/unemployment-graph/graphApiExt2">Api Externa(Awesome)</a></li>
        </ul>


        <ul style="list-style-type:circle; font-size: 20px;">
            <li><a href="#/unemployment-graph/graphG01Divorce">Api Grupo 01 Divorce</a></li>
        </ul>
        <ul style="list-style-type:circle; font-size: 20px;">
            <li><a href="#/unemployment-graph/graph01Life">Api Grupo 01 Life</a></li>
        </ul>
        <ul style="list-style-type:circle; font-size: 20px;">
            <li><a href="#/unemployment-graph/graph02">Api Grupo 02</a></li>
        </ul>
        <ul style="list-style-type:circle; font-size: 20px;">
            <li><a href="#/unemployment-graph/graphG24">Api Grupo 24</a></li>
        </ul>

        <li style="font-size: 22px;"><strong>Drugs-Stats</strong></li>

        <ul style="list-style-type:circle; font-size: 20px;">
            <li><a href="#/du-stats/schoolgraph">API Grupo 24 School</a></li>
        </ul>

</div>
</body>

</html>