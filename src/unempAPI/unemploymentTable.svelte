<script>
	import { onMount } from "svelte";
	import Table from "sveltestrap/src/Table.svelte"; 
	import Button from "sveltestrap/src/Button.svelte";
	import { Pagination, PaginationItem, PaginationLink } from 'sveltestrap';
	import { Form, FormGroup, FormText, Input, Label } from 'sveltestrap';
	import { Alert, UncontrolledAlert } from 'sveltestrap';
    import { UncontrolledCollapse, Collapse, CardBody, Card } from "sveltestrap";
	
	
    
    //ALERTAS
    let visible = false;
    let color = "danger";
	//Paginación
	let page=1;
	//Finpaginacion
    let totaldata=11;
    let unemployment_stats = [];
	let data = {
		country: "",
		year: "",
		knoperc:"",
		intperc:"",
		gfperc:""
	}
    
	let exitoMsg="";
	//VARIABLES PARA BUSQUEDA
	let Ucountry = "";
	let Uyear = "";
	let Ufrom = "";
	let Uto = "";
	let knoperc="";
	let intperc="";
	let gfperc="";
    
    
    let errorMSG = null;
    onMount(getData);
 
    //GET
    async function getData() {
 
        console.log("Fetching unemployment Data...");
        const res = await fetch("/api/v2/unemployment-stats?limit=10"+"&offset="+page);
        if (res.ok) {
            console.log("Ok:");
            const json = await res.json();
            unemployment_stats = json;
            console.log("Received " + unemployment_stats.length + " unemployment Data.");
        } else {
            errorMSG= res.status;// + ": " + res.statusText;
            console.log("ERROR!");
        }
    }
 
    //GET INITIALDATA
    async function loadInitialData() {
 
        console.log("Fetching unemployment data...");
        await fetch("/api/v2/unemployment-stats/loadInitialData");
        const res = await fetch("/api/v2/unemployment-stats?limit=10"+"&offset="+page);
        if (res.ok) {
            console.log("Ok:");
            const json = await res.json();
            unemployment_stats = json;
            totaldata=11;
            console.log("Received " + unemployment_stats.length + " unemployment data.");
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
	async function busqueda (Ucountry,Uyear,Ufrom,Uto, knoperc, intperc, gfperc){
		if(typeof Ucountry=='undefined'){
			Ucountry="";
		}
		if(typeof Uyear=='undefined'){
			Uyear="";
		}
        if(typeof Ufrom=='undefined'){
			Ufrom="";
		}
        if(typeof Uto=='undefined'){
			Uto="";
		}
		if(typeof knoperc=='undefined'){
			knoperc="";
		}
		if(typeof intperc=='undefined'){
			intperc="";
		}
		if(typeof gfperc=='undefined'){
			gfperc="";
		}
		const res = await fetch("/api/v2/unemployment-stats?country="+Ucountry+"&year="+Uyear+"&from="+Ufrom+"&to="+Uto+"&knoperc="+knoperc+"&intperc="+intperc+"&gfperc="+gfperc)
		if (res.ok){
			const json = await res.json();
			unemployment_stats = json;
			console.log("Found "+ unemployment_stats.length + " countries");
			
			if(unemployment_stats.length==1){
				exitoMsg = "Se ha encontrado " + unemployment_stats.length + " paises";
			}else{
				exitoMsg = "Se han encontrado " + unemployment_stats.length + " paises";
			}
		}else if (res.status==404){
			window.alert("No hay países con los parámetros introducidos");
			console.log("ERROR");
		}
	}
    async function getNextPage() {
        console.log(totaldata);
        if (page+10 > totaldata) {
            page = 1
        } else {
            page+=10
        }
        
        visible = true;
        console.log("Charging page... Listing since: "+page);
        const res = await fetch("/api/v2/unemployment-stats?limit=10&offset="+(-1+page));
        color = "success";
        errorMSG= (page+5 > totaldata) ? "Mostrando elementos "+(page)+"-"+totaldata : "Mostrando elementos "+(page)+"-"+(page+9);
        if (totaldata == 0){
            console.log("ERROR Data was not erased");
            color = "danger";
            errorMSG= "¡No hay datos!";
        }else if (res.ok) {
            console.log("Ok:");
            const json = await res.json();
            unemployment_stats = json;
            console.log("Received " + unemployment_stats.length + " resources.");
        } else {
            errorMSG= res.status + ": " + res.statusText;
            console.log("ERROR!");
        }
    }
    //getPreviewPage    
    async function getPreviewPage() {
        console.log(totaldata);
        if (page-10 > 1) {
            page-=5; 
        } else page = 1
        visible = true;
        console.log("Charging page... Listing since: "+page);
        const res = await fetch("/api/v2/unemployment-stats?limit=10&offset="+(-1+page));
        color = "success";
        errorMSG= (page+5 > totaldata) ? "Mostrando elementos "+(page)+"-"+totaldata : "Mostrando elementos "+(page)+"-"+(page+9);
        if (totaldata == 0){
            console.log("ERROR Data was not erased");
            color = "danger";
            errorMSG= "¡No hay datos!";
        }else if (res.ok) {
            console.log("Ok:");
            const json = await res.json();
            unemployment_stats = json;
            console.log("Received "+unemployment_stats.length+" resources.");
        } else {
            errorMSG= res.status+": "+res.statusText;
            console.log("ERROR!");
        }
    }
    
    //INSERT
    
    async function insertData(){
		 
         console.log("Inserting unemployment data...");
         //Comprobamos que el año y la fecha no estén vacíos, el string vacio no es null
         if (data.country == "" || data.country == null || data.year == "" || data.year == null) {
             alert("Debes insertar el nombre del país y el año.");
         }
         else{
             const res = await fetch("/api/v2/unemployment-stats",{
             method:"POST",
             body:JSON.stringify(data),
             headers:{
                 "Content-Type": "application/json"
             }
             }).then(function (res) {
                 if(res.status == 201){
                    getData();
                    window.alert("Se introdujo el dato");
                     console.log("Data introduced");
                     errorMSG = 201;
                 }
                 else if(res.status == 400){
                     window.alert("No se introdujo bien el dato");
                     console.log("ERROR Data was not correctly introduced");
                     errorMSG = 400;
                 }
                 else if(res.status == 409){
                     window.alert("Ya existe ese recurso en la base de datos");
                     console.log("ERROR There is already a data with that country and year in the database");
                     errorMSG = 409;
                 }
             });	
         }
     }
    //DELETE SPECIFIC
    async function deleteData(name, year) {
        const res = await fetch("/api/v2/unemployment-stats/" + name + "/" + year, {
            method: "DELETE"
        }).then(function (res) {
            visible = true;
            getData();      
            if (res.status==200) {
                totaldata--;
                errorMSG = 200.2;
                console.log("Deleted " + name);            
            }else if (res.status==404) {
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
		console.log("Deleting unemployment data...");
		if(confirm("¿Está seguro de que desea eliminar todas las entradas?")){
			console.log("Deleting all unemployment data...");
			const res = await fetch("/api/v2/unemployment-stats/", {
				method: "DELETE"
			}).then(function (res) {
				if(res.ok){
                    totaldata = 0;
					getData();
                    errorMSG = 200.3;
                    window.alert("Datos eliminados correctamente");
					console.log("Datos eliminados correctamente");
                    location.reload();
				}
				else{
					console.log("Ha habido un fallo. No se han eliminado los datos");
                    errorMSG = 404.2;
				}
			});
		}
	}
    
</script>

<main>
        <Button color="success" on:click="{loadInitialData}">
            Cargar datos
        </Button>
        <Button color="danger" on:click="{deleteALL}">
            Eliminar datos
        </Button>
		<Button on:click="{getPreviewPage}">
            Atrás
        </Button>
		<Button on:click="{getNextPage}">
            Siguiente
        </Button>

        <Button outline color="primary" href="/#/info">
            Página Principal
        </Button>
        
		<p>Si quieres filtar por algún atributo introduce el valor de búsqueda en la casilla. </p>
		<Table borderless responsive>
			<tr>
				<td><strong><label>Pais: <input bind:value="{Ucountry}"></label></strong></td>
				<td><strong><label>Año: <input bind:value="{Uyear}"></label></strong></td>
				<td><strong><label>Porcentaje de Knoema: <input bind:value="{knoperc}"></label></strong></td>
				<td><strong><label>Porcentaje de InternetWorldStats: <input bind:value="{intperc}"></label></strong></td>
				<td><strong><label>Porcentaje de Gfmag: <input bind:value="{gfperc}"></label></strong></td>
			</tr>

            <tr>
				<td><strong><label>Año(Desde): <input bind:value="{Ufrom}"></label></strong></td>
				<td><strong><label>Año(Hasta): <input bind:value="{Uto}"></label></strong></td>
			</tr>
		</Table>
		<div style="text-align:center;padding-bottom: 1%">
			<Button outline color="primary" on:click="{busqueda (Ucountry, Uyear,Ufrom,Uto,knoperc,intperc,gfperc)}">Buscar</Button>
		</div>
		<p>Si quieres editar algún recurso haz click en el nombre del país. </p>
    

    {#await unemployment_stats}
        Loading unemployment data...
    {:then unemployment_stats}
    
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
                    <th>Porcentaje según Knoema.es </th>
                    <th>Porcentaje según InternetWorldStats.com </th>
                    <th>Porcentaje según Gfmag.com</th>
                    <th>Acciones</th> 
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><input bind:value="{data.country}"></td>
                    <td><input type =number bind:value="{data.year}"></td>
                    <td><input type =number bind:value="{data.knoperc}"></td> 
                    <td><input type =number bind:value="{data.intperc}"></td>    
                    <td><input type =number bind:value="{data.gfperc}"></td>  
                    <td><Button outline color="primary" on:click={insertData}>Insertar</Button></td>           
                </tr>
 
                {#each unemployment_stats as sc}
                    <tr>
                        <td><a href="#/unemployment-stats/{sc.country}/{sc.year}">{sc.country}</a></td>
                        <td>{sc.year}</td>
                        <td>{sc.knoperc}</td>
                        <td>{sc.intperc}</td>
                        <td>{sc.gfperc}</td>
                        <td><Button outline color="danger" on:click="{deleteData(sc.country, sc.year)}">Borrar</Button></td>
                        
                    </tr>
                {/each}
            </tbody>
        </Table>

        {#if unemployment_stats.length === 0}
            <p>No se han encontrado datos, por favor, carga los datos iniciales.</p>
        {/if}
         
    {/await}
</main>