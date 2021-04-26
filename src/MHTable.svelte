<script>
    import {
        onMount
    } from "svelte";
    import UncontrolledAlert from "../node_modules/sveltestrap/src/UncontrolledAlert.svelte";
    let open = false;
    let mh_sv = [];
    let error = null;
    // Carga
    let open1 = false;
    const toggle1 = () => (open1 = !open1);
    const toggle1P = () => {
    open1 = !open1;
    getStats();
    };
    // Borrado
    let open2 = false;
    const toggle2 = () => (open2 = !open2);
    const toggle2P = () => {
    open2 = !open2;
    deleteStats();
    };

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
            error = 0
        } else {
            error = 409
            const aux = await fetch("/api/v1/mh-stats/loadInitialData")
            if (aux.ok) {
                getData()
            } else {
                error = 409
                getData
            }
        }
    }
    // Borrado de datos
    async function deleteStats() {
        const res = await fetch("/api/v1/mh-stats", {
        method: "DELETE",
        }).then(function (res) {
        if (res.ok) {
            console.log("OK");
            mh_sv = [];
            error = 0;
        } else if (res.status = 404) {
            error = 404;
            console.log("ERROR Data not found in database");
        } else {
            error = 1000;
            console.log("ERROR");
        }
    });
  }
    //document.getElementById ("delmhdata").addEventListener ("click", deleteStats);
</script>
<!-- Tabla de la API mh-stats -->
<main>
    <button id="loadmhdata" type="button" class="btn btn-info" on:click={toggle1P}>Cargar datos</button>
    <button id="delmhdata" type="button" class="btn btn-danger" on:click={toggle2P}>Borrar datos</button>
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
 <!-- Alerts -->
 <div>
 {#if error === 0}
 <UncontrolledAlert  color="success" >
     Operación realizada correctamente.
   
 </UncontrolledAlert>
{/if}

{#if error === 409}
 <UncontrolledAlert  color="warning" >
     Los datos ya se encuentran cargados.
   
 </UncontrolledAlert>
{:else if error === 404}
 <UncontrolledAlert  color="danger">
     No se encuentra en la base de datos.
   
 </UncontrolledAlert>
{:else if error ===1000}
 <UncontrolledAlert  color="danger" >
  Error desconocido.
 </UncontrolledAlert>
{/if}
</div>
</main>