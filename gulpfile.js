var gulp = require('gulp');
var webpack = require('gulp-webpack');
var shell = require('gulp-shell');
var webpackConfig = require('./webpack.config.js');
const babel = require('gulp-babel');
const watch = require('gulp-watch');

// gulp default to test if it works.
gulp.task('default', function() {
  console.log('GULP works!');
});

// gulp babel to compile components.
gulp.task('babel', function() {
	return gulp.src('./public/components/*')
    // .pipe(jsx())
		.pipe(babel({
			presets: ['react']
		}))
		.pipe(gulp.dest('./compiled/components'));
});

// gulp watch to monitor changes in any jsx file.
// If there is a file change, use babel task.
gulp.task('watch', function() {
  gulp.watch('./public/components/*.jsx', ['babel']);
});

// gulp heroku for Heroku shell commands.
// Be sure to login to Heroku, clone repo, create, add, commit
// before calling this task.
gulp.task('heroku', shell.task([
  'git push heroku master',
  'heroku open'
]));

// gulp webpack to minify, watch, and pipe compiled js files to dist.
gulp.task('webpack', function() {
  return gulp.src('./compiled/components/*.js')
  .pipe(webpack({
    watch: true,
    webpackConfig
  }))
  .pipe(gulp.dest('./dist'));
});
