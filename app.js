const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const path = require('path');
const fs = require('fs');
const multer = require('multer')
const app = express();
const cors = require('cors')

// Routes
const photos = require('./routes/photos');

//Middlewares
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());



//Routes
app.get('/',(req,res,next)=>{
    res.send('Hello');
})
app.use('/photos', photos);
app.use('/*',(req,res,next) => {
    res.json("404 - Not found ;)")
})



//Start 

const PORT = process.env.PORT || 2531
//listen 
app.listen(PORT, () => console.info(`Started on port ${PORT}`));
