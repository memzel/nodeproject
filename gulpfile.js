var gulp = require('gulp');
var jshint = require('gulp-jshint');
//ref to nodemon
var nodemon = require('nodemon');
//watch these for changes
var jsfiles = ['*.js','src/**/*.js'];

gulp.task('style',function(){
    gulp.src(jsfiles)
    .pipe(jshint());
});

gulp.task('inject', function(){
    //wiredep
    var wiredep = require('wiredep').stream;
    var options = {
        bowerJson: require('./bower.json'),
        directory: './bower_components',
        ignorePath:'../../bower_components'
    };
    //gulp-inject
    var inject = require('gulp-inject');
    var injectSrc = gulp.src(['./public/css/*.css','./public/js/*.js']);
    var injectOptions= {
        ignorePath:'./public'
    };
    
    return gulp.src('./src/views/*.html')
        .pipe(wiredep(options))
        .pipe(inject(injectSrc, injectOptions))
        .pipe(gulp.dest('./src/views'));
});

//array - for restart
gulp.task('serve',['style','inject'],function(){
    var options = {
        script:'app.js',
        delayTime: 1,
        watch:jsfiles
    }
    return nodemon(options)
        .on('restart',function(ev){
            console.log('Server Restarted...');
        })
});
