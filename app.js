var express = require("express"),
    mongoose = require("mongoose"),
    bodyParser = require("body-parser");

var db = mongoose.connect('mongodb://localhost/bookAPI');

var book = require('./models/bookModel');

var app = express();

var port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

var bookRouter = require('./routes/bookRoutes')(book);

app.use('/api/books', bookRouter);
//app.use('/api/author', authorRouter);

app.get('/', function(req, res){
    res.send("welcome to my api");
});

app.listen(port, function(){
    console.log("Gulp is running my app on Port: " + port);
});