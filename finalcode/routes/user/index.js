var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var url = 'mongodb://localhost:27017/myproject';
//
var fs = require('fs');
var csv = require('fast-csv');
var qs = require('querystring');


var multer = require('multer');
console.log("going to storage");
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, __dirname+'/uploads')
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname)
    }
});
var upload = multer({storage: storage});
console.log("using ...........multer");

// console.log("field name of the post request is ------------>> "+ file.fieldname);
router.post('/fileUpload', upload.single('file'), (req, res, next) => {
    MongoClient.connect(url, (err, db) => {
        
        assert.equal(null, err);
        // console.log(req.filePath);  
        // console.log(file);
        insertDocuments(db, __dirname+'/uploads/' + req.file.originalname, () => {
            db.close();
            
            console.log("File uploaded");
        });
    });

        //res.json({'message': 'File uploaded successfully'});
        

        var fl = __dirname+'/uploads/' + req.file.originalname;
        var rstream = fs.createReadStream(fl);
        //console.log(rstream.pipe(res));
        rstream.pipe(res);

       // console.log(fl);          
        //console.log(rstream);
        //res.send("fileuploaded");

});



module.exports = router;

var insertDocuments = function(db, filePath, callback) {
    var collection = db.collection('user');
    collection.insertOne({'imagePath' : filePath }, (err, result) => {
        assert.equal(err, null);
        callback(result);
    });
}


