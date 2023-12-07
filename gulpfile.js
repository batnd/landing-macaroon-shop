const gulp = require('gulp');
const less = require('gulp-less');

/* Минификация */
var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');


/* Преобразование less в css */
exports.less = function () {
    return gulp.src("./src/less/style.less")
        .pipe(less())
        .pipe(gulp.dest("./src/css"));
}

// /* Преобразование less в css - ВАРИАНТ С МИНИФИКАЦИЕЙ */
// exports.less = function () {
//     return gulp.src("./src/less/*.less")
//         .pipe(less())
//         .pipe(cssmin())
//         .pipe(rename({suffix: ".min"}))
//         .pipe(gulp.dest("./src/css"));
// }

/* Отслеживание изменений в less файлах с выполнением функции less (преобразование less в css) */
exports.watch = function () {
    gulp.watch("./src/less/*.less", gulp.series("less"));
}