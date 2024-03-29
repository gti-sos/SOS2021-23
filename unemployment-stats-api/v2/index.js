var BASE_API_PATH_ACE="/api/v2/unemployment-stats";
var path = require('path');
var Datastore = require("nedb");
var dbFile = path.join(__dirname, 'unemployment-stats.db');
var db = new Datastore({filename: dbFile,autoload:true});


var unemployment_stats = [
  {
    "country": "Canada",
    "year": "2020",
    "knoperc": "5.4",
    "intperc": "5.6",
    "gfperc": "9.7"
  },
  {
    "country": "United States",
    "year": "2020",
    "knoperc": "3.9",
    "intperc": "4.4",
    "gfperc": "8.8"
  },
  {
    "country": "United Kingdom",
    "year": "2020",
    "knoperc": "4.1",
    "intperc": "3.9",
    "gfperc": "5.3"
  },
  {
    "country": "Germany",
    "year": "2020",
    "knoperc": "3",
    "intperc": "3.2",
    "gfperc": "4.2"
  },
  {
    "country": "Japan",
    "year": "2020",
    "knoperc": "2.3",
    "intperc": "2.4",
    "gfperc": "3.3"
  },
  {
    "country": "Spain",
    "year": "2020",
    "knoperc": "13",
    "intperc": "13.6",
    "gfperc": "16.8"
  },
  {
    "country": "Brazil",
    "year": "2020",
    "knoperc": "12",
    "intperc": "11.6",
    "gfperc": "13.3"
  },
  {
    "country": "Argentine",
    "year": "2019",
    "knoperc": "23",
    "intperc": "10.6",
    "gfperc": "33.3"
  },
  {
    "country": "South Africa",
    "year": "2019",
    "knoperc": "22",
    "intperc": "21.8",
    "gfperc": "23.6"
  },
  {
    "country": "Netherlands",
    "year": "2018",
    "knoperc": "14.5",
    "intperc": "9.6",
    "gfperc": "7.4"
  },
  {
    "country": "Israel",
    "year": "2017",
    "knoperc": "1.9",
    "intperc": "6.4",
    "gfperc": "3.3"
  }


];


 module.exports.register = (app) => {
    //carga inicial de datos
	app.get(BASE_API_PATH_ACE  + "/loadInitialData", (req, res) => {
    db.remove({}, {multi: true});
    db.insert(unemployment_stats);
    console.log(`Initial data: <${JSON.stringify(unemployment_stats, null, 2)}>`);
    res.sendStatus(200);
	});

    //GET a la lista de recursos
    app.get(BASE_API_PATH_ACE, (request, response) =>{        
        var offset= parseInt(request.query.offset);
        var limit=parseInt(request.query.limit);
        var search = {};

        if (request.query.country) {search["country"] = request.query.country}
        if (request.query.year) {
          search['year'] = (request.query.year);
        }else if(request.query.from || request.query.to) {
          search['year'] = { $gte:(request.query.from), $lte:(request.query.to) };
        }
        if (request.query.knoperc) {search["knoperc"] = request.query.knoperc}
        if (request.query.intperc) {search["intperc"] = request.query.intperc}
        if (request.query.gfperc) {search["gfperc"] = request.query.gfperc}
        if (db.count({}) == 0) {
            console.log('[!] Se ha hecho una petición a los recursos pero no han sido cargados.');
            return response.status(404).send("<p>No se han cargado los recursos. Para ello añade en la dirección /loadInitialData</p>");
        } else {
            db.find(search).skip(offset).limit(limit).exec((err, dbdata) => {
                if (err) {
                    console.log("[!] Error al acceder a unemployment-stats.db " + err);
                    return response.status(500).send("<h1>Error al acceder a la base de datos</h1>");
                } else {
                    if (dbdata == 0) {
                        console.log("[!] La base de datos está vacia");
                        return response.status(404).send("<h1>No se han cargado los recursos. Para ello añade en la dirección /loadInitialData</h1>");
                    } else {
                        dbdata.forEach((data) =>{ delete data._id});
                        return response.status(200).send(dbdata,null, 2);
                    }
                }
            })
        }
    });

    //POST a la lista de recursos
    app.post(BASE_API_PATH_ACE, (req, res) => {
		var newData = req.body;
        var country = req.body.country;
        var year = req.body.year; //lo tenemos pasado como string el valor, sino deberíamos usar un parseInt
        db.find({$and: [{country: newData.country}, {year: newData.year}]},

            (err, resources) =>{
                if(resources.length !=0){
                    console.log("El recurso ya existe");
                    res.sendStatus(409);
                }else if(!newData.country || !newData.year ||!newData.knoperc ||!newData.intperc || !newData.gfperc ||Object.keys(newData).length != 5){
                        console.log("El número de campos no es el correcto");
                        res.sendStatus(400);
                }else{
                    console.log(`new resource <${newData.country}/${newData.year}> added`)
                    db.insert(newData);
                    res.status(201).json(newData);
                }

            }
        );
    });
	

    //GET a un recurso -- CODIGO NUEVO
    app.get(BASE_API_PATH_ACE + "/:country/:year", (req, res) => {
		var countryToGet = req.params.country;
		var yearToGet = req.params.year;
		
		
		db.find({country: countryToGet, year: yearToGet}, function(err, employsInDB){
		console.log("Searching "+countryToGet+" "+yearToGet);
			if(err) {
				console.error(err);
				res.sendStatus(404);
			}
			if(employsInDB.length==0){
				console.log("Resource not found: "+countryToGet+" "+yearToGet);
				res.sendStatus(404); // NOT FOUND
			}else{
				console.log(employsInDB);
				var employsToSend = employsInDB.map((c)=>{
					return {country : c.country, year : c.year, knoperc : c.knoperc, intperc : c.intperc, gfperc : c.gfperc};
				});
				res.send(JSON.stringify(employsToSend[0],null,2));
			}
			
		})
	});

    //DELETE a un recurso -- POSIBLE CODIGO NUEVO (probar cuando haga el post nuevo)
    app.delete(BASE_API_PATH_ACE + "/:country/:year", (req,res) => {

			
			var countryToDelete = req.params.country;
			var yearToDelete = req.params.year;
			
			db.remove({country: countryToDelete, year: yearToDelete},{},(err, data)=>{
				if(err){
					console.error("ERROR deleting the resource in DELETE: "+err);
					res.sendStatus(500);
				}else{
					if(data==0){
						console.log("No data found to delete");
						res.sendStatus(404); // NOT FOUND
					}else{
						res.sendStatus(200); // OK
					}
				}
			})
			
	
		});

    //PUT a un recurso
	app.put(BASE_API_PATH_ACE + "/:country/:year", (req, res) => {
	
		var country = req.params.country;
		var year = req.params.year;
		var updatedEmploy = req.body;
		var query = {"country":country, "year":year};
	
		if (!updatedEmploy.country 
			|| !updatedEmploy.year 
			|| !updatedEmploy['knoperc'] 
			|| !updatedEmploy['intperc'] 
			|| !updatedEmploy['gfperc'] 
			|| country != updatedEmploy.country 
			|| year != updatedEmploy.year
			|| Object.keys(updatedEmploy).length != 5){
	
			console.log("Missing any field");
			return res.sendStatus(400);
		} 
		else {
			db.update(query,updatedEmploy,(err,data) =>{
				if(err){
					console.error("ERROR accesing DB in PUT");
					res.sendStatus(500);
				}
				else{
					if(data == 0){
						res.sendStatus(404);
						console.log("No data in the database");
					}
					else{
						res.sendStatus(200);
						console.log("Resource updated");
					}
				}
			});
		}
	});
		
	


    //POST a un recurso
    app.post(BASE_API_PATH_ACE + "/:country/:year", (req,res) => {
    	console.log ("Unable to POST to a specific resource");
    	return res.sendStatus(405);
    });
    //PUT a una lista de recursos
    app.put(BASE_API_PATH_ACE, (req,res) => {
    	console.log("Unable to PUT to a list of resources");
    	return res.sendStatus(405);
    });

      //DELETE a una lista de recursos -- EL CODIGO NUEVO ES EL COMENTADO
    app.delete(BASE_API_PATH_ACE, (req,res) => {
	  db.remove({},{multi: true},(err, numEmploysRemoved)=>{
		  if(err){
			  console.error("ERROR deleting DB evictions: "+err);
			  res.sendStatus(500);
		  }else{
			  if(numEmploysRemoved==0){
				  res.sendStatus(404);
			  }else{
				  console.log("Resources deleted");
				  res.sendStatus(200);
			  }
		  }
	  })
    });
}