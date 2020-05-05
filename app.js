const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const logger = require('morgan');
const PhotosController = require('./controllers/PhotosController');
// Routes
const photos = require('./routes/photos');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
// let corsOptions = {
//     origin: '*',
//     optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
// }
//app.use(cors());
app.use(logger());
//Routes
app.use('/photos', photos);
app.use('/ranking', PhotosController.getRanking);
app.use('/*',(req,res,next) => {
    res.json("404 - Not found ;)")
})



//Start 

const PORT = process.env.PORT || 2531
//listen 
app.listen(PORT, () => console.info(`Started on port ${PORT}`));
