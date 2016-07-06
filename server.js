// TODO: create a basic server with express
// that will send back the index.html file on a GET request to '/'
// it should then send back jsonData on a GET to /data
var express = require('express')
var app = express();
fs = require('fs');

var jsonData = {count: 12, message: 'hey'};
app.get('/', function (req, res){
  fs.readFile('index.html', 'utf8', function(err, data){
    if (err){
      res.status(500).send(err);
    }
    res.send(data); // sends utf8 version of index.html
    // alternitively would have to convert data to string and
    // res.setHeader('Content-Type','text/html') prior to sending
  })
});
app.get('/data', function (req, res){
  res.json(jsonData);
});

var port = 3000
function callback(){
  console.log('listening on http://localhost: ' + port +'...');
};
app.listen(port, callback);
