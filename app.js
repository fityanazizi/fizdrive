const express = require('express');
const bodyParser = require('body-parser');
const {getFiles, getSelectedFile, upload, destroy} = require('./controller/storage');
const model = require('./model/storage');

const app = express();
let port = process.env.PORT || 5757;

//middleware
app.use(express.static(__dirname + '/views'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//homepage
app.get('/', (req, res) => {
    res.render('index');
});

//GET all uploaded files
app.get('/files', getFiles);

//GET selected file (download the file)
app.get('/file/:filename', getSelectedFile);

//POST (upload file)
app.post('/upload', model.upload.single('file'), upload);

//DELETE selected file
app.delete('/delete/:id', destroy);

app.listen(port, () => {
    console.log('app running on port: '+port);
});