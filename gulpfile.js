var gulp = require('gulp');
    nodemon = require('gulp-nodemon'),
    gulpMocha = require('gulp-mocha');

//this is what executes if gulp is launched without any parameters
gulp.task('default', function(){
    //have gulp execute nodemon
    nodemon({
        //have nodemon execute app.js on port 8000
        script: 'app.js',
        ext: 'js',
        env: {
            PORT:8000
        },
        //i forgot what this does
        ignore: ['./node_modules/**']
    })
    .on('restart', function(){
        console.log('Restarting');
    });
});

//this was for mocha api testing. we are supposed to prevent creation of books
//with missing fields
gulp.task('test', function(){
    gulp.src('tests/*.js', {read: false})
        .pipe(gulpMocha({reporter: 'nyan'}))
});