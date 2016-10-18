var gulp = require('gulp')
var sass = require('gulp-sass')
var autoprefixer = require('gulp-autoprefixer')
var minCss = require('gulp-minify-css')
var rename = require('gulp-rename')
var concatCss = require('gulp-concat-css')
var gutil = require("gulp-util")

gutil.log('Hello Fulya Gürsel !');

var config = {
   srcCss : 'sass/**/*.scss',
   buildCss: 'css'
}

gulp.task('build-css', function(cb) {
   gulp.src(config.srcCss)

      // output non-minified CSS file
      .pipe(sass({
         outputStyle : 'expanded'
      }).on('error', sass.logError))
      .pipe(autoprefixer())
      .pipe(gulp.dest(config.buildCss))

      .pipe(concatCss("bundle.css"))

      // output the minified version
      .pipe(minCss())
      .pipe(rename({ extname: '.min.css' }))
      
      .pipe(gulp.dest(config.buildCss))

   cb()
})

gulp.task('watch', function(cb) {
   gulp.watch(config.srcCss, ['build-css']) 
})

gulp.task('default', ['build-css', 'watch'])