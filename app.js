var express = require("express");
    mongoose = require("mongoose");
    
var db = mongoose.connect('mongodb://localhost/bookAPI');

var book = require('./models/bookModel');

var app = express();

var port = process.env.PORT || 3000;

var bookRouter = express.Router();

bookRouter.route('/books').get(function(req,res){
    var query = {};
    if (req.query.genre){
        query.genre = req.query.genre;
    }
    book.find(query, function(err,books){
        if (err) {
            res.status(500).send(err);
        }else{
            res.json(books);
        }
    });
});

bookRouter.route('/books/:bookid').get(function(req,res){

    book.findById(req.params.bookid, function(err,books){
        if (err) {
            res.status(500).send(err);
        }else{
            res.json(books);
        }
    });
});


app.use('/api', bookRouter);

app.get('/', function(req, res){
    res.send("welcome to my api");
});

app.listen(port, function(){
    console.log("Gulp is running my app on Port: " + port);
});