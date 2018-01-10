'use strict'

var gulp = require('gulp')
var watch = require('gulp-watch')
var stylus = require('gulp-stylus')
var rename = require('gulp-rename')
var replace = require('gulp-replace')
var autoprefixer = require('gulp-autoprefixer')
var minifycss = require('gulp-clean-css')
var mmq = require('gulp-merge-media-queries')
var nib = require('nib')
// rev = require('gulp-rev');
// Get one .styl file and render, save on old css for future changes
gulp.task('styles', function () {
  return gulp
    .src('src/styles/styles.styl')
    .pipe(stylus({
      paths: ['node_modules'],
      import: ['nib', 'rupture/rupture'],
      use: [nib()],
      'include css': true
    }))
    .pipe(autoprefixer({
      // agregar ie10
      browsers: ['last 2 versions', 'ios 6'],
      cascade: false
    }))
    .pipe(mmq({
      log: true
    }))
    // .pipe(replace("'fonts/Linearicons", "'../fonts/Linearicons"))
    .pipe(gulp.dest('public/css'))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(minifycss())
    // .pipe(rev())
    .pipe(gulp.dest('public/css'))
})


// watcher para stylus y funcion custom de funciones js
gulp.task('watch', function () {
  gulp.watch('src/styles/**/*.styl', ['styles'])
})

gulp.task('default', ['styles', 'watch'])
