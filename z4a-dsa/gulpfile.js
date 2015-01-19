// FOUNDATION FOR APPS TEMPLATE GULPFILE
// -------------------------------------
// This file processes all of the assets in the "client" folder, combines them with the Foundation
// for Apps assets, and outputs the finished files in the "build" folder as a finished app.

// 1. LIBRARIES
// - - - - - - - - - - - - - - -

var gulp           = require('gulp'),
    rimraf         = require('rimraf'),
    runSequence    = require('run-sequence'),
    frontMatter    = require('gulp-front-matter'),
    autoprefixer   = require('gulp-autoprefixer'),
    sass           = require('gulp-ruby-sass'),
    uglify         = require('gulp-uglify'),
    concat         = require('gulp-concat'),
    connect        = require('gulp-connect'),
    path           = require('path'),
    modRewrite     = require('connect-modrewrite'),
    dynamicRouting = require('./bower_components/foundation-apps/bin/gulp-dynamic-routing');

// 2. SETTINGS VARIABLES
// - - - - - - - - - - - - - - -

// Sass will check these folders for files when you use @import.
var sassPaths = [
  'client/assets/scss',
  'bower_components/foundation-apps/scss'
];
// These files include Foundation for Apps and its dependencies
var foundationJS = [
  'bower_components/fastclick/lib/fastclick.js',
  'bower_components/viewport-units-buggyfill/viewport-units-buggyfill.js',
  'bower_components/tether/tether.js',
  'bower_components/angular/angular.js',
  'bower_components/angular-animate/angular-animate.js',
  'bower_components/ui-router/release/angular-ui-router.js',
  'bower_components/angular-local-storage/dist/angular-local-storage.js',
  'bower_components/foundation-apps/js/vendor/**/*.js',
  'bower_components/foundation-apps/js/angular/**/*.js',
  '!bower_components/foundation-apps/js/angular/app.js'
];
// These files are for your app's JavaScript
var appJS = [
  'client/assets/js/app.js',
  'client/assets/js/factories.js',
  'client/assets/js/controllers.js'
];

// 3. TASKS
// - - - - - - - - - - - - - - -

// Cleans the build directory
gulp.task('clean', function(cb) {
  rimraf('./build', cb);
});

// Copies user-created files and Foundation assets
gulp.task('copy', function() {
  var dirs = [
    './client/**/*.*',
    '!./client/templates/**/*.*',
    '!./client/assets/{scss,js}/**/*.*'
  ];

  // Everything in the client folder except templates, Sass, and JS
  gulp.src(dirs, {
    base: './client/'
  })
    .pipe(gulp.dest('./'));

  // Iconic SVG icons
  gulp.src('./bower_components/foundation-apps/iconic/**/*')
    .pipe(gulp.dest('./assets/img/iconic/'));

  // Foundation's Angular partials
  return gulp.src(['./bower_components/foundation-apps/js/angular/components/**/*.html'])
    .pipe(gulp.dest('./components/'));
});

// Compiles Sass
gulp.task('sass', function() {
  return gulp.src('client/assets/scss/app.scss')
    .pipe(sass({
      loadPath: sassPaths,
      style: 'nested',
      bundleExec: true
    }))
    .on('error', function(e) {
      console.log(e);
    })
    .pipe(autoprefixer({
      browsers: ['last 2 versions', 'ie 10']
    }))
    .pipe(gulp.dest('./assets/css/'));
});

// Compiles and copies the Foundation for Apps JavaScript, as well as your app's custom JS
gulp.task('uglify', function() {
  // Foundation JavaScript
  gulp.src(foundationJS)
    .pipe(uglify({
      beautify: true,
      mangle: false
    }).on('error', function(e) {
      console.log(e);
    }))
    .pipe(concat('foundation.js'))
    .pipe(gulp.dest('./assets/js/'))
  ;

  // App JavaScript
  return gulp.src(appJS)
    .pipe(uglify({
      beautify: true,
      mangle: false
    }).on('error', function(e) {
      console.log(e);
    }))
    .pipe(concat('app.js'))
    .pipe(gulp.dest('./assets/js/'))
  ;
});

// Clean partials directory
gulp.task('clean-partials', function (cb) {
	rimraf('./partials', cb);
});

// Clean asset directory
gulp.task('clean-assets', function (cb) {
	rimraf('./assets', cb);
});

// Clean template directory
gulp.task('clean-templates', function (cb) {
	rimraf('./templates', cb);
});

// Copies your app's page templates and generates URLs for them
gulp.task('copy-templates', ['copy'], function() {
  return gulp.src('./client/templates/**/*.html')
    .pipe(dynamicRouting({
      path: 'assets/js/routes.js',
      root: 'client'
    }))
    .pipe(gulp.dest('./templates'))
  ;
});

// Starts a test server, which you can view at http://localhost:8080
gulp.task('server:start', function() {
  connect.server({
    root: './',
    middleware: function() {
      return [
        modRewrite(['^[^\\.]*$ /index.html [L]'])
      ];
    },
  });
});

// Builds your entire app once, without starting a server
gulp.task('build', function() {
  runSequence('clean', 'clean-assets', 'clean-partials', 'clean-templates', ['copy', 'sass', 'uglify'], 'copy-templates', function() {
    console.log("Successfully built.");
  })
});

// Default task: builds your app, starts a server, and recompiles assets when they change
gulp.task('default', ['build', 'server:start'], function() {
  // Watch Sass
  gulp.watch(['./client/assets/scss/**/*', './scss/**/*'], ['sass']);

  // Watch JavaScript
  gulp.watch(['./client/assets/js/**/*', './js/**/*'], ['uglify']);

  // Watch static files
  gulp.watch(['./client/**/*.*', '!./client/templates/**/*.*', '!./client/assets/{scss,js}/**/*.*'], ['copy']);

  // Watch app templates
  gulp.watch(['./client/templates/**/*.html'], ['copy-templates']);
});
