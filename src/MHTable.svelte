<script>
    import {
        onMount
    } from "svelte";
    import UncontrolledAlert from "../node_modules/sveltestrap/src/UncontrolledAlert.svelte";
    import Button from "../node_modules/sveltestrap/src/Button.svelte";
import { insert } from "svelte/internal";
    let open = false;
    let mh_sv = [];
    let error = null;
    let errorMsg = "";
    let okMsg = "";

    let newStat = {
    country: "",
    year: "",
    population: "",
    anxdaly: "",
    eating: "",
    adhd: "",
    bipolar: "",
    depression: "",
    schizophrenia: "",
  };

  let insStat = {
    country: "",
    year: "",
    population: "",
    anxdaly: "",
    eating: "",
    adhd: "",
    bipolar: "",
    depression: "",
    schizophrenia: "",
  };

    let BASE_EDU_API = "/api/v1/mh-stats"
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

  async function deleteStat(country, year) {
    console.log(`Deleting data with name ${country} and year ${year}`);
    const res = await fetch(
      BASE_EDU_API + "/" + country + "/" + year,
      {
        method: "DELETE",
      }
    ).then(function (res) {
      if (res.ok) {
        console.log("OK");
        for (var i = 0; i < mh_sv.length; i++) {
            if (mh_sv[i].country === country && mh_sv[i].year === year) {
                mh_sv.splice(i, 1);
            }
        }
        errorMsg = "";
        okMsg = "Operación realizada correctamente";
        getStats();
      } else {
        errorMsg = res.status + ": " + res.statusText;
        okMsg = "";
        console.log("ERROR!" + errorMsg);
      }
    });
  }
  async function insertStat(stat) {
    console.log("Inserting stat: " + JSON.stringify(stat));
    const res = await fetch(BASE_EDU_API, {
      method: "POST",
      body: JSON.stringify(stat),
      headers: {
        "Content-Type": "application/json",
      },
    }).then(function (res) {
      if (res.ok) {
        console.log("OK");
        getStats();
        errorMsg = "";
        okMsg = "Operación realizada correctamente";
      } else {
        errorMsg = res.status + ": " + res.statusText;
        console.log("ERROR!" + errorMsg);
        okMsg = "";
      }
    });
    insStat.country =  "";
    insStat.year = "";
    insStat.population =  "";
    insStat.anxdaly = "";
    insStat.eating = "";
    insStat.adhd = "";
    insStat.bipolar = "";
    insStat.depression = "";
    insStat.schizophrenia = ""; 

  }
  let oldcountry = "";
  let oldyear = "";
  async function editStat(newStat) {
    deleteStat(oldcountry, oldyear);
    getStats();
    insertStat(newStat);
    closeForm(); 

    newStat.country =  "";
    newStat.year = "";
    newStat.population =  "";
    newStat.anxdaly = "";
    newStat.eating = "";
    newStat.adhd = "";
    newStat.bipolar = "";
    newStat.depression = "";
    newStat.schizophrenia = "";

  }
  function openForm(country, year, population, anxdaly, eating, adhd, bipolar, depression, schizophrenia) {
    newStat.country = country;
    newStat.year = year;
    newStat.population = population;
    newStat.anxdaly = anxdaly;
    newStat.eating = eating;
    newStat.adhd = adhd;
    newStat.bipolar = bipolar;
    newStat.depression = depression;
    newStat.schizophrenia = schizophrenia;
    document.getElementById("myForm").style.display = "block";
    oldcountry = country;
    oldyear = year;
}

function closeForm() {
  document.getElementById("myForm").style.display = "none";
}
onMount(getStats);
</script>
<!-- Tabla de la API mh-stats -->
<main>

    <div class="form-popup" id="myForm">
        <form class="form-container" id="myForm">
          <h1>Actualizar elemento</h1>
          <label for="country"><b>País</b></label>
          <input class="hform" type="text" placeholder=""  required bind:value={newStat.country}>
      
          <label for="year"><b>Año</b></label>
          <input class="hform" type="text" placeholder="" required bind:value={newStat.year}>
    
          <label for="population"><b>Población</b></label>
          <input class="hform" type="text" placeholder="" required bind:value={newStat.population}>
    
          <label for="anxdaly"><b>Ansiedad</b></label>
          <input class="hform" type="text" placeholder="" required bind:value={newStat.anxdaly}>
    
          <label for="eating"><b>Alimenticios</b></label>
          <input class="hform" type="text" placeholder="" required bind:value={newStat.eating}>
    
          <label for="adhd"><b>TDAH</b></label>
          <input class="hform" type="text" placeholder="" required bind:value={newStat.adhd}>
    
          <label for="bipolar"><b>Bipolar</b></label>
          <input class="hform" type="text" placeholder="" required bind:value={newStat.bipolar}>
    
          <label for="depression"><b>Depresión</b></label>
          <input class="hform" type="text" placeholder="" required bind:value={newStat.depression}>
    
          <label for="schizophrenia"><b>Esquizofrenia</b></label>
          <input class="hform" type="text" placeholder="" required bind:value={newStat.schizophrenia}>
    
          <Button  on:click={editStat(newStat)} >Actualizar</Button>
          <Button  on:click={closeForm}>Cerrar</Button>
        </form>
      </div>

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
            <td> Acciones </td>
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
            <td><Button color="warning" on:click={openForm(country, year, population, anxdaly, eating, adhd, bipolar, depression, schizophrenia)}>Editar</Button>
                <Button color="danger" on:click={deleteStat(country, year)}>Borrar</Button></td>
        </tr>
        {/each}
        <tr>
           <td><input type="text" placeholder="País"  bind:value={insStat.country}/></td> 
           <td><input type="text" placeholder="Año"  bind:value={insStat.year}/></td>
           <td><input type="text" placeholder="Población"  bind:value={insStat.population}/></td>
           <td><input type="text" placeholder="Ansiedad"  bind:value={insStat.anxdaly}/></td>
           <td><input type="text" placeholder="Alimenticio"  bind:value={insStat.eating}/></td>
           <td><input type="text" placeholder="TDAH"  bind:value={insStat.adhd}/></td>
           <td><input type="text" placeholder="Bipolar"  bind:value={insStat.bipolar}/></td>
           <td><input type="text" placeholder="Depresión"  bind:value={insStat.depression}/></td>
           <td><input type="text" placeholder="Esquizofrenia"  bind:value={insStat.schizophrenia}/></td>
           <td><Button color="success" on:click={insertStat(insStat)}>Insertar</Button></td>
        </tr>
    </tbody>
</table>
<div>
    <button type="button" class="btn btn-dark"><a href="/#/info" style="text-decoration:none;color:white" >Atrás</a></button>
</div>

 <!-- Alerts -->
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
</main>
<style>
     .form-popup {
  height: 80%;
  display: none;
  position: absolute;
  bottom: 0;
  right: 15px;
  border: 3px solid #f1f1f1;
  z-index: 9;
}

/* Add styles to the form container */
.form-container {
  max-width: 300px;
  padding: 10px;
  background-color: white;
}

.form-container input[type=text] {
  width: 100%;
  padding: 15px;
  margin: 5px 0 22px 0;
  border: none;
  background: #f1f1f1;
}

</style>
<!--
/* Button used to open the contact form - fixed at the bottom of the page */

/* The popup form - hidden by default */


-->