var express = require('express');

var routes = function(book) {
var bookRouter = express.Router();
var bookController = require('../controllers/bookController.js')(book);

bookRouter.route('/')
    .post(bookController.post)
    .get(bookController.getAll);
    

bookRouter.use('/:bookid', bookController.middleWare);

bookRouter.route('/:bookid')
    .get(bookController.getID)
    .put(bookController.put)
    .patch(bookController.patch)
    .delete(bookController.deleteBook);
    return bookRouter;
};

module.exports = routes;