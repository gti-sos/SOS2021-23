<script>
    import {
      Button,
      Icon,
      Card,
      CardBody,
      CardFooter,
      CardHeader,
      CardSubtitle,
      CardText,
      CardTitle,
      Col,
      Container,
      Row,
    } from "sveltestrap";
  </script>
  
  <main>
    <h1>SOS2021-23</h1>
  
    <h2>Equipo</h2>
    <Container>
      <Col>
        <a href="http://github.com/secaasecas">José Carlos Torres Moreno</a>
      </Col>
      <Col>
        <a href="https://github.com/ace58">Antonio</a>
      </Col>
      <Col>
        <a href="https://github.com/Jackman97">Tony</a>
      </Col>
      <Col>
        <a href="https://github.com/Beelthazad">Eduardo Carmona</a>
      </Col>
    </Container>
  
    <h2>Descripción</h2>
    <p>
        El objetivo del proyecto es analizar la relación entre el consumo de drogas, salud mental, paro y HDI.
    </p>
  
    <Container>
      <Col>
        <a href="http://github.com/gti-sos/SOS2021-23"
          ><b>Repository: </b>http://github.com/gti-sos/SOS2021-23</a
        >
      </Col>
      <Col>
        <a href="http://sos2021-23.herokuapp.com"
          ><b>URL: </b>https://sos2021-23.herokuapp.com</a
        >
      </Col>
    </Container>
    <Button  color = primary href="https://sos2021-23.herokuapp.com/#/info">Info</Button>

  </main>
  
  <style>
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
      font-weight: 100;
    }
    b {
      color: #00c1ff;
    }
    @media (min-width: 640px) {
      main {
        max-width: none;
      }
    }
  </style>