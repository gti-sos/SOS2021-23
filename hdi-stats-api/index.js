var BASE_API_PATH_MEM="/api/v1/hdi-stats";
var path = require("path");
const fs = require('fs');
var datafile = path.join(__dirname, 'hdi-stats-db')
var DataStore = require('nedb');
var db = new DataStore({ filename: datafile, autoload: true});


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

module.exports.register = (app) => {
    var hdi_countries = [];

    // Methods involving base path
    app.get(BASE_API_PATH_MEM+"/loadInitialData", (request, response) =>{
		if (hdi_countries.length == 0) {
            try {
            let rawdata = fs.readFileSync('./hdi-stats-api/hdi-stats.json');
            hdi_countries = JSON.parse(rawdata);
            db.insert(hdi_countries);
            } catch {
                console.log('Error parsing .json file');
        }
            console.log('[!] hdi-stats.json loaded onto hdi_countries');
            console.log(JSON.stringify(hdi_countries, null));
            response.status(200).send("<h3>Successfuly loaded "+ hdi_countries.length + " resources</h3><p>You can head now to /api/v1/hdi-stats to check newly created resources</p>")
        } else {
            console.log('[!] GET request to /loadInitialData but resources are already loaded.');
            response.status(400).send("<h1>Resources already loaded. Head back to /api/v1/hdi-stats to check them.</h1>")
        }
    });

    app.get(BASE_API_PATH_MEM, (req, res) =>{
		var offset;
        var limit;

        var search = {};
        if (req.query.country) {search["country"] = req.query.country}
        if (req.query.year) {search["year"] = req.query.year}
        if (req.query.hdirank) {search["hdirank"] = req.query.hdirank}
        if (req.query.hdivalue) {search["hdivalue"] = req.query.hdivalue}
        if (req.query.hdischolar) {search["hdischolar"] = req.query.hdischolar}
        if (db.count({}) == 0) {
            console.log('[!] Resource hdi_countries has been requested, but are not loaded.');
            return res.status(404).send("<p>Resources not found. Head to /loadInitialData to create them.</p>");
        } else {
            var offset;
            var limit;
            if (req.query.offset) {
                offset = parseInt(req.query.offset);
                console.log("[INFO] OFFSET: " + offset);
                delete req.query.offset;
            }
            if (req.query.limit) {
                limit = parseInt(req.query.limit);
                console.log("[INFO] LIMIT: " + limit);
                delete req.query.limit;
            }
            db.find(search).skip(offset).limit(limit).exec((err, dbdata) => {
                if (err) {
                    console.log("[!] Error accessing hdi-stats.db " + err);
                    return res.status(500).send("<h1>Error accessing database</h1>");
                } else {
                    if (dbdata == 0) {
                        console.log("[!] Database hdi-stats is EMPTY!");
                        return res.status(404).send("<h1>Resources not found. Head to /loadInitialData to create them.</h1>");
                    } else {
                        dbdata.forEach((data) =>{ delete data._id});
                        return res.status(200).send(JSON.stringify(dbdata,null, 2));
                    }
                }
            })
        }
    });
        

 app.post(BASE_API_PATH_MEM, (req, res) => {
    var newData = req.body;
    var country = req.body.country;
    var year = req.body.year; //lo tenemos pasado como string el valor, sino deberíamos usar un parseInt
    db.find({$and: [{country: newData.country}, {year: newData.year}]},

        (err, resources) =>{
            if(resources.length !=0){
                console.log("El recurso ya existe");
                res.sendStatus(409);
            }else if(!newData.country || !newData.year ||!newData.hdirank ||!newData.hdivalue || !newData.hdischolar ||Object.keys(newData).length != 5){
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

    app.put(BASE_API_PATH_MEM, (request, response) => {
        console.log("[!] Method (PUT) not allowed at " + BASE_API_PATH_MEM);
        response.status(405).send('<p>405: Method not allowed</p>');
    });
    
    app.delete(BASE_API_PATH_MEM, (request, response) => {
        var hascontent;
        db.count({}, function (err, count) {
            if (err) {
                console.log("[!] Error accessing DB, " + err);
            } else {
                hascontent = count;
            }
          });
        console.log("[-] Full deletion has been requested. Proceeding.");
        if (hascontent == 0) {
            response.status(400).send("<p>400: No resources found. Can't delete any.</p>");
        } else {
            hdi_countries.length = 0;
            db.remove({}, { multi: true }, function (err, numRemoved) {
                if (err) {
                    console.log("[!] Error deleting all resources");
                } else {
                    console.log(numRemoved);
                    if (numRemoved != 0) return response.status(200).send("<p>200: All resources deleted.</p>");
                    else return response.status(500).send("<p>Error</p>");
                }
            });

        }
    });

     // Methods involving path+object_fields
     app.get(BASE_API_PATH_MEM + "/:country/:year", (req, res) => {
        var req_data = req.params; 
        let limit;
        let offset;
        if (req.query.offset) {
            offset = parseInt(req.query.offset);
            delete req.query.offset;
        } 
        if (req.query.limit) {
            limit = parseInt(req.query.limit);
            delete req.query.limit;
            console.log(limit);
        }
        console.log(offset);
        console.log(limit);
        db.find({country: req.params.country, year: req.params.year}).skip(offset).limit(limit).exec((err, dataInDB) => {
            if (err) {
                console.error("[!] ERROR accesing DB " + err);
                res.sendStatus(500);
            } else {
                if (dataInDB == 0) {
                    console.error("[!] No DATA found");
                    res.status(404).send("<h1>Resource not found</h1>");
                } else {
                    dataInDB.forEach((data) =>{delete data._id});
                    res.status(200).send(JSON.stringify(dataInDB[0], null, 2)); 
                    console.log(`GET stat by country: <${req_data.country}> and date: <${req_data.year}>`);
                }
            }
        });
    });

     // Get a un recurso concreto
     app.get(BASE_API_PATH_MEM + "/:country", (req, res) => {
        var countryToGet = req.params.country;
		
		
		
		db.find({country: countryToGet}, function(err, hdiInDB){
		console.log("Searching "+countryToGet);
			if(err) {
				console.error(err);
				res.sendStatus(404);
			}
			if(hdiInDB.length==0){
				console.log("Resource not found: "+countryToGet);
				res.sendStatus(404); // NOT FOUND
			}else{
				console.log(hdiInDB);
				var hdiToSend = hdiInDB.map((c)=>{
					return {country : c.country, year : c.year, hdirankc : c.hdirankc, hdivaluec : c.hdivaluec, hdischolarc : c.hdischolarc};
				});
				res.send(JSON.stringify(hdiToSend[0],null,2));
			}
			
		})
	});

     // Methods involving path+object_fields
     app.get(BASE_API_PATH_MEM + "/:year", (req, res) => {
       
		var yearToGet = req.params.year;
		
		
		db.find({year: yearToGet}, function(err, hdiInDB){
		console.log("Searching "+yearToGet);
			if(err) {
				console.error(err);
				res.sendStatus(404);
			}
			if(hdiInDB.length==0){
				console.log("Resource not found: "+yearToGet);
				res.sendStatus(404); // NOT FOUND
			}else{
				console.log(hdiInDB);
				var hdiToSend = hdiInDB.map((c)=>{
					return {country : c.country, year : c.year, hdirankc : c.hdirankc, hdivaluec : c.hdivaluec, hdischolarc : c.hdischolarc};
				});
				res.send(JSON.stringify(hdiToSend[0],null,2));
			}
			
		})
	});

    app.delete(BASE_API_PATH_MEM + "/:country/:year", (req, res) => {
        var country = req.params.country;
        var year = req.params.year;
        db.remove({ country: country, year: year });
        res.status(200).send("<h1> Resource deleted " + country + "/" + year + "has been deleted");
    });

    app.post(BASE_API_PATH_MEM + "/:country", (req, res) => {
        res.status(405).send("<h1> Method not allowed</h1>");
    });

    app.post(BASE_API_PATH_MEM + "/:country/:year", (req, res) => {
        res.status(405).send("<h1> Method not allowed</h1>");
    });

    app.put(BASE_API_PATH_MEM + "/:country/:year", (req, res) => {
        var country = req.params.country;
		var year = req.params.year;
		var updatedhdi = req.body;
		var query = {"country":country, "year":year};
	
		if (!updatedhdi.country 
			|| !updatedhdi.year 
			|| !updatedhdi['hdirank'] 
			|| !updatedhdi['hdivalue'] 
			|| !updatedhdi['hdischolar'] 
			|| country != updatedhdi.country 
			|| year != updatedhdi.year
			|| Object.keys(updatedhdi).length != 5){
           
			console.log("Missing any field");
			return res.sendStatus(400);
		} 
		else {
			db.update(query,updatedhdi,(err,data) =>{
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
}