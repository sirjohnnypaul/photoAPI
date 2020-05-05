
const path = require('path');
const fs = require('fs');
const File = require('../models/file');
const spawn = require('child_process').spawn;

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
    axios.get(`https://tradewatch.pl/api/sale/by-item-group?date-from=2020-04-29&date-to=2020-04-30&phrase-include=${req.keyword}&max-fetch-count=50&auth=loremipsummarketing@gmail.com:7a2531eea5884dc7c72b04fc0861541c`,config)
    .then((response) => {
        res.json(response.data);
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
