<script>
	import { onMount } from "svelte";
	import Table from "sveltestrap/src/Table.svelte"; 
	import Button from "sveltestrap/src/Button.svelte";
    import { pop } from "svelte-spa-router";
	import { Pagination, PaginationItem, PaginationLink } from 'sveltestrap';
	import { Form, FormGroup, FormText, Input, Label } from 'sveltestrap';
	import { Alert, UncontrolledAlert } from 'sveltestrap';
    import { UncontrolledCollapse, Collapse, CardBody, Card } from "sveltestrap";
	
	
    
    let isOpen = false;
    let busquedas = "/api/v1/du-stats?";
    //ALERTAS
    let visible = false;
    let color = "danger";
    
    let BASE_API_PATH_SEC = "/api/v1/du-stats"
    let open = false;
    let error = null;
    let okMsg = "";
    let fullQuery = "";

    let page = 1;
    let totaldata=8;
    let du_stats = [];
    let searchcountry = "";
    let searchyear = 0;
	let data = {
		country: "",
		year: "",
		dupopulation:"",
		dudead:"",
		dudependenceperc:"",
        dudaly:""
	}

    
     /*pagination*/
        let limit = 10; /*limit es el número de elementos por página*/
	let offset = 0; /*offset indica desde qué elemento se va a empezar a mostrar*/
        let numTotal=0;
	let maxpag = numTotal>=limit; 
    
    let errorMSG = null;

    //BUSQUEDA
    let country = "";
	let year = "";
	let dupopulation="";
	let dudead="";
	let dudependenceperc="";
    let dudaly="";
    let exitoMsg ="";

    
  //VARIABLES PARA BUSQUEDA
	

    onMount(getData);
 
    //GET
    async function getData() {
 
        console.log("Fetching Drugs Data...");
        const res = await fetch("/api/v1/du-stats?limit=10&offset=1");
        if (res.ok) {
            console.log("Ok:");
            const json = await res.json();
            du_stats = json;
            console.log("Received " + du_stats.length + " DU Data.");
        } else {
            errorMSG= res.status;// + ": " + res.statusText;
            console.log("ERROR!");
        }
    }
 
    //GET INITIALDATA
    async function loadInitialData() {
 
        console.log("Fetching du data...");
        await fetch("/api/v1/du-stats/loadInitialData");
        const res = await fetch("/api/v1/du-stats?limit=10&offset=1");
        if (res.ok) {
            console.log("Ok:");
            const json = await res.json();
            du_stats = json;
            totaldata=8;
            console.log("Received " + du_stats.length + " du data.");
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
		 
         console.log("Inserting drug data...");
         //Comprobamos que el año y la fecha no estén vacíos, el string vacio no es null
         if (data.country == "" || data.country == null || data.year == "" || data.year == null) {
             alert("Los campos 'Pais' y 'Año' no pueden estar vacios");
         }
         else{
             const res = await fetch("/api/v1/du-stats",{
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
        const res = await fetch("/api/v1/du-stats/" + name + "/" + year, {
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
		console.log("Deleting drug data...");
		if(confirm("¿Está seguro de que desea eliminar todas las entradas?")){
			console.log("Deleting all drug data...");
			const res = await fetch("/api/v1/du-stats/", {
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
    //Busquedas
    let searchCountry= "";
	let searchYear = "";

    
    async function editData(name, year) {
        console.log("Inserting du data...");
         //Comprobamos que el año y la fecha no estén vacíos, el string vacio no es null
         if (data.country == "" || data.country == null || data.year == "" || data.year == null) {
             alert("Los campos 'Pais' y 'Año' no pueden estar vacios");
         }
         else{
             const res = await fetch("/api/v1/du-stats/" + name + "/" + year,{
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
    
    
    //getNextPage
    async function getNextPage() {
 
        console.log(totaldata);
        if (page+5 > totaldata) {
            page = 1
        } else {
            page+=5
        }
        console.log("Charging page "+ page);
        const res = await fetch("/api/v1/du-stats?limit=10&offset="+page);
        if (res.ok) {
            console.log("Ok:");
            const json = await res.json();
            du_stats = json;
            console.log("Received " + du_stats.length + " data.");
        } else {
            errorMSG= res.status + ": " + res.statusText;
            console.log("ERROR!");
        }
    }

   
    // Buscar dato
    async function busqueda (country, year, dupopulation, dudead, dudependenceperc, dudaly){
		if(typeof country=='undefined'){
			country="";
		}
        if(typeof year=='undefined'){
			year="";
		}
		if(typeof dupopulation=='undefined'){
			dupopulation="";
		}
		if(typeof dudead=='undefined'){
			dudead="";
		}
		if(typeof dudependenceperc=='undefined'){
			dudependenceperc="";
		}
        if(typeof dudaly=='undefined'){
			dudaly="";
		}
		const res = await fetch("/api/v1/du-stats?country="+country+"&year="+year+"&dupopulation="+dupopulation+"&dudead="+dudead+
        "&dudependenceperc="+dudependenceperc+"&dudaly="+dudaly)
		if (res.ok){
			const json = await res.json();
			du_stats = json;
			console.log("Found "+ du_stats.length + " countries");
			
			if(du_stats.length==1){
				exitoMsg = "Se ha encontrado " + du_stats.length + " paises";
			}else{
				exitoMsg = "Se han encontrado " + du_stats.length + " paises";
			}
		}else if (res.status==404){
			window.alert("No hay países con los parámetros introducidos");
			console.log("ERROR");
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
  //Cambio de pagina
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
 
        if (page-5>=1) {
            page-=5; 
        } else page = 1
        console.log("Charging page " +page);
        const res = await fetch("/api/v1/du-stats?limit=10&offset="+page);
        if (res.ok) {
            console.log("Ok:");
            const json = await res.json();
            du_stats = json;
            console.log("Received " + du_stats.length + " resources.");
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
     {#if !maxpag}
     <Button outline color="info" on:click="{getNextPage}">
         Siguiente
        </Button>{/if}
    <Button href ="/#/du-stats/Graph">
            Analíticas
       </Button>
    <Button href ="/#/du-stats/graph1">
        Analítica 3D
        </Button>
    <Button href ="/#/du-stats/graphMorris">
        Analítica Morris
        </Button>
       
    {#await du_stats}
        Loading data...
    {:then du_stats}
    
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
                    <th>Poblacion</th>
                    <th>Porcentaje de Muertes</th>
                    <th>Porcentaje de dependencia a las drogas</th>
                    <th>D.A.L.Y</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><input bind:value="{data.country}"></td>
                    <td><input bind:value="{data.year}"></td>
                    <td><input bind:value="{data.dupopulation}"></td> 
                    <td><input bind:value="{data.dudead}"></td>    
                    <td><input bind:value="{data.dudependenceperc}"></td> 
                    <td><input bind:value="{data.dudaly}"></td>   
                    <td><Button outline color="primary" on:click={insertData}>Insertar</Button></td>
            </tr>
            <tr>
                <td><input type="text" placeholder="País"  bind:value={country}/></td> 
                <td><input type="text" placeholder="Año"  bind:value={year}/></td>
                <td><input type="text" placeholder="Población"  bind:value={dupopulation}/></td>
                <td><input type="text" placeholder="Porcentaje de Muertes"  bind:value={dudead}/></td>
                <td><input type="text" placeholder="Porcentaje de dependencia a las drogas"  bind:value={dudependenceperc}/></td>
                <td><input type="text" placeholder="D.A.L.Y"  bind:value={dudaly}/></td>
                <td><Button outline color="primary" on:click="{busqueda (country, year,dupopulation,dudead,dudependenceperc,dudaly)}">Buscar</Button></td>
                
             </tr>
 
                {#each du_stats as sc}
                    <tr>
                        <td><a href="#/du-stats/{sc.country}/{sc.year}">{sc.country}</a></td>
                        <td>{sc.year}</td>
                        <td>{sc.dupopulation}</td>
                        <td>{sc.dudead}</td>
                        <td>{sc.dudependenceperc}</td>
                        <td>{sc.dudaly}</td>
                        <td><Button outline color="danger" on:click="{deleteData(sc.country, sc.year)}">Borrar</Button></td>
                        <td><Button outline color="success" on:click="{editData(sc.country, sc.year)}">Editar</Button></td>
                    </tr>
                {/each}
            </tbody>
        </Table>

        <Button color="info" on:click={getPreviewPage}>Anterior</Button>        
        Número de datos en esta página: {numTotal}
        {#if !maxpag}
        <Button color="info" on:click={getNextPage}>Siguiente</Button> 
        {/if}

        <br/> <br/><Button style="background-color:darkgray " on:click="{pop}"> Volver </Button>


        {#if du_stats.length === 0}
            <p>No se han encontrado datos, por favor, carga los datos iniciales.</p>
        {/if}
         
    {/await}
</main>