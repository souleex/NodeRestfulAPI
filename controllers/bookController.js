var bookController = function(book) {
    var post = function(req, res) {
        var newBook = new book(req.body);
        if(!req.body.title){
            res.status(400);
            res.send('Title is required');
        }else{
            newBook.save();
            res.status(201);
            res.send(newBook);
        }
    }
    var getAll = function(req,res){
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
    }
    
    var middleWare = function(req,res,next){
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
    }
    
    var getID = function(req,res){
        res.json(req.book);
    }
    
    var put = function(req,res){
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
    }
    
    var patch = function(req,res){
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
    }
    
    var deleteBook = function(req,res){
        req.book.remove(function(err) {
            if(err) {
                res.status(500).send(err);
            }else{
                res.status(204).send('removed');
            }
        });
    }
    
    return {
        post       : post,
        getAll     : getAll,
        getID      : getID,
        put        : put,
        patch      : patch,
        deleteBook : deleteBook,
        middleWare : middleWare
    }
}

module.exports = bookController;