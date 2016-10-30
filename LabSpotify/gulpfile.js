/**
 * Created by antas on 30.10.2016.
 */
const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const concat = require('gulp-concat');

gulp.task('build',function(){

    gulp.src('src/**/*.js') // берет за исходные все .js в папке src и всех ее подкаталогов
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['latest']
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('public')) // тут меняется выходной каталог

});

gulp.task('watch',function(){

    gulp.watch('src/**/*.js',['build']); // следит за всеми .js в папке src и всех ее подкаталогов

});
gulp.task('default',['build','watch']);