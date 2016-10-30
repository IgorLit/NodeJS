/**
 * Created by antas on 30.10.2016.
 */

const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const concat = require('gulp-concat');


gulp.task('build',function(){

    gulp.src('*.js')
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['latest']
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('public'))

});
gulp.task('watch',function(){

    gulp.watch('*.js',['build']);

});
gulp.task('default',['build','watch']);