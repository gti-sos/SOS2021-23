<script>
    import {
        onMount
    } from "svelte";
    let open = false
    let du_sv = [];
    // getStats() comprueba si recibe los objetos JSON, si no los carga con /loadInitialData y luego los pide
    async function getData() {
        const res = await fetch("/api/v1/du-stats");
        const json = await res.json();
        du_sv = json;
        console.log(`We have received ${du_sv.length} countries`);
    }

    async function getStats() {
        const res = await fetch("/api/v1/du-stats");
        if(res.ok) {
            getData()
        } else {
            const aux = await fetch("/api/v1/du-stats/loadInitialData")
            if (aux.ok) {
                getData()
            }
        }
    }
    onMount(getStats);
</script>
<!-- Tabla de la API du-stats -->
<main>
    <table class="table table-bordered">
        <thead class="table-dark">
        <tr>
            <td> País </td>
            <td> Año </td>
            <td> Población </td>
            <td> Muerte  </td>
            <td> Dependencia </td>
            <td> Daly </td>
        </tr>
    </thead>
    <tbody>
        <!-- En vez de iterar sobre cada objeto en du_sv como pais y luego acceder a los campos, iteramos directamente sobre la deconstrucción del objeto JSON -->
        {#each du_sv as { country, year, population, dead, dependence, daly}}
        <tr>
            <td>{country}</td>
            <td>{year}</td>
            <td>{population}</td>
            <td>{dead}</td>
            <td>{dependence}</td>
            <td>{daly}</td>
        </tr>
        {/each}
    </tbody>
</table>
</main>