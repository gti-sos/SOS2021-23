var BASE_API_PATH_EDU="/api/v1/mh-stats";
<<<<<<< HEAD
var path = require("path");
const fs = require('fs');
var datafile = path.join(__dirname, 'mh-stats-db')
var DataStore = require('nedb');
var db = new DataStore({ filename: datafile, autoload: true});

=======
const fs = require('fs');
>>>>>>> 10ed1809fb9190dda11b0f30f1bc22c5c77ef865

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
    var mh_countries = [];
<<<<<<< HEAD

    // Methods involving base path
=======
>>>>>>> 10ed1809fb9190dda11b0f30f1bc22c5c77ef865
    app.get(BASE_API_PATH_EDU+"/loadInitialData", (request, response) =>{
        if (mh_countries.length == 0) {
            try {
            let rawdata = fs.readFileSync('./mh-stats-api/mh-stats.json');
            mh_countries = JSON.parse(rawdata);
<<<<<<< HEAD
            db.insert(mh_countries);
=======
>>>>>>> 10ed1809fb9190dda11b0f30f1bc22c5c77ef865
            } catch {
                console.log('Error parsing .json file');
        }
            console.log('[!] mh-stats.json loaded onto mh_countries');
            console.log(JSON.stringify(mh_countries, null));
            response.status(200).send("<h3>Successfuly loaded "+ mh_countries.length + " resources</h3><p>You can head now to /api/v1/mh-stats to check newly created resources</p>")
        } else {
            console.log('[!] GET request to /loadInitialData but resources are already loaded.');
            response.status(400).send("<h1>Resources already loaded. Head back to /api/v1/mh-stats to check them.</h1>")
        }
    });
<<<<<<< HEAD

    app.get(BASE_API_PATH_EDU, (request, response) =>{
        var offset;
        var limit;
        if (request.query.offset) {
            console.log("[INFO] OFFSET: " + offset);
            offset = parseInt(request.query.offset);
            delete request.query.offset;
        } else {
            console.log("[INFO] OFFSET:  not found");
        }
        if (request.query.limit) {
            console.log("[INFO] LIMIT: " + limit);
            limit = parseInt(request.query.limit);
            delete request.query.limit;
        } else {
            console.log("[INFO] LIMIT: not found");
        }
        var search = {};
        /*if (request.query.country) {search["country"] = req.query.country}
        if (request.query.year) {search["year"] = parseInt(req.query.year)}
        if (request.query.mh-population) {search["mh-population"] = parseInt(req.query.mh-population)}
        if (request.query.mh-anxdaly) {search["mh-anxdaly"] = parseInt(req.query.mh-anxdaly)}
        if (request.query.mh-eating) {search["mh-eating"] = parseInt(req.query.mh-eating)}
        if (request.query.mh-adhd) {search["mh-adhd"] = parseInt(req.query.mh-adhd)}
        if (request.query.mh-bipolar) {search["mh-bipolar"] = parseInt(req.query.mh-bipolar)}
        if (request.query.mh-depression) {search["mh-depression"] = parseInt(req.query.mh-depression)}
        if (request.query.mh-schizophrenia) {search["mh-schizophrenia"] = parseInt(req.query.mh-schizophrenia)}*/
        if (db.count({}) == 0) {
=======
    
    // 5.1 y 6.1
    app.get(BASE_API_PATH_EDU, (request, response) =>{
        if (mh_countries.length == 0) {
>>>>>>> 10ed1809fb9190dda11b0f30f1bc22c5c77ef865
            console.log('[!] Resource mh_countries has been requested, but are not loaded.');
            response.status(404).send("<p>Resources not found. Head to /loadInitialData to create them.</p>");
        } else {
            console.log('[!] Resource mh_countries has been requested');
<<<<<<< HEAD
            console.log("[INFO] OFFSET: " + offset);
            console.log("[INFO] LIMIT: " + limit);
            response.status(200).send(JSON.stringify(db.find(search).skip(offset).limit(limit).exec((err, dbdata) => {
                if (err) {
                    console.log("[!] Error accessing mh-stats.db " + err);
                    response.status(500).send("<h1>Error accessing database</h1>");
                } else {
                    if (dbdata == 0) {
                        console.log("[!] Database mh-stats is EMPTY!");
                        response.status(404).send("<h1>Resources not found.</h1>");
                    } else {
                        dbdata.forEach((data) =>{ delete data._id});
                        return dbdata;
                    }
                }
            }),null, 2));
        }
    });

 app.post(BASE_API_PATH_EDU, (req, res) => {
        var newData = req.body;
        db.find({country: newData.country, year: parseInt(newData.year)}, (err, dbdata) =>{
            if (err) {
                console.error("[!] Error accessing mh-stats.db "+ err);
                res.sendStatus(500);
            } else {
                if(dbdata == 0){  
                    if(!newData.country || !newData.year || !newData['mh-population'] || !newData['mh-anxdaly'] || !newData['mh-eating'] || !newData['mh-adhd'] || !newData['mh-bipolar']|| !newData['mh-depression'] || !newData['mh-schizophrenia']) {
                        console.log("[!] Data is missing or incorrect.");
                        return res.sendStatus(400);
                    }else {                        
                        console.log(`[+] New resource added to the database <${JSON.stringify(newData, null, 2)}>`);
                        db.insert(newData);
                        return res.sendStatus(201);
                    }
                }else {
                    console.log("[!] A resource already exists with the same country and date");
                    return res.sendStatus(409);
                }
            }
        });
    });

=======
            response.status(200).send(JSON.stringify(mh_countries,null, 2));
        }
    });
    
    app.post(BASE_API_PATH_EDU, (request, response) =>{
        var updateCountry = request.body;
        console.log(updateCountry.country);
            console.log(updateCountry.year);
        var oldCountry;
        var del_index;
        console.log(`[!] Received: <${JSON.stringify(updateCountry, null)}> checking for coincidences...`);
        for(var i=0; i<mh_countries.length; i++){
            if(mh_countries[i].country==updateCountry.country && mh_countries[i].year==updateCountry.year){
                oldCountry = mh_countries[i];
                del_index = i;
            }
        }
        if (oldCountry == null) {
            console.log("[!] POST with: \n-->" + JSON.stringify(updateCountry, null) + " :: Not found in array.");
            response.status(200).send("<p>Added resource.</p>");
            mh_countries.push(updateCountry);
        } else if (JSON.stringify(oldCountry, null) == JSON.stringify(updateCountry, null)) {
            console.log("[!] Someone has tried upload an existent resource: \n-->" + JSON.stringify(oldCountry, null));
            response.status(400).send("<p>Resource already exists.</p>");
        } else {
            console.log("[!] POST containing: \n-->" + JSON.stringify(updateCountry, null));
            response.status(400).send("<p>Error</p>");
        }
    });
    
    // 6.7
>>>>>>> 10ed1809fb9190dda11b0f30f1bc22c5c77ef865
    app.put(BASE_API_PATH_EDU, (request, response) => {
        console.log("[!] Method (PUT) not allowed at " + BASE_API_PATH_EDU);
        response.status(405).send('<p>405: Method not allowed</p>');
    });
    
<<<<<<< HEAD
    app.delete(BASE_API_PATH_EDU, (request, response) => {
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
            mh_countries.length = 0;
            db.remove({}, { multi: true }, function (err, numRemoved) {
                if (err) {
                    console.log("[!] Error deleting all resources");
                }
            });
=======
    // 6.8
    app.delete(BASE_API_PATH_EDU, (request, response) => {
        console.log("[-] Full deletion has been requested. Proceeding.");
        if (mh_countries.length == 0 || mh_countries == null) {
            response.status(400).send("<p>400: No resources found. Can't delete any.</p>");
        } else {
            mh_countries.length = 0;
>>>>>>> 10ed1809fb9190dda11b0f30f1bc22c5c77ef865
            console.log(mh_countries.length);
            response.status(200).send("<p>200: All resources deleted.</p>");
        }
    });
<<<<<<< HEAD

    // Methods involving path+object_fields
    app.get(BASE_API_PATH_EDU + "/:country/:year", (req, res) => {
        var req_data = req.params; 
        var limitAux = parseInt(req.query.limit);
        var offsetAux = parseInt(req.query.offset);
        
        db.find({country: req.data.country, year: parseInt(req.data.year)}).offset(offsetAux).limit(limitAux).exec((err, dataInDB) => {
            if (err) {
                console.error("[!] ERROR accesing DB " + err);
                res.sendStatus(500);
            } else {
                if (dataInDB == 0) {
                    console.error("[!] No DATA found");
                    res.status(404).send("No resources found.");
                } else {
                    delete dataInDB._id;
                    res.status(200).send(JSON.stringify(dataInDB, null, 2)); 
                    console.log(`GET stat by country: <${req_data.country}> and date: <${req_data.date}>`);
                }
            }
        });
    });

    app.delete(BASE_API_PATH_EDU + "/:country/:year", (req, res) => {
        var country = req.params.country;
        var year = parseInt(req.params.year);
        db.remove({ 'country': country, 'year': year });
        res.status(200).send("<h1> Resource" + country + "/" + year + "has been deleted");
    });

    app.post(BASE_API_PATH_EDU + "/:country", (req, res) => {
        res.status(405).send("<h1> Method not allowed</h1>");
    });

    app.post(BASE_API_PATH_EDU + "/:country/:year", (req, res) => {
        res.status(405).send("<h1> Method not allowed</h1>");
    });

    app.put(BASE_API_PATH_EDU + "/:country/:year", (req, res) => {
        var country = req.params.country;
        var year = parseInt(req.params.year);
        var updatemh = req.body;
        var exists;
        db.find({country: req.data.country, year: parseInt(req.data.year)}).exec((err, dbdata) => {
            if (err) {
                console.log("[!] Error accessing DB " + err);
                res.status(500).send("Error processing query...");
            } else {
                if (dbdata.country) {
                    db.remove({ 'country': country, 'year': year });
                    db.update({ "country": country, "year": year }, updatemh, { upsert: false });
                    res.status(200).send("<h1> Resource updated </h1>");
                } else {
                    res.status(409).send("<h1> Conflict </h1>");
                }
            }
        });
    });

}


=======
    
    // 6.3
    app.get(BASE_API_PATH_EDU+"/:country/:year", (request, response) => {
        console.log("[!] GET to " + request.params.country + ", checking if exists.");
        var country;
        mh_countries.forEach(function(obj) {
            if (obj.country == request.params.country && obj.year == request.params.year) {
                country = obj;
            }
        });
        if (isAO(country) && country != null) {
            response.status(200).send(JSON.stringify(country, null, 2));	
        } else {
            console.log("[!] Someone has tried to GET a non-existent resource: \n-->" + request.params.country + "/" + request.params.year);
            response.status(404).send("<p>404: Resource not found</p>");	
        }
    });
    
    // 6.6
    app.post(BASE_API_PATH_EDU+"/:country/:year", (request, response) => {
        console.log("[!] Method not allowed (POST) to /" + request.params.country +"/"+request.params.year);
        response.status(405).send('<p>405: Method not allowed</p>');
    });
    
    // 6.4
    app.delete(BASE_API_PATH_EDU+"/:country/:year", (request, response) => {
        var oldCountry;
        var del_index;
        console.log("[!] Deletion requested for resource: /"+request.params.country+"/"+request.params.year+"\n [?] Checking existence.");
        for(var i=0; i<mh_countries.length; i++){
            if(mh_countries[i].country==request.params.country && mh_countries[i].year==request.params.year){
                oldCountry = mh_countries[i];
                del_index = i;
            }
        }
        if (oldCountry != null) {
            console.log("[-] Delete: "+ JSON.stringify(oldCountry,null));
            mh_countries.splice(del_index, 1);
            response.status(200).send("<p>Resource deleted</p>");	
        } else {
            console.log("[!] Someone has tried to delete a non-existent resource: \n-->" + JSON.stringify(oldCountry, null));
            response.status(400).send("<p>Resource not found, can't delete.</p>");
        }
    });
    
    // 6.5
    app.put(BASE_API_PATH_EDU+"/:country/:year", (request, response) => {
        var updateCountry = request.body;
        var oldCountry;
        var del_index;
        console.log(`[!] New country to update: <${JSON.stringify(updateCountry, null)}>`);
        for(var i=0; i<mh_countries.length; i++){
            if(mh_countries[i].country==request.params.country && mh_countries[i].year==request.params.year){
                oldCountry = mh_countries[i];
                del_index = i;
            }
        }
        if (oldCountry != null) {
            console.log("[-] Delete "+ JSON.stringify(oldCountry, null)+" to add resource: \n-->"+ JSON.stringify(updateCountry, null));
            mh_countries.splice(del_index, 1);
            response.status(200).send("<p>Resource updated.</p>");
            mh_countries.push(updateCountry);
        } else {
            console.log("[!] Someone has tried to update a non-existent resource: \n-->" + JSON.stringify(oldCountry, null));
            response.status(400).send("<p>Resource not found, can't delete.</p>");
        }
    });

}
>>>>>>> 10ed1809fb9190dda11b0f30f1bc22c5c77ef865
