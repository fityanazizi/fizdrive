const model = require('../model/storage');

//GET all uploaded files
exports.getFiles = (req, res) => {
    const query = 'SELECT file_id AS fileId, type, filename FROM file';
    model.db.all(query, [], (err, files) => {
        if(err){
            console.log(err);
        }else{
            res.json({ files });
        }
    });
};

//GET selected file (download the file)
exports.getSelectedFile = (req, res) => {
    const query = 'SELECT file_id as fileId, type, content FROM file WHERE filename = ?';
    const filename = req.params.filename;
    model.db.get(query, filename, (err, file) => {
        if(err){
            res.json({ message: err });
        }else{
            res.set('Content-Type', file.type);
            return res.send(file.content);
        }   
    });
};

//POST (upload file)
exports.upload = (req, res) => {
    if(!req.file){
        res.status = 400;
        return res.json({
            message: 'a file is required!'
        });
    }
    const query = 'INSERT INTO file (filename, type, content) VALUES (?, ?, ?)';
    const file = [req.file.originalname, req.file.mimetype, req.file.buffer];
    model.db.run(query, file, (err) => {
        if (err){
            console.log(err);
        }else{
            console.log('upload success: '+file[0]);
            res.json({ message: 'success', file });
        }
    });
};

//DELETE selected file
exports.destroy = (req, res) => {
    const id = req.params.id;
    const query = 'DELETE FROM file WHERE file_id = ?';
    model.db.get(query, id, (err, file) => {
        if(err){
            console.log(err);
        }else{
            res.json({ message: 'file deleted' });
        }
    });
};