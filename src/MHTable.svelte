<script>
    import {
        onMount
    } from "svelte";
    let open = false
    let mh_sv = [];
    // getStats() comprueba si recibe los objetos JSON, si no los carga con /loadInitialData y luego los pide
    async function getData() {
        const res = await fetch("/api/v1/mh-stats");
        const json = await res.json();
        mh_sv = json;
        console.log(`We have received ${mh_sv.length} countries`);
    }

    async function getStats() {
        const res = await fetch("/api/v1/mh-stats");
        if(res.ok) {
            getData()
        } else {
            const aux = await fetch("/api/v1/mh-stats/loadInitialData")
            if (aux.ok) {
                getData()
            }
        }
    }
    onMount(getStats);
</script>
<!-- Tabla de la API mh-stats -->
<main>
    <table class="table table-bordered">
        <thead class="table-dark">
        <tr>
            <td> País </td>
            <td> Año </td>
            <td> Población </td>
            <td> Ansiedad  </td>
            <td> Alimenticios </td>
            <td> TDAH </td>
            <td> Bipolaridad </td>
            <td> Depresión </td>
            <td> Esquizofrenia </td>
        </tr>
    </thead>
    <tbody>
        <!-- En vez de iterar sobre cada objeto en mh_sv como pais y luego acceder a los campos, iteramos directamente sobre la deconstrucción del objeto JSON -->
        {#each mh_sv as { country, year, population, anxdaly, eating, adhd, bipolar, depression, schizophrenia }}
        <tr>
            <td>{country}</td>
            <td>{year}</td>
            <td>{population}</td>
            <td>{anxdaly}</td>
            <td>{eating}</td>
            <td>{adhd}</td>
            <td>{bipolar}</td>
            <td>{depression}</td>
            <td>{schizophrenia}</td>
        </tr>
        {/each}
    </tbody>
</table>
</main>