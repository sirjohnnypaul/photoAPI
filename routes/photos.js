const router = require('express-promise-router')();
const PhotosController = require('../controllers/PhotosController');
const fs = require('fs');
const multer = require('multer')
const path = require('path');
const util = require('util');

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        const uploadsDir = path.join(__dirname, '..', 'UploadedFiles',`${Date.now()}`)
        fs.mkdirSync(uploadsDir)
        cb(null,uploadsDir)
    },
    filename:function(req, file, cb){
        cb(null,file.originalname)
    }
});

const upload = multer({storage});


router.route('/files')
    .post(upload.single("data"),PhotosController.uploadFile)

router.route('/files/download')
    .get(PhotosController.downloadSingleFile)

router.route('/files/delete')
    .get(PhotosController.deleteSingleFile)

module.exports = router;