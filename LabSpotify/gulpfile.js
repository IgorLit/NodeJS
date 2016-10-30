/**
 * Created by antas on 30.10.2016.
 */
/*
 var lr = require('tiny-lr'), // Минивебсервер для livereload
 gulp = require('gulp'), // Сообственно Gulp JS
 livereload = require('gulp-livereload'), // Livereload для Gulp
 myth = require('gulp-myth'), // Плагин для Myth - http://www.myth.io/
 uglify = require('gulp-uglify'), // Минификация JS
 concat = require('gulp-concat'), // Склейка файлов
 connect = require('connect'), // Webserver
 server = lr();

 gulp.task('http-server', function() {
 connect()
 .use(require('connect-livereload')())
 .use(connect.static('./'))
 .listen('9000');

 console.log('Server listening on http://localhost:9000');
 });

 gulp.task('js', function() {
 gulp.src(['./!*.js', '!./assets/js/vendor/!**!/!*.js'])
 .pipe(concat('index.js')) // Собираем все JS, кроме тех которые находятся в ./assets/js/vendor/!**
 .pipe(gulp.dest('./public/js'))
 .pipe(livereload(server)); // даем команду на перезагрузку страницы
 });

 gulp.task('watch', function() {
 // Предварительная сборка проекта
 gulp.run('js');

 // Подключаем Livereload
 server.listen(35729, function(err) {
 if (err) return console.log(err);

 gulp.watch('*', function() {
 gulp.run('js');
 });
 });
 gulp.run('http-server');
 });*/
const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const concat = require('gulp-concat');

gulp.task('default', () =>
    gulp.src('*.js')
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['latest']
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('public'))
);