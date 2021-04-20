var BASE_API_PATH_ACE="/api/v1/unemployment-stats";
const fs = require('fs');
var path = require('path');
var Datastore = require("nedb");
var dbFile = path.join(__dirname, 'unemployment-stats.db');
var db = new Datastore({filename: dbFile,autoload:true});

function isAO(val) {
    return val instanceof Array || val instanceof Object ? true : false;
}

function elementExists(obj, obj_t) {
	for (var i = 0; i < obj.length; i++) {
		if (obj[i] == obj_t) {
			return true;
		} else {
			false;
		}
	}
}
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
    }
];


 module.exports.register = (app) => {
    //carga inicial de datos
	app.get(BASE_API_PATH_ACE  + "/loadInitialData", (req, res) => {
		db.insert(unemployment_stats);
		console.log(`Initial data: <${JSON.stringify(unemployment_stats, null, 2)}>`);
		res.sendStatus(200);
	});

    //GET a la lista de recursos
    app.get(BASE_API_PATH_ACE , (req, res) => {
		var limit = parseInt(req.query.limit);
		var offset = parseInt(req.query.offset);
		var search = {};
	
		if(req.query.country) 
			search["country"] = req.query.country;
		if(req.query.year) 
			search["year"] = parseInt(req.query.year);
		if(req.query.knoperc) 
			search["knoperc"] = req.query.knoperc;
		if(req.query.dudead) 
			search["intperc"] = req.query.intperc;
		if(req.query.dudependenceperc) 
			search["gfperc"] = req.query.gfperc;
	
		db.find(search).skip(offset).limit(limit).exec((err,data)=>{
			if(err){
				console.error("ERROR accessing DB in GET");
				res.sendStatus(500);
			}else {
				if (data.length != 0){
					data.forEach((a)=>{delete a._id; }); 
					console.log(search)
					return res.send(JSON.stringify(data,null,2));
					return res.sendStatus(200);
				} else {
					console.log(search)
					console.log("No data found");
					return res.sendStatus(404);
				}
	
	
			}
		});
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
				res.send(JSON.stringify(employsToSend,null,2));
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