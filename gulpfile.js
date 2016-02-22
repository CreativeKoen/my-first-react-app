'use strict';
require('babel-core/register');

var gulp = require('gulp');
var webpack = require('webpack-stream');
var uglify = require('gulp-uglify');
var mocha = require('gulp-mocha');
var istanbul = require('gulp-istanbul');
var isparta = require('isparta');

var TEST_FILES = 'tests/**/*-test.js';
var SRC_FILES = 'src/**/**/*.js';

gulp.task('mocha', function(){
	return gulp.src('test/*-test.js')
		.pipe(mocha({reporter: 'list', bail:true, ui: 'bdd'}));
});

gulp.task('mocha:watch', function(){
	gulp.watch(['test/*-test.js'], gulp.parallel('mocha'));
});

// Files to process
/*
 * Instrument files using istanbul and isparta
 */
 var jsxCoverage = require('gulp-jsx-coverage');

 gulp.task('mocha_tests', jsxCoverage.createTask({
    src: ['test/*-test.js', 'src/**/**/*.js'],
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
        //  reporters: ['text', 'json', 'lcov'],
        //directory: 'coverage'
    },
    mocha: {
		  reporter: 'spec'
    },
 }));


var path = require('path');
var yargs = require('yargs');
var rename = require('gulp-rename');
var template = require('gulp-template');

var resolveToComponents = function(glob) {
  return path.join('src/components'); // src/components/{glob}
};

var paths = {
	blankTemplates: path.join(__dirname, 'generator', 'component/**/*.**')
};

gulp.task('component', function() {
  var cap = function(val) {
    return val.charAt(0).toUpperCase() + val.slice(1);
  };
  var name = yargs.argv.name;
  var parentPath = yargs.argv.parent || '';
  var destPath = path.join(resolveToComponents(), parentPath, name);

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

gulp.task('webpack', function(){
	return gulp.src('src/App.js')
  .pipe(webpack( require('./webpack.config.js') ))
	.pipe(uglify())
  .pipe(gulp.dest('dist/'));
});
