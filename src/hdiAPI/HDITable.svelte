<script>
	import { onMount } from "svelte";
	import Table from "sveltestrap/src/Table.svelte"; 
	import Button from "sveltestrap/src/Button.svelte";
	import { Pagination, PaginationItem, PaginationLink } from 'sveltestrap';
	import { Form, FormGroup, FormText, Input, Label } from 'sveltestrap';
	import { Alert, UncontrolledAlert } from 'sveltestrap';
    import { UncontrolledCollapse, Collapse, CardBody, Card } from "sveltestrap";
	
	

    let BHDI = "/api/v1/hdi-stats"
    let errorMsg = null;
    let visible = false;
    let error = null;
    let okMsg = "";
    let fullQuery = "";
     let limit = 10; /*limit es el número de elementos por página*/
	let offset = 0; /*offset indica desde qué elemento se va a empezar a mostrar*/
        let numTotal=0;
	let maxpag = numTotal>=limit; 
    

    
    let page = 1;
    let totaldata=8;
    let hdi_stats = [];
	let data = {
		country: "",
		year: "",
		hdirank:"",
		hdivalue:"",
		hdischolar:"",
	}
    
    
    let errorMSG = null;
    onMount(getData);
 
    //GET
    async function getData() {
 
        console.log("Fetching HDI Data...");
        const res = await fetch(BHDI+"?limit=10&offset=1");
        if (res.ok) {
            console.log("Ok:");
            const json = await res.json();
            hdi_stats = json;
            console.log("Received " + hdi_stats.length + " HDI Data.");
        } else {
            errorMSG= res.status;// + ": " + res.statusText;
            console.log("ERROR!");
        }
    }
 
    //GET INITIALDATA
    async function loadInitialData() {
 
        console.log("Fetching hdi data...");
        await fetch(BHDI+"/loadInitialData");
        const res = await fetch(BHDI);
        if (res.ok) {
            console.log("Ok:");
            const json = await res.json();
            hdi_stats = json;
            totaldata=8;
            console.log("Received " + hdi_stats.length + " hdi data.");
            //color = "success";
            //errorMSG = "Datos cargados correctamente";
            errorMSG = 200.1;
        } 
        else {
            //color = "danger";
            //errorMSG= res.status + ": " + res.statusText;
            errorMSG = 404;
            console.log("ERROR!");
        }
    }
    
    //INSERT
    
    async function insertData(){
		 
         console.log("Inserting hdi data...");
         //Comprobamos que el año y la fecha no estén vacíos, el string vacio no es null
         if (data.country == "" || data.country == null || data.year == "" || data.year == null) {
             alert("Los campos 'Pais' y 'Año' no pueden estar vacios");
         }
         else{
             const res = await fetch(BHDI,{
             method:"POST",
             body:JSON.stringify(data),
             headers:{
                 "Content-Type": "application/json"
             }
             }).then(function (res) {
                 if(res.status == 201){
                     getData();
                     console.log("Data introduced");
                     //color = "success";
                     //errorMSG="Entrada introducida correctamente a la base de datos";
                     errorMSG = 201;
                     
                 }
                 else if(res.status == 400){
                     console.log("ERROR Data was not correctly introduced");
                     //color = "danger";
                     //errorMSG= "Los datos de la entrada no fueron introducidos correctamente";
                     errorMSG = 400;
                 }
                 else if(res.status == 409){
                     console.log("ERROR There is already a data with that country and year in the database");
                    //color = "danger";
                     //errorMSG= "Ya existe una entrada en la base de datos con la fecha y el país introducido";
                     errorMSG = 409;
                 }
             });	
         }
     }
    //DELETE SPECIFIC
    async function deleteData(name, year) {
        const res = await fetch(BHDI+"/" + name + "/" + year, {
            method: "DELETE"
        }).then(function (res) {
            visible = true;
            getData();      
            if (res.status==200) {
                totaldata--;
                //color = "success";
                //errorMSG = "Recurso" + country + year + "borrado correctamente";
                errorMSG = 200.2;
                console.log("Deleted " + name);            
            }else if (res.status==404) {
                //color = "danger";
                //errorMSG = "No se ha encontrado el objeto" + name;
                errorMSG = 404;
                console.log("DATA NOT FOUND");            
            } else {
                //color = "danger";
                errorMSG= res.status;// + ": " + res.statusText;
                console.log("ERROR!");
            }      
        });
    }
    //DELETE ALL
    async function deleteALL() {
		console.log("Deleting hdi data...");
		if(confirm("¿Está seguro de que desea eliminar todas las entradas?")){
			console.log("Deleting all drug data...");
			const res = await fetch(BHDI+"/", {
				method: "DELETE"
			}).then(function (res) {
				if(res.ok){
                    totaldata = 0;
					getData();
                    //color = "success";
					//errorMSG="Datos eliminados correctamente";
                    errorMSG = 200.3;
					console.log("OK All data erased");
                    location.reload();
				}
				else{
					console.log("ERROR Data was not erased");
                    //color = "danger";
					//errorMSG= "No se han podido eliminar los datos";
                    errorMSG = 404.2;
				}
			});
		}
	}
    async function editData(name, year) {
        console.log("Inserting hdi data...");
         //Comprobamos que el año y la fecha no estén vacíos, el string vacio no es null
         if (data.country == "" || data.country == null || data.year == "" || data.year == null) {
             alert("Los campos 'Pais' y 'Año' no pueden estar vacios");
         }
         else{
             const res = await fetch(BHDI+"/" + name + "/" + year,{
             method:"PUT",
             body:JSON.stringify(data),
             headers:{
                 "Content-Type": "application/json"
             }
             }).then(function (res) {
                 if(res.status == 200){
                     getData();
                     console.log("Data introduced");
                     errorMSG = 201;
                 }
                 else if(res.status == 400){
                     console.log("ERROR Data was not correctly introduced");
                     errorMSG = 400;
                 }
                 else if(res.status == 409){
                     console.log("ERROR There is already a data with that country and year in the database");
                     errorMSG = 409;
                 }
             });	
         }
     }

       
     //Busquedas

async function searchStat() {
  error = 0;
  errorMsg = null;
  console.log("Searching data...");
      var campos = new Map(
        Object.entries(data).filter((o) => {
          return o[1] != "";
        })
      );
      let querySymbol = "?";
      for (var [clave, valor] of campos.entries()) {
        querySymbol += clave + "=" + valor + "&";
      }
      fullQuery = querySymbol.slice(0, -1);
      if (fullQuery != "") {
        const res = await fetch(
          BHDI + fullQuery
        );
        if (res.ok) {
          console.log("OK");
          const json = await res.json();
          hdi_stats = json;
          error = 0;
          okMsg = "Búsqueda realizada con éxito";
        } else {
          console.log("OKa");
          hdi_stats = [];
          if (res.status === 404) {
            console.log("OKe");
            error = 404;
            errorMsg = "No se encuentra el dato solicitado";
          } else if (res.status === 500) {
            console.log("OKa");
            error = 500;
            errorMsg = "No se han podido acceder a la base de datos";
          }
          okMsg = "";
          console.log("ERROR!" + errorMsg);
        }
      } else {
        errorMsg = "Búsqueda vacía";
        console.log("OKv");
        error = 1000;
      }
    }
    
   


    async function getNextPage() {
        console.log(totaldata);
        if (page+5 > totaldata) {
            page = 1
        } else {
            page+=5
        }
        
        visible = true;
        console.log("Charging page... Listing since: "+page);
        const res = await fetch(BHDI+"?limit=10&offset="+page);
        if (res.ok) {
            console.log("Ok:");
            const json = await res.json();
            hdi_stats = json;
            console.log("Received " + hdi_stats.length + " data.");
        } else {
            errorMSG= res.status + ": " + res.statusText;
            console.log("ERROR!");
        }
    }

    async function pagBefore(){
        correctMsg="";
        errorMsg="";
		if (offset >= 10){
            offset = offset - limit;
        } 
		getData();
	
	}

    async function pagNext(){
        correctMsg="";
        errorMsg="";
		if(offset<=numTotal){
            offset = offset + limit;
        }
		getData();
	
    }
    function changePage(page, offset) {
      console.log("------Change page------");
      console.log("Params page: " + page + " offset: " + offset);
      last_page = Math.ceil(total / 10);
      console.log("new last page: " + last_page);
      if (page !== current_page) {
        console.log("enter if");
        current_offset = offset;
        current_page = page;
        console.log("page: " + page);
        console.log("current_offset: " + current_offset);
        console.log("current_page: " + current_page);
        getStats();
      }
      console.log("---------Exit change page-------");
    }


    //getPreviewPage    
    async function getPreviewPage() {
        console.log(totaldata);
        if (page-5 > 1) {
            page-=5; 
        } else page = 1
        visible = true;
        console.log("Charging page... Listing since: "+page);
        const res = await fetch(BHDI+"?limit=10&offset="+page);
        if (res.ok) {
            console.log("Ok:");
            const json = await res.json();
            hdi_stats = json;
            console.log("Received " + hdi_stats.length + " resources.");
        } else {
            errorMSG= res.status + ": " + res.statusText;
            console.log("ERROR!");
        }
    }


    
    
    
</script>

<main>
    <Button color="success" on:click="{loadInitialData}">
        Cargar datos inciales
    </Button>
    <Button color="danger" on:click="{deleteALL}">
        Eliminar todo
    </Button>
    <Button outline color="info" on:click="{getPreviewPage}">
        Atrás
    </Button>
    <Button outline color="info" on:click="{getNextPage}">
        Siguiente
     </Button>

    {#await hdi_stats}
        Loading data...
    {:then hdi_stats}
    
        {#if errorMSG === 200.1}
        <UncontrolledAlert  color="success" >
            Datos cargados con éxito.
        </UncontrolledAlert>
	    {/if}

        {#if errorMSG === 200.2}
        <UncontrolledAlert  color="warning" >
            Recurso eliminado con éxito.
        </UncontrolledAlert>
	    {/if}

        {#if errorMSG === 200.3}
        <UncontrolledAlert  color="warning" >
            Elementos borrados con éxito.
        </UncontrolledAlert>
	    {/if}

        {#if errorMSG === 201}
        <UncontrolledAlert  color="success" >
            Recurso instertado con éxito.
        </UncontrolledAlert>
	    {/if}

        {#if errorMSG === 404.2}
        <UncontrolledAlert  color="danger" >
            La base de datos ya esta vacía.
        </UncontrolledAlert>
	    {/if}

        {#if errorMSG === 409}
        <UncontrolledAlert  color="danger" >
            Este recurso (País y Año) ya existe.
        </UncontrolledAlert>
	    {/if}

        <!-- Table -->

        <Table bordered responsive hover>
            <thead>
                <tr>
                    <th>País</th>
                    <th>Año</th>
                    <th>Rango</th>
                    <th>Valor</th>
                    <th>Escolaridad</th>
                    
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><input bind:value="{data.country}"></td>
                    <td><input bind:value="{data.year}"></td>
                    <td><input bind:value="{data.hdirank}"></td> 
                    <td><input bind:value="{data.hdivalue}"></td>    
                    <td><input bind:value="{data.hdischolar}"></td> 
                     
                    <td><Button outline color="primary" on:click={insertData}>Insertar</Button>
                        <Button color="warning" on:click={searchStat}>Buscar</Button></td>
                               
                </tr>
                
 
                {#each hdi_stats as sc}
                    <tr>
                        <td><a href="#/hdi-stats/{sc.country}/{sc.year}">{sc.country}</a></td>
                        <td>{sc.year}</td>
                        <td>{sc.hdirank}</td>
                        <td>{sc.hdivalue}</td>
                        <td>{sc.hdischolar}</td>
                        
                        <td><Button outline color="danger" on:click="{deleteData(sc.country, sc.year)}">Borrar</Button></td>
                        <td><Button outline color="success" on:click="{editData(sc.country, sc.year)}">Editar</Button></td>
                    </tr>
                    
                {/each}
            </tbody>
        </Table>

        {#if hdi_stats.length === 0}
            <p>No se han encontrado datos, por favor, carga los datos iniciales.</p>
        {/if}
         
    {/await}
</main>