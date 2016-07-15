/*eslint-env node*/

var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var eslint = require('gulp-eslint');
var concat = require('gulp-concat');
var mergeMediaQueries = require('gulp-merge-media-queries');
var cssnano = require('gulp-cssnano');
var uglify = require('gulp-uglify');
var autoprefixer = require('gulp-autoprefixer');

/**
 * Sass default compile action for reusage
 * 
 * @param {string|string[]} source Source file(s) to search
 * @param {string} destiny Destined path for concat file
 * @param {string} concatFileName Name for concatenated file, with extension
 * 
 * @return stream
 */
function sassCompile(source, destiny, concatFileName) {
	var sassConfig = {
		precision : 8
	};

	var autoprefixerConfig = {
		browsers: ['last 2 versions'],
		cascade: false
	};

	var cssConfig = {
		zindex: false,
		mergeIdents: false
	};

	return gulp.src(source)
		.pipe(sass(sassConfig))
		.pipe(concat(concatFileName))
		.pipe(mergeMediaQueries())
		.pipe(autoprefixer(autoprefixerConfig))
		.pipe(cssnano(cssConfig))
		.pipe(gulp.dest(destiny))
		.pipe(browserSync.stream());
}

/**
 * JavaScript default compile action for reusage
 * 
 * @param {string|string[]} source Source file(s) to search
 * @param {string} destiny Destined path for concat file
 * @param {string} concatFileName Name for concatenated file, with extension
 * 
 * @return stream
 */
function jsCompile (source, destiny, concatFileName) {
	var uglifyConfig = {
		mangle: false
	};

	return gulp.src(source)
		.pipe(concat(concatFileName))
		.pipe(uglify(uglifyConfig))
		.pipe(gulp.dest(destiny))
		.pipe(browserSync.stream());
}

gulp.task('server', ['sass', 'app-js'], function () {
	browserSync.init({
		server: './'
	});

	gulp.watch('resources/scss/**/*.scss', ['sass']);
	gulp.watch('resources/js/**/*.js', ['app-js']);
	gulp.watch('*.html', browserSync.reload);
});

gulp.task('app-js', ['lint'], function () {
	return jsCompile('resources/js/**/*.js', 'public/js/', 'main.js');
});

gulp.task('sass', function () {
	return sassCompile('resources/scss/**/*.scss', 'public/css/', 'main.css');
});

gulp.task('lint', function () {
	return gulp.src('resources/js/**/*.js')
		.pipe(eslint())
		.pipe(eslint.format())
		.pipe(eslint.failOnError());
});

gulp.task('default', ['server']);