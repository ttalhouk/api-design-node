
// TODO: user app.params to find the lion using the id
// and then attach the lion to the req object and call next. Then in
// '/lion/:id' just send back req.lion

// create a middleware function to catch and handle errors, register it
// as the last middleware on app


// create a route middleware for POST /lions that will increment and
// add an id to the incoming new lion object on req.body

var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var _ = require('lodash');
var morgan = require('morgan'); // logs in the server

var lions = [];
var id = 0;
// middleware executes on every router call and when next() goes to the next
// middleware function.  See updateId function...
// middleware functions have the following args
// function(err, req, res, next)
// or function(req, res, next)
// or function(req, res)
// can pass middleware into routes between routs and callback
var updateId = function(req, res, next) {
  // fill this out. this is the route middleware for the ids
  id += 1;
  req.body.id = id + '';
  next();
};


app.use(morgan('dev'))

app.use(express.static('client'));

// body parser makes it possible to post JSON to the server
// we can accss data we post on as req.body
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.param('id', function(req, res, next, id) {
  // fill this out to find the lion based off the id
  // and attach it to req.lion. Rember to call next()
  var lion = _.find(lions, {id: id});

  if (lion){
    req.lion();
    next();
  } else {
    res.send();
  }
});

// TODO: make the REST routes to perform CRUD on lions
app.get('/lions', function(req, res){
  res.json(lions)
});


app.get('/lions/:id', function(req, res){
  // use req.lion
  res.json( req.lion || {} );
});

app.post('/lions', updateId, function(req, res) {
  var lion = req.body;
  lions.push(lion);
  res.send(lion);
});


app.put('/lions/:id', function(req, res) {
  var update = req.body;
  if (update.id){
    delete(update.id)
  }
  var lion = _.findIndex(lions, {id: req.params.id});
  if (!lions[lion]){
    res.send();
  } else {
    var updatedLion = _.assign(lions[lion], update);
    res.json(updatedLion);
  }
});

app.delete('/lions/:id',function(req, res) {
  var lion = _.findIndex(lions, {id: req.params.id});
  if (!lions[lion]){
    res.send();
  } else {
    var deletedLion =  lions[lion];
    lions.splice(lion, 1);
    res.json(deletedLion)
  }
});
// error handler
app.use(function(err, req, res, next) {
  console.log(err);
  res.status(500).send(err);
});


app.listen(3000);
console.log('on port 3000');
