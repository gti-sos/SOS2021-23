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
    <h1>SOS2021-01</h1>
  
    <h2>Team</h2>
    <Container>
      <Col>
        <a href="http://github.com/secaasecas">José Carlos Torres Moreno</a>
      </Col>
      <Col>
        <a href="http://github.com/Lucia2712">Lucia Castro Perez</a>
      </Col>
      <Col>
        <a href="http://github.com/AbramsM1A2">Abraham Corta Ramirez</a>
      </Col>
    </Container>
  
    <h2>Project description</h2>
    <p>
        Our aim is to analyze the relationship between drug use,HDI, mental health & unemployment at a global scale.
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
            <CardTitle><h5>Drugs Stats</h5></CardTitle>
          </CardHeader>
          <CardBody>
            <CardSubtitle />
            <CardText
              >Drug use data source.</CardText
            >
            <a href="https://sos2021-23.herokuapp.com/api/v1/du-stats">
              <Button color="primary">Backend</Button></a
            >
            <a href="/#/du-stats">
              <Button color="primary">Frontend</Button>
            </a>
            <a href="https://documenter.getpostman.com/view/14950269/TzJoDzt6"
              ><Button color="info">Postman Documentation</Button></a
            >
          </CardBody>
          <CardFooter
            >developed by
            <a href="https://github.com/secaasecas">José Carlos Torres Moreno</a
            ></CardFooter
          >
        </Card>
      </Col>
      <Col xs="auto">
        <Card class="mb-3">
          <CardHeader>
            <CardTitle><h5>Life-stats</h5></CardTitle>
          </CardHeader>
          <CardBody>
            <CardSubtitle />
            <CardText
              >Quality of life index data source by country, which is linked to
              the purchasing power index and the safety index.</CardText
            >
            <a href="https://sos2021-01.herokuapp.com/api/v1/life-stats">
              <Button color="primary">Backend</Button>
            </a>
            <a href="/#/life-stats">
              <Button color="primary">Frontend</Button>
            </a>
            <a href="https://documenter.getpostman.com/view/14961437/TzJoDg1P">
              <Button color="info">Postman Documentation</Button>
            </a>
          </CardBody>
          <CardFooter
            >developed by
            <a href="https://github.com/Lucia2712">Lucia Castro Perez</a>
          </CardFooter>
        </Card>
      </Col>
      <Col xs="auto">
        <Card class="mb-3">
          <CardHeader>
            <CardTitle><h5>Natality-stats</h5></CardTitle>
          </CardHeader>
          <CardBody>
            <CardSubtitle />
            <CardText>
              Men and women born, natality and fertlity ratios by year and
              country.
            </CardText>
            <a href="/api/v1/natality-stats"
              ><Button color="primary">Backend</Button></a
            >
            <a href="/#/natality-stats"
              ><Button color="primary">Frontend</Button></a
            >
            <a href="https://documenter.getpostman.com/view/14932491/TzJrCzRM"
              ><Button color="info">Postman Documentation</Button></a
            >
          </CardBody>
          <CardFooter
            >developed by
            <a href="https://github.com/AbramsM1A2">Abraham Corta Ramírez</a
            ></CardFooter
          >
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