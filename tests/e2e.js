const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    console.log("Browser opened.");

    const page = await browser.newPage();
    await page.goto('https://sos2021-23.herokuapp.com/');
 
    console.log("Page opened! Taking an screenshot...");

    await page.screenshot({ path: './tests/pics/01preapi.png' ,fullpage: true});

    console.log("foto preapi hecha");

    await page.click("#botoninfo");
      
    console.log("clickado boton info");

    await page.screenshot({ path: './tests/pics/02btninfo.png',fullpage: true });
      
    await page.waitForTimeout(1000);  

    console.log("foto info");

    await page.click("#analyticsbtn");

    await page.waitForTimeout(3000); 

    await page.waitForTimeout(3000); 

    await page.screenshot({ path: './tests/pics/03analysis.png',fullpage: true });
    
    console.log("clickado boton analysis");
      
    await page.waitForTimeout(10000);  

    console.log("foto analysis");
    
    await page.click("body > a");
    
    await page.screenshot({ path: './tests/pics/04vueltainfo.png' ,fullpage: true});

    console.log("ahora vuelta a info");
      
    await page.waitForTimeout(1000);  

    console.log("vuelta info"); 

    await page.click("#integrationsbtn");

    await page.screenshot({ path: './tests/pics/05integrationsbtn.png',fullpage: true });
    
    console.log("clickado boton integrationstbn");
      
    await page.waitForTimeout(1000);  

    console.log("foto integrations");

    await page.click("body > div > ul:nth-child(7) > li > a");

    await page.waitForTimeout(5000);

    await page.screenshot({ path: './tests/pics/06integrationsG2.png' ,fullpage: true});
    
    console.log("clickado boton integración grupo 2");
      
    await page.waitForTimeout(1000);  
    
    await page.click("body > main > main > button");

    await page.screenshot({ path: './tests/pics/07vueltaintegrations.png',fullpage: true });

    console.log("ahora vuelta a integrations");

    await page.click("body > div > ul:nth-child(13) > li > a");

    await page.waitForTimeout(3000);  

    await page.screenshot({ path: './tests/pics/08unemploymentchartHighchart.png',fullpage: true });

    await page.waitForTimeout(1000);  

    console.log("mi gráfica highchart");

    await page.click("body > main > main > ul > li:nth-child(2) > a");

    await page.waitForTimeout(5000); 

    await page.waitForTimeout(5000); 

    await page.screenshot({ path: './tests/pics/09vueltainfohighchart.png',fullpage: true });

    await page.waitForTimeout(1000);  

    console.log("vuelta integration");
    
    await page.click("body > div > div > button");

    await page.screenshot({ path: './tests/pics/10vueltainfo.png',fullpage: true });

    console.log("vuelta a info");

    await page.click("#aboutbtn");  

    await page.screenshot({ path: './tests/pics/11aboutbtn.png',fullpage: true });
    
    console.log("clickado boton aboutbtn");

    console.log("foto about");

    await page.click("body > div > div > button");

    await page.screenshot({ path: './tests/pics/12vueltainfo.png' ,fullpage: true});

    console.log("ahora vuelta a info");

    await page.click("body > main > main > div:nth-child(11) > div:nth-child(3) > div > div.card-body > a:nth-child(5) > button"); 

    console.log("boton frontend");

    await page.waitForTimeout(5000);

    await page.screenshot({ path: './tests/pics/13botonfrontend.png' ,fullpage: true});

    console.log("foto frontend hecha");

    await page.click("#deletebtn");
    
    console.log("borramos el primer elemento");

    await page.waitForTimeout(2000); 

    await page.screenshot({ path: './tests/pics/14deletedresource.png' ,fullpage: true});

    await page.click("body > main > main > div.alert.alert-warning.alert-dismissible > button");

    /*
    await page.$eval("#insertpais", el=> el.value ='Euskadi');

    await page.$eval("#insertaño", el=> el.value ='2019');

    await page.$eval("#insertknoperc", el=> el.value ='1');

    await page.$eval("#insertintperc", el=> el.value ='1');

    await page.$eval("#insertgfperc", el=> el.value ='1');

    */

    console.log("valor añadido en campo Insert:pais");

    await page.focus("#insertpais");

    await page.keyboard.type("Norway");

    console.log("valor añadido en campo Insert:año");

    await page.focus("#insertaño");
    
    await page.keyboard.type("2020");

    console.log("valor añadido en campo Insert:knoperc");

    await page.focus("#insertknoperc");
    
    await page.keyboard.type("1");

    console.log("valor añadido en campo Insert:intperc");

    await page.focus("#insertintperc");
    
    await page.keyboard.type("1");

    console.log("valor añadido en campo Insert:gfperc");

    await page.focus("#insertgfperc");
    
    await page.keyboard.type("1");

    await page.click("#insertbtn");

    console.log("botón pulsado");

    await page.waitForTimeout(2000); 
    
    await page.screenshot({ path: './tests/pics/15valueinsertadded.png',fullpage: true });

    console.log("captura valor añadido campo búsqueda país");

    await page.click("#infobtn");

    console.log("vuelta a info");
    
    await page.waitForTimeout(2000);  

    await page.screenshot({ path: './tests/pics/16finalinfo.png',fullpage: true });



    /*
    console.log("pulsar insertar");

    await page.waitForTimeout(5000); 

    console.log("captura insertar");

    await page.screenshot({ path: './tests/pics/16insertbtnclicked.png',fullpage: true });

    await page.click("body > main > main > button:nth-child(4)");

    await page.click("body > main > main > button:nth-child(3)");

    await page.waitForTimeout(2000); 

    await page.screenshot({ path: './tests/pics/17dataAdded.png',fullpage: true });

    console.log("foto valor añadido");

    */


    
    /*
    await page.$eval("body > main > main > div:nth-child(6) > table > tr:nth-child(1) > td:nth-child(1) > strong > label > input", el=> el.value ='Canada');
    
    await page.waitForTimeout(1000); 

    await page.screenshot({ path: './tests/pics/11botonfrontend.png' });

    await page.click("body > main > main > div:nth-child(7) > button");

    await page.waitForTimeout(5000); 

    await page.screenshot({ path: './tests/pics/12resourcefound.png' });

    await page.waitForTimeout(5000); 

    await page.screenshot({ path: './tests/pics/13resourcereallyfound.png' });

    */

    //console.log('a borrar un elemento');

    //await page.click('body > main > main > div:nth-child(10) > table > tbody > tr:nth-child(2) > td:nth-child(6) > button');

    //await page.waitForTimeout(5000); 

    //await page.screenshot({ path: './tests/pics/14resourcedeleted.png' });

    //console.log('elemento borrado');

    /*
    await page.$eval("#insertaño", el=> el.value ='Euskadi');

    await page.$eval("#insertpais", el=> el.value ='2019');

    await page.$eval("#insertknoperc", el=> el.value ='1');

    await page.$eval("#insertintperc", el=> el.value ='1');

    await page.$eval("#insertgfperc", el=> el.value ='1');

    console.log("valor añadido en campo Insert:pais");

    await page.screenshot({ path: './tests/pics/15valueinsertadded.png' });

    console.log("captura valor añadido campo búsqueda país");

    console.log("si sale este mensaje y no aparece otro es que se ha quedado pillao en el #insertbn");

    await page.waitForTimeout(5000); 

    await page.click("body > main > main > div:nth-child(10) > table > tbody > tr:nth-child(1) > td:nth-child(6) > button");

    await page.waitForTimeout(5000); 

    console.log("pulsar insertar");

    await page.waitForTimeout(5000); 

    console.log("captura insertar");

    await page.waitForTimeout(5000); 

    await page.screenshot({ path: './tests/pics/16insertbtnclicked.png' });

    */

    /*
    console.log("insertamos país a buscar");
    
    await page.waitForTimeout(5000); 
    
    await page.$eval("#filterpais",el=> el.value ='Canada');

    await page.waitForTimeout(5000); 

    await page.screenshot({ path: './tests/pics/16insertvaluetofilter.png' });

    console.log("va a pulsar el botón buscar");
    

    await page.click("body > main > main > div:nth-child(8) > button");

    await page.waitForTimeout(5000); 

    console.log("ojalá ver este mensaje porque habrá encontrao el pais ");

    await page.screenshot({ path: './tests/pics/17lafotobuscada.png' });
    
    */

    //DRUG USE

    //ENTRA EN LA INTERFAZ 

    console.log("Clicked on Interfaz")
    await page.click("body > main > main > div:nth-child(11) > div:nth-child(1) > div > div.card-body > a:nth-child(4) > button");
    await page.waitForTimeout(3000); 
    await page.waitForTimeout(3000); 
    await page.screenshot({ path: './tests/pics/17du-statstable.png' });

    //CARGA TODOS LOS DATOS

    console.log("Load all school data");
    await page.click("body > main > main > button.btn.btn-success");
    await page.waitForTimeout(3000); 
    await page.waitForTimeout(3000); 
    await page.screenshot({ path: './tests/pics/18du-statsload.png' });


    //BORRAR UN ELEMENTO

    console.log("Delete element");
    await page.click("body > main > main > div.table-responsive > table > tbody > tr:nth-child(3) > td:nth-child(7) > button");
    await page.waitForTimeout(3000); 
    await page.waitForTimeout(3000); 
    await page.screenshot({ path: './tests/pics/19du-statsdelete.png' });

    //BUSCAR DATO

    console.log("Introduciendo dato");
    await page.click("body > main > main > div.table-responsive > table > tbody > tr:nth-child(2) > td:nth-child(1) > input[type=text]");
    await page.keyboard.type("Italy");
    await page.screenshot({ path: './tests/pics/20searchingItaly.png' });
    
    console.log("Buscando dato")
    await page.click("body > main > main > div.table-responsive > table > tbody > tr:nth-child(2) > td:nth-child(7) > button");
    await page.waitForTimeout(3000); 
    await page.screenshot({ path: './tests/pics/21busqueda.png' });


    //VUELTA A INFO
    console.log("Back to info");

    await page.goto('http://localhost:11337/');
    await page.screenshot({ path: './tests/pics/22info.png' });

    // PAGINA PRINCIPAL 
    console.log("Vamos para la pagina principal")
    await page.click("#botoninfo");
    await page.waitForTimeout(3000); 
    await page.screenshot({ path: './tests/pics/23paginaprincipal.png' });

    // PAGINA PRINCIPAL 
    console.log("Hacemos click en integraciones")
    await page.click("#integrationsbtn");
    await page.waitForTimeout(3000); 
    await page.screenshot({ path: './tests/pics/24integraciones.png' });

    // GRAFICA HIGHCHART
    console.log("Veamos alguna")
    await page.click("body > div > ul:nth-child(21) > li > a");
    await page.waitForTimeout(3000); 
    await page.screenshot({ path: './tests/pics/25grafica.png' });
    console.log("Ahi está")

    //VOLVEMOS A INICIO
    console.log("Volviendo a inicio")
    await page.click("body > main > main > ul > li:nth-child(1) > a");
    await page.waitForTimeout(3000); 
    await page.screenshot({ path: './tests/pics/26vueltainicio.png' });


    //INSERTAR MÁS A PARTIR DE AQUÍ




















    
    await browser.close();

    console.log("Browser closed!");

})();