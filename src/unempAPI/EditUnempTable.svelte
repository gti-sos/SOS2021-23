<script>
    import Table from "sveltestrap/src/Table.svelte";
    import Button from "sveltestrap/src/Button.svelte";
    import { onMount } from "svelte";
    import { pop } from "svelte-spa-router";
    export let params = {}
    let unemployment_stat = {};
    
    let updatedCountry = "";
    let updatedYear = "";
    let updatedKnoperc = "";
    let updatedIntperc = "";
    let updatedGfperc = "";
    let erroMsg = "";
    
	onMount(getPais);
async function getPais(){
    console.log("Fetching country....");
    const res = await fetch("/api/v2/unemployment-stats/" + params.country + "/" + params.year);
    if(res.ok){
        console.log("Ok:");
        const json = await res.json();
        unemployment_stat = json;
        updatedCountry = unemployment_stat.country;
        updatedYear = unemployment_stat.year;
        updatedKnoperc = unemployment_stat.knoperc;
        updatedIntperc = unemployment_stat.intperc;
        updatedGfperc = unemployment_stat.gfperc;
        console.log("Received unemployment_stat.");
    }else if(res.status==404){      
        erroMsg="No existe un recurso llamado "+params.country+" en la tabla";
        console.log("ERROR" + erroMsg);
    }
}
async function actualizaPais(){
		console.log("Updating country...." + JSON.stringify(params.country));
		const res = await fetch("/api/v2/unemployment-stats/" + params.country + "/" + params.year,{
			method: "PUT",
			body: JSON.stringify({
                country : params.country,
                year : params.year,
                knoperc : updatedKnoperc,
                intperc : updatedIntperc,
                gfperc : updatedGfperc}),
			headers: {
				"Content-Type": "application/json"
			}
		}).then(function (res) {
            getPais();
            
            if(res.status==200){
                window.alert("El pais se ha modificado correctamente");
            }else if(res.status == 400){
                window.alert("ERROR No se introdujeron bien los datos");
                errorMSG = 400;
            }
		});
	}
</script>

<main>
    <h3>Editar <strong>{params.country}</strong></h3>
		<Table bordered>
			<thead>
				<tr>
					<th>Pais</th>
					<th>Año</th>
					<th>Porcentaje según Knoema </th>
					<th>Porcentaje según InternetWorldStats</th>
					<th>Porcentaje según Gfmag</th>
					<th>Acción</th>
				</tr>
			</thead>
			<tbody>
                <tr>
                    <td>{updatedCountry}</td>
                    <td>{updatedYear}</td>
                    <td><input bind:value="{updatedKnoperc}"></td>
                    <td><input  bind:value="{updatedIntperc}"></td>
                    <td><input bind:value="{updatedGfperc}"></td>
                    <td> <Button outline  color="primary" on:click={actualizaPais}>Actualizar</Button> </td>
                </tr>
        </tbody>
		</Table>
    {#if erroMsg}
        <p style="color: red">{erroMsg}</p>
    {/if}
    <Button outline color="secondary" on:click="{pop}">Atrás</Button>
</main>

<style>
h3{
text-align: center;
}
tbody{
	text-align: center;
}
thead{
	text-align: center;
}
main {
font-family: Georgia, "Times New Roman", Times, serif;
color: black;
}
</style>