var should = require('should'),
    sinon = require('sinon');
    
describe('Book Controller Tests:', function() {
    describe('POST', function() {
        it('should not allow an empty title on POST', function(){
            var book = function(myBook){
                this.save = function(){
                    //empty
                }
            }
            
            var req = {
                body: {
                    'author' : 'Sou'
                }
            }
            
            var res = {
                status: sinon.spy(),
                send  : sinon.spy()
            }
            var bookController = require('../controllers/bookController.js')(book);
            bookController.post(req, res);
            res.status.calledWith(400).should.equal(true, 'bad status ' + res.status.args[0][0]);
            res.send.calledWith('Title is required').should.equal(true);
        });
    })
})