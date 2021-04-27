<script>
	import MHTable from './MHTable.svelte';
	import UnempTable from'./unempApi/unemploymentTable.svelte';
	import DUTable from "./duAPI/DUTable.svelte";
	import Navbar from './Navbar.svelte';
	import Sidebar from './Sidebar.svelte';
	import Hamburger from './Hamburger.svelte'
	import Footer from './Footer.svelte';
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
<main>
	<body>
		<!-- Aquí van las tablas -->
		<h1>Datos de Salud Mental</h1>
		<MHTable></MHTable>
	</body>
	<body>
		<h1> Paro </h1>
		<UnempTable></UnempTable>
	</body>
	<body>
		<h1> Drogas </h1>
		<DUTable></DUTable>
	</body>
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