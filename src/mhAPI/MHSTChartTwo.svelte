<script>
    import { onMount } from "svelte";
    import { Table, Button, Nav, NavItem, NavLink } from "sveltestrap";
    const BASE_EDU_API_PATH = "/api/v1/mh-stats";
    let mhsv = [];
    let mhChartCountryDate = [];
    let mhChartPopulation = [];
    let mhChartAnxdaly = [];
    let mhChartEating = [];
    let mhChartAdhd = [];
    let mhChartBipolar = [];
    let mhChartDepression = [];
    let mhChartSchizophrenia = [];

    var msg = "";
    async function loadChart() {
      console.log("Obteniendo datos...");
      const res = await (BASE_EDU_API_PATH);
      
      if (res.ok) {
        console.log("OK");
        mhsv = await res.json();
        mhsv.forEach(stat => {
            console.log(stat);
        mhChartCountryDate.push(stat.country+"-"+stat.year);
        mhChartPopulation.push(parseFloat(stat.population));
        mhChartAnxdaly.push(parseFloat(stat.anxdaly));
        mhChartEating.push(parseFloat(stat.eating));
        mhChartAdhd.push(parseFloat(stat.adhd));
        mhChartBipolar.push(parseFloat(stat.bipolar));
        mhChartDepression.push(parseFloat(stat.depression));
        mhChartSchizophrenia.push(parseFloat(stat.schizophrenia)); 
        msg="";
        });
      }else{
        console.log("Error");
        msg = "Por favor primero cargue los datos de la API";
      }
    }
function loadzing() {
      zingchart.exec('visualization', 'setseriesvalues', {
      values: [
        mhChartPopulation,
        mhChartAnxdaly,
        mhChartEating,
        mhChartAdhd,
        mhChartBipolar,
        mhChartDepression,
        mhChartSchizophrenia
      ]
    });

    // update labels after rendering data
    zingchart.exec('visualization', 'modify', {
      data: {
        scaleX: {
          labels: mhChartCountryDate
        }
      }
    });
// 1
// zingchart.label_click = (p) => {
 // zingchart.exec(p.id, 'reload');
// };

// 1
zingchart.bind('visualization', 'label_click', (e) => {
  zingchart.exec(e.id, 'reload');
  //loadChart();
});

let chartConfig = {
  type: 'mixed',
  backgroundColor: '#f4f4f4',
  title: {
    text: 'Gold from 1975 to 2019',
    backgroundColor: 'none',
    color: '#818181',
    fontFamily: 'Roboto',
    fontSize: '16px',
    height: '40px'
  },
  subtitle: {
    text: 'More than 30,000 data points',
    paddingTop: '20px',
    color: '#818181',
    fontFamily: 'Roboto',
    fontSize: '11px'
  },
  legend: {
    visible: false
  },
  plot: {
    lineColor: '#00baf0',
    lineWidth: '1px',
    marker: {
      backgroundColor: '#fbfbfb',
      borderColor: '#00baf0',
      borderWidth: '2px',
      shadow: false,
      size: '3px'
    },
    maxTrackers: 0,
    mode: 'fast',
    shadow: false
  },
  plotarea: {
    marginTop: '45px',
    marginRight: '55px',
    marginBottom: '65px',
    marginLeft: '60px',
    backgroundColor: '#fbfbfb'
  },
  scaleX: {
    guide: {
      lineColor: '#c7c9c9',
      lineStyle: 'solid'
    },
    item: {
      paddingTop: '5px',
      fontColor: '#818181',
      fontSize: '10px'
    },
    label: {
      visible: false
    },
    labels: [],
    lineColor: '#c7c9c9',
    lineWidth: '1px',
    maxItems: 7,
    maxLabels: 7,
    mirrored: true,
    tick: {
      lineColor: '#c7c9c9',
      lineWidth: '1px'
    },
    zooming: true
  },
  scaleY: {
    values: '0:2000:500',
    decimals: 0,
    format: '$%v',
    guide: {
      lineColor: '#c7c9c9',
      lineStyle: 'solid'
    },
    item: {
      paddingRight: '5px',
      fontColor: '#818181',
      fontSize: '10px'
    },
    lineColor: '#c7c9c9',
    lineWidth: '1px',
    refLine: {
      alpha: 0.25,
      lineColor: '#c7c9c9',
      visible: true
    },
    shadow: false,
    tick: {
      lineColor: '#c7c9c9',
      lineWidth: '1px'
    }
  },
  scaleY2: {
    values: '0:1000000:500000',
    decimals: 0,
    guide: {
      visible: false
    },
    item: {
      paddingRight: '5px',
      fontColor: '#818181',
      fontSize: '10px',
      offsetX: '2px'
    },
    lineColor: '#c7c9c9',
    lineWidth: '1px',
    multiplier: true,
    offsetX: '2px',
    shadow: false,
    tick: {
      lineColor: '#c7c9c9',
      lineWidth: '1px',
      offsetX: '2px'
    }
  },
  crosshairX: {
    plotLabel: {
      text: '%t was %v<br>on %kl',
      padding: '8px',
      borderRadius: '5px'
    }
  },
  labels: [
    {
      id: 'reload_btn',
      text: 'Reload',
      padding: '5px',
      backgroundColor: '#fff',
      borderColor: '#777',
      borderRadius: '5px',
      borderWidth: '1px',
      cursor: 'hand',
      fontColor: '#777',
      x: '60px',
      y: '10px'
    }
  ],
  source: {
    text: 'Source: COMEX Gold Futures via Quandl',
    fontColor: '#818181',
    fontFamily: 'Roboto',
    fontSize: '9px'
  },
  scrollX: {
    bar: {
      backgroundColor: '#fff'
    },
    handle: {
      alpha: 0.7,
      backgroundColor: '#ccc',
      borderWidth: '0px',
      height: '5px'
    }
  },
  gui: {
    behaviors: [
      {
        id: 'SaveAsImage',
        enabled: 'none'
      },
      {
        id: 'Print',
        enabled: 'none'
      },
      {
        id: 'BugReport',
        enabled: 'none'
      },
      {
        id: 'FullScreen',
        enabled: 'none'
      },
      {
        id: 'ZoomIn',
        enabled: 'none'
      },
      {
        id: 'ZoomOut',
        enabled: 'none'
      },
      {
        id: 'LogScale',
        enabled: 'none'
      },
      {
        id: 'DownloadPDF',
        enabled: 'none'
      },
      {
        id: '3D',
        enabled: 'none'
      },
      {
        id: 'HideGuide',
        enabled: 'none'
      }
    ],
    contextMenu: {
      button: {
        visible: false
      },
      gear: {
        visible: false
      }
    }
  },
  noData: {
    text: 'Mining gold data from servers...'
  },
  series: [
    {
      type: 'area',
      text: 'Price',
      values: [],
      backgroundColor: '#00baf0 #fbfbfb',
      decimals: 2
    },
    {
      type: 'bar',
      text: 'Volume',
      values: [],
      backgroundColor: '#003849',
      scales: 'scale-x,scale-y-2'
    }
  ]
};

// 2
/*zingchart.render({
  id: 'myChart',
  data: chartConfig,
  hideprogresslogo: true
});*/

zingchart.ASYNC = true;

// 3
zingchart.render({
  id: 'visualization',
  data: chartConfig,
  height: '100%',
  width: '100%'
});
loadzing()
}
</script>
  <svelte:head>
    <script on:load={loadChart} src="https://cdn.zingchart.com/zingchart.min.js"></script>
  </svelte:head>
  <main>
    <Nav>
      <NavItem>
        <NavLink href="/#/info">Página Principal</NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="#/mh-stats">Datos</NavLink>
      </NavItem>
    </Nav>
  
    <div>
      <h2>
        Gráfica
      </h2>
    </div>

    <div id="visualization"></div>
  </main>
  <style>
  </style>