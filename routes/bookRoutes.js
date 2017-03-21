var express = require('express');

var routes = function(book) {
var bookRouter = express.Router();
var bookController = require('../controllers/bookController.js')(book);
bookRouter.route('/')
    .post(bookController.post)
    .get(bookController.get);
    
bookRouter.use('/:bookid', function(req,res,next){
    book.findById(req.params.bookid, function(err,book){
        if (err) {
            res.status(500).send(err);
        }else if(book) {
            req.book = book;
            next();
        }else{
            res.status(404).send('no book found');
        }
    });
});

bookRouter.route('/:bookid')
    .get(function(req,res){
        res.json(req.book);
    })
    .put(function(req,res){
        req.book.title = req.body.title;
        req.book.author = req.body.author;
        req.book.genre = req.body.genre;
        req.book.read = req.body.read;
        req.book.save(function(err){
            if (err) {
                res.status(500).send(err);
            }else{
                res.json(req.book);
            }
        });
    })
    .patch(function(req,res){
        if (req.body._id) {
            delete req.body._id;
        }
        for(var key in req.body) {
            req.book[key] = req.body[key];
        }
        req.book.save(function(err){
            if (err) {
                res.status(500).send(err);
            }else{
                res.json(req.book);
            }
        });
    })
    .delete(function(req,res){
        req.book.remove(function(err) {
            if(err) {
                res.status(500).send(err);
            }else{
                res.status(204).send('removed');
            }
        });
    });
    return bookRouter;
};

module.exports = routes;