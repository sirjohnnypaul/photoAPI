
const path = require('path');
const fs = require('fs');
const File = require('../models/file');

module.exports = {

downloadSingleFile:  (req,res,next) => {
    const directoryToLook = path.join(__dirname, '..','UploadedFiles',`${req.body.filepath}`)
    console.log(directoryToLook);
    res.download(directoryToLook);     
},

deleteSingleFile: (req,res,next) => {
    const removeDir = path.join(__dirname, '..', 'UploadedFiles')
    fs.unlink(`${removeDir}${req.body.filepath}`, (err) => {
        if (err) {
          console.error(err)
          return 200;
        }
        res.json({status:200, message:`File  was succesfully deleted`});
})
},

 uploadFile: async (req, res, next) => {
    const remove =  await path.join(__dirname, '..', 'UploadedFiles')
    const relPath =  await req.file.path.replace(remove,'')
    const newFile =  await new File(req.body)
    newFile.path = await relPath
    res.status(200).json(relPath);
  }

}
