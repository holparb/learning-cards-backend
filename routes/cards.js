var express = require('express');
var router = express.Router();

/* GET list cards */
router.get("/list", function(req, res) {
    // get db and the collection
    var db = req.db;
    var collection = db.get("cards");
    // get every document from the collection and return as json in the response
    collection.find({},{},function(error, docs){
        console.log(docs);
        if(error !== null) {
            res.send({ error: error });
        }
        res.json(docs);
    });
});

/* POST add card to list */
router.post("/add", (req, res) => {
    // get db and the collection
    var db = req.db;
    var collection = db.get("cards");

    if(req.body.answer.length > 0) {
        collection.insert(req.body, (error, addedData) => {
            // send OK response if data is successfully written, otherwise send the error message 
            res.send((error === null) ? {isSuccessful: true, id: addedData._id } : {isSuccessful: false, error: error});
        });
    }
    else {
        res.send({isSuccessful: false, error: "INVALID_ANSWER_LENGTH"});
    }

    
});

/* DELETE remove card from list */
router.delete("/delete/:id", (req, res) => {
    // get db and the collection
    var db = req.db;
    var collection = db.get("cards");
    // remove the data specified by the id url parameter from the collection
    collection.remove({"_id" : req.params.id}, (error) => {
        // send OK response if data removal was successfull, otherwise send the error message 
        res.send((error === null) ? {isSuccessful: true} : {isSuccessful: false, error: error});
    });
});

/* PATCH update card in list */
router.patch("/update/:id", (req, res) => {
    // get db and the collection
    var db = req.db;
    var collection = db.get("cards");
    // update the data specified by the id url parameter in the collection with new data from the request body
    collection.update({"_id" : req.params.id}, {$set: req.body}, (error) => {
        // send OK response if data removal was successfull, otherwise send the error message
        res.send((error === null) ? {isSuccessful: true} : {isSuccessful: false, error: error});
    });
});


module.exports = router;
