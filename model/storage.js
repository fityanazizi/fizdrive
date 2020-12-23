const sqlite3 = require('sqlite3').verbose();
const multer = require('multer');
//const path = require('path');

let db = new sqlite3.Database('./database/storage.db', (err) => {
    if(err){
        console.log(err);
    }else{
        console.log('db connected');
    }
});

//init multer
/*
const uploadPath = path.join(__dirname, './storage');
let upload = multer({
    dest: uploadPath
});*/
const uploadPath = multer.memoryStorage();
let upload = multer({
    storage: uploadPath
});

module.exports = {
    db, 
    upload,
    //uploadPath
};
