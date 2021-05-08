<script>
    import Table from "sveltestrap/src/Table.svelte";
    import Button from "sveltestrap/src/Button.svelte";
    import { onMount } from "svelte";
    import { pop } from "svelte-spa-router";
    export let params = {}
    let hdi_stat = {};
    
    let updatedCountry = "";
    let updatedYear = "";
    let updatedHDIrank = "";
    let updatedHDIvalue = "";
    let updatedHDIscholar = "";
   
    let erroMsg = "";
    
	onMount(getPais);
async function getPais(){
    console.log("Fetching country....");
    const res = await fetch("/api/v1/hdi-stats/" + params.country + "/" + params.year);
    if(res.ok){
        console.log("Ok:");
        const json = await res.json();
        hdi_stat = json;
        updatedCountry = hdi_stat.country;
        updatedYear = hdi_stat.year;
        updatedHDIrank = hdi_stat.hdirank;
        updatedHDIvalue = hdi_stat.hdivalue;
        updatedHDIscholar = hdi_stat.hdischolar;
        
        console.log("Received hdi_stat.");
    }else if(res.status==404){      
        erroMsg="No existe ese pais";
        console.log("ERROR" + erroMsg);
    }
}
async function actualizaPais(){
		console.log("Updating country..." + JSON.stringify(params.country));
		const res = await fetch("/api/v1/hdi-stats/" + params.country + "/" + params.year,{
			method: "PUT",
			body: JSON.stringify({
                country : params.country,
                year : params.year,
                hdirank : updatedHDIrank,
                hdivalue : updatedHDIvalue,
                hdischolar : updatedHDIscholar}),
			headers: {
				"Content-Type": "application/json"
			}
		}).then(function (res) {
            getPais();
            
            if(res.status==200){
                window.alert("El pais se ha modificado correctamente");
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
					<th>Rango </th>
					<th>Valor</th>
					<th>Escolaridad</th>
					<th>Acción</th>
				</tr>
			</thead>
			<tbody>
                <tr>
                    <td>{updatedCountry}</td>
                    <td>{updatedYear}</td>
                    <td><input bind:value="{updatedHDIrank}"></td>
                    <td><input bind:value="{updatedHDIvalue}"></td>
                    <td><input bind:value="{updatedHDIscholar}"></td>
                    
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