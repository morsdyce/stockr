var gulp = require('gulp');
var browserSync = require('browser-sync');

gulp.task('serve', function() {
    browserSync({
        notify: false,
        server: ['app']
    });
});