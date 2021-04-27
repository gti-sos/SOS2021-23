<script>
	import MHTable from './MHTable.svelte';
	import dutable from './duAPI/dutable.svelte';
	import Navbar from './Navbar.svelte';
	import Home from './Home.svelte';
	import Sidebar from './Sidebar.svelte';
	import Hamburger from './Hamburger.svelte'
	import Footer from './Footer.svelte';

	function hideTable() {
  		var x = document.getElementById("mhtable");
  		if (x.style.display === "none") {
    		x.style.display = "block";
  		} else {
    		x.style.display = "none";
  		}
	}
	let open = false
</script>
<!--------------------------------------------------------------------------------------------------------->
<!-- Importando tailwind -->
<svelte:head>
	<link href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css" rel="stylesheet"/>
</svelte:head>

<!-- Menú desplegable-->
<Sidebar bind:open/>
<Navbar bind:sidebar={open}/>

<!-- Cuerpo -->
<main id="mhtable">
	<body>
		<!-- Aquí van las tablas -->
		<h1>Datos de Salud Mental</h1>
		<MHTable></MHTable>
		
		<h1>Datos de Uso de Drogas</h1>
		<dutable></dutable>
	</body>
	<Footer></Footer>
</main>

<!-- Estilos -->
<style>
	:global(body) {
		padding: 0;
	}

	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 400;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
	
</style>