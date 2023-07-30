const express = require('express')
const app = express()
const port = 4001
const cors = require("cors");
var corsOptions = {
    origin: "http://localhost:3001"
  };
  
app.use(cors(corsOptions));

var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();
// for parsing application/json
app.use(bodyParser.json()); 

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true })); 
//form-urlencoded
// for parsing multipart/form-data
app.use(upload.array()); 
app.use(express.static('public'));


var conn = require('./dbConfig');
const api =require('./router/api')


app.use("/api", api);

app.get('/', (req, res) => {
    res.send('Hello World!')
})





app.listen(port, () => {
    console.log(`Example app listening on port http://localhost/${port}`)
  })