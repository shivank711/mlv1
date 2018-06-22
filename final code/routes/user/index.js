var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var url = 'mongodb://localhost:27017/myproject';
//
var fs = require('fs');
var csv = require('fast-csv');


var multer = require('multer');
console.log("going to storage");
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/images/uploads')
    },
    filename: (req, file, cb) => {
      cb(null, file.fieldname + '-' + file.originalname)
    }
});
var upload = multer({storage: storage});


// console.log("field name of the post request is ------------>> "+ file.fieldname);
router.post('/fileUpload', upload.single('file'), (req, res, next) => {
    MongoClient.connect(url, (err, db) => {
        
        assert.equal(null, err);
        console.log(req.filePath);  

        insertDocuments(db, 'public/images/uploads/' + this.file.fieldname, () => {
            db.close();
            
            res.json({'message': 'File uploaded successfully'});
        });
    });
});

module.exports = router;

var insertDocuments = function(db, filePath, callback) {
    var collection = db.collection('user');
    collection.insertOne({'imagePath' : filePath }, (err, result) => {
        assert.equal(err, null);
        callback(result);
    });
}