'use strict';
require('babel-core/register');

var gulp = require('gulp');
var webpack = require('webpack-stream');
var uglify = require('gulp-uglify');
var mocha = require('gulp-mocha');
var istanbul = require('gulp-istanbul');
var isparta = require('isparta');

var TEST_FILES = 'tests/**/*-test.js';
var SRC_FILES = 'react/**/**/*.js';


gulp.task('webpack', function(){
	return gulp.src('react/App.js')
  .pipe(webpack( require('./webpack.config.js') ))
	// .pipe(uglify())
  .pipe(gulp.dest('api/public'));
});

gulp.task('mocha', function(){
	return gulp.src('test/*-test.js')
		.pipe(mocha({reporter: 'list'}));
});

gulp.task('mocha:watch', function(){
	gulp.watch(['test/*-test.js'], gulp.parallel('mocha'));
});

/**
 * Instrument files using istanbul and isparta
 */
 var jsxCoverage = require('gulp-jsx-coverage');

 gulp.task('coverage', jsxCoverage.createTask({
    src: ['test/*-test.js', 'react/**/**/*.js', '!react/App.js','!react/routes.js','!react/generator/**/**.*'],
		isparta: true,
    istanbul: {
		    preserveComments: true,
		    coverageVariable: '__MY_TEST_COVERAGE__',
		    exclude: /node_modules|test[0-9]/
	    },
	    transpile: {
		    babel: {
			    include: /\.(js|jsx)?$/,
			    exclude: /(node_modules|bower_components)/,
			    omitExt: ['.jsx']
	    },
    },
		babel: {                                         // will pass to babel-core
	    presets: ['es2015', 'react'],                // Use proper presets or plugins for your scripts
	    sourceMap: 'both'                            // get hints in covarage reports or error stack
	  },
    coverage: {
			reporters: ['text'],
        // reporters: ['text', 'json', 'lcov'],
        // directory: 'coverage'
    },
    mocha: {
		  reporter: 'nyan'
    },
 }));

var browserSync = require('browser-sync');
var connect = require('gulp-connect-php');
gulp.task('reload', function () { browserSync.reload(); });
gulp.task('serve', function() {
	connect.server({ base: './api/public'}, function (){
    browserSync({
      proxy: '127.0.0.1:8000/',
			port: 3000
    });
  });
	gulp.watch('react/**/*.*', gulp.series('webpack', 'reload') );
});

/**
* the component function is mostly code from the AngularClass NG6 starter repo
* I modded it to use react components
* @repo https://github.com/AngularClass/NG6-starter/
*/
var path = require('path');
var yargs = require('yargs');
var rename = require('gulp-rename');
var template = require('gulp-template');

var paths = {
	reactComponents: path.join(__dirname, 'react/components'),
	blankTemplates: path.join(__dirname, 'react/generator', 'component/**/*.**')
};


var resolveToComponents = function(glob) {
  return paths.reactComponents; // src/components/{glob}
};

var name = yargs.argv.name || '';
var parentPath = yargs.argv.parent || '';
var destPath = path.join(resolveToComponents(), parentPath, name);

gulp.task('component', function() {
  var cap = function(val) {
    return val.charAt(0).toUpperCase() + val.slice(1);
  };

  return gulp.src(paths.blankTemplates)
    .pipe(template({
      name: name,
      upCaseName: cap(name)
    }))
    .pipe(rename(function(path) {
      path.basename = path.basename.replace('temp', name);
    }))
    .pipe(gulp.dest(destPath));
});
