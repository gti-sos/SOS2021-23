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
        ><b>URL: </b>http://sos2021-23.herokuapp.com</a
      >
    </Col>
  </Container>

  <h2>APIs</h2>
  <Container>
    <Col xs="auto">
      <Card class="mb-3">
        <CardHeader>
          <CardTitle><h5>Estadísticas sobre drogas</h5></CardTitle>
        </CardHeader>
        <CardBody>
          <CardSubtitle />
          <CardText
            >Estadísticas del consumo de drogas recogidas en el año 2017 en distintos países.</CardText>
          
          <a href="https://sos2021-23.herokuapp.com/api/v1/du-stats">
            <Button color="primary">API</Button></a>
          
          <a href="/#/du-stats">
            <Button color="primary">Interfaz</Button>
          </a>
          <a href="#/du-stats/Graph">
            <Button color="primary">Gráfica</Button>
          </a>
          <a href="https://documenter.getpostman.com/view/14950269/TzJoDzt6"
            ><Button color="info">Documentación Back-end en Postman</Button></a>
        </CardBody>
        <CardFooter
          >developed by
          <a href="https://github.com/secaasecas">José Carlos Torres Moreno</a>
          </CardFooter>
      </Card>
    </Col>

    <Col xs="auto">
      <Card class="mb-3">
        <CardHeader>
          <CardTitle><h5>Estadísticas de Salud Mental</h5></CardTitle>
        </CardHeader>
        <CardBody>
          <CardSubtitle />
          <CardText>Estadísticas de Salud Mental recogidas en el año 2017 en distintos países.</CardText>
          <a href="https://sos2021-23.herokuapp.com/api/v1/mh-stats">
            <Button color="primary">API</Button></a>
          <a href="/#/mh-stats">
            <Button color="primary">Interfaz</Button>
          </a>
          <a href="#/mh-stats/chart">
            <Button color="primary">Gráfica</Button>
          </a>
          <a href="https://documenter.getpostman.com/view/14943559/TzJoDfQ5"
            ><Button color="info">Documentación Backend en Postman</Button></a>
          
        </CardBody>
        <CardFooter
          >desarrollado por 
          <a href="https://github.com/Beelthazad">Eduardo Carmona</a>
          </CardFooter>
      </Card>
    </Col>
    <Col xs="auto">
      <Card class="mb-3">
        <CardHeader>
          <CardTitle><h5>Porcentaje de paro(API UNEMPLOYMENT)</h5></CardTitle>
        </CardHeader>
        <CardBody>
          <CardSubtitle />
          <CardText>Porcentaje de paro según diferentes fuentes.</CardText>
          <a href="https://sos2021-23.herokuapp.com/api/v1/unemployment-stats">
            <Button color="primary">V1</Button></a>
          <a href="https://sos2021-23.herokuapp.com/api/v2/unemployment-stats">
              <Button color="primary">V2</Button></a>
          <a href="/#/unemployment-stats">
            <Button color="primary">Frontend</Button>
          </a>
          <a href="https://documenter.getpostman.com/view/14941751/TzJuAJ6j"
            ><Button color="info">Postman V1</Button></a>
          <a href="https://documenter.getpostman.com/view/14941751/TzRSh81k"
            ><Button color="info">Postman V2</Button></a>
          
        </CardBody>
        <CardFooter
          >desarrollado por 
          <a href="https://github.com/ace58">Antonio Corpas</a>
          </CardFooter>
      </Card>
    </Col>
    <Col xs="auto">
      <Card class="mb-3">
        <CardHeader>
          <CardTitle><h5>Estadística HDI</h5></CardTitle>
        </CardHeader>
        <CardBody>
          <CardSubtitle />
          <CardText>Recogidas por la UNDP</CardText>
          
          <a href="https://sos2021-23.herokuapp.com/api/v1/hdi-stats">
            <Button color="primary">API</Button></a>
          <a href="/#/hdi-stats">
            <Button color="primary">Interfaz</Button>
          </a>
          <a href="#/hdi-stats/Graph">
            <Button color="primary">Gráfica</Button>
          </a>
          <a href="https://documenter.getpostman.com/view/14951179/TzJoF21c"
            ><Button color="info">Documentación Backend en Postman</Button></a>
          
        </CardBody>
        <CardFooter
          >desarrollado por 
          <a href="https://github.com/Jackman97">Antonio Maiquez</a>
          </CardFooter>
      </Card>
    </Col>
  </Container>
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