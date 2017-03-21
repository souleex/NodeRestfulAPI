var express = require('express');

var routes = function(book) {
    var bookRouter = express.Router();

    bookRouter.route('/')
        .post(function(req, res){
            var newBook = new book(req.body);
            newBook.save();
            res.status(201).send(newBook);
        })
        .get(function(req,res){
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

    bookRouter.route('/:bookid')
        .get(function(req,res){
            book.findById(req.params.bookid, function(err,books){
                if (err) {
                    res.status(500).send(err);
                }else{
                    res.json(books);
                }
            });
        });
    
    return bookRouter
};

module.exports = routes;