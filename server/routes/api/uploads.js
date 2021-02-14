const express = require('express');
const mongodb = require('mongodb');
const router = express.Router();
const path = require('path');
const multer = require("multer");
const fs = require('fs');

//! path.resolve(__dirname, `../js/${req.body.uzanti}/titlechange.js`)

const upload = multer({
    dest: "./../../uploads/",
});

//* GET METODU
router.get('/:imagename', async(req, res) => {

    try {
        fs.readFileSync(path.join(__dirname, `../../uploads/${req.params.imagename}`));
        res.sendFile(path.join(__dirname, `../../uploads/${req.params.imagename}`));
    } catch(err) {
        console.log(err);
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.write('<small>Can not File!</small>', 'utf-8')
        res.end();
    }
});

//* POST METODU
router.post('/:filename', upload.single('file'), (req, res) => {

    var file = req.files.file
    var filename = req.params.filename

    file.mv(path.join(__dirname, `../../uploads/${filename}`), function (err) {
        if (err) {
            res.send(err)
        } else {
            res.send("File Uploaded")
        }
    })

});

module.exports = router;