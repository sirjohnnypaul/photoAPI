const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// Routes
const photos = require('./routes/photos');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());



//Routes
app.use('/photos', photos);
app.use('/*',(req,res,next) => {
    res.json("404 - Not found ;)")
})



//Start 

const PORT = process.env.PORT || 2531
//listen 
app.listen(PORT, () => console.info(`Started on port ${PORT}`));
