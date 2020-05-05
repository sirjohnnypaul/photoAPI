
const path = require('path');
const fs = require('fs');
const File = require('../models/file');
const spawn = require('child_process').spawn;
const axios = require("axios");
const superagent = require('superagent');

module.exports = {

downloadSingleFile:  (req,res,next) => {
    const directoryToLook = path.join(__dirname, '..','UploadedFiles',`${req.query.url}`)
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

resizeImage: (req,res,next) => {
    let pathPY = path.join(__dirname, '..','hello.py');
    let img = req.body;
    const process = spawn('python',[pathPY],img);
    console.log(process);
    let dataToSend;
    process.stdout.on('data', function (data) {
      console.log('Pipe data from python script ...');
      dataToSend = data.toString();
      console.log(dataToSend);
     });

     process.on('close', (code) => {
      console.log(`child process close all stdio with code ${code}`);
      // send data to browser
      console.log('data',dataToSend)
      res.json(dataToSend)
      });
},

getRanking: async(req,res) => {
  console.log(req.body.link);
  axios.get(req.body.link)
  .then(response => {
    res.json(response.data)
  })
  .catch(error => {
    res.json(error)
  });
},

 uploadFile: async (req, res, next) => {
    const remove =  await path.join(__dirname, '..', 'UploadedFiles')
    const relPath =  await req.file.path.replace(remove,'')
    const newFile =  await new File(req.body)
    newFile.path = await relPath
    res.status(200).json(relPath);
  }

}
