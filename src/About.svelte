<script>
    import Button from "sveltestrap/src/Button.svelte";
</script>
<html lang="ES">

<head>
    <title>
        About
    </title>
</head>

<body>
    <div>
        <h1>About</h1>

        <div style="text-align:left;padding-bottom: 1%">
            <Button outline color="primary" onclick="location.href='#/info'">Inicio</Button>
        </div>

        <li style="font-size: 22px;"><strong>Unemployment-Stats</strong></li>

        <ul style="list-style-type:circle; font-size: 20px;">
            <li><a href="#/info">Video</a></li>
        </ul>

</div>
</body>

</html>