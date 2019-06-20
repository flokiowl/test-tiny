"use strict";

var gulp 					= require('gulp');
var plumber 				= require('gulp-plumber');
var notify 					= require('gulp-notify');
var sass 					= require('gulp-sass');
var browserSync 			= require('browser-sync').create();
var errorHandler 			= {
    						errorHandler: notify.onError({
        					title: 'Ошибка в плагине <%= error.plugin %>',
        					message: "Ошибка: <%= error.message %>"
   								 })
							};


//Gulp задачи

gulp.task('style', function() {
	return gulp.src('src/sass/style.scss')
		.pipe(plumber(errorHandler))	
		.pipe(sass())
		.pipe(gulp.dest('src/css/'))
		.pipe(browserSync.stream());
});


gulp.task('serve',  function() {
    browserSync.init({
    	server: {baseDir: './src/'}
    });
    gulp.watch('src/sass/**/*', gulp.series('style'));
    gulp.watch('src/**/*.html').on('change', browserSync.reload);
    gulp.watch('src/css/**/*.css').on('change', browserSync.reload);
    gulp.watch('src/sass/**/*.scss').on('change', browserSync.reload);
});



