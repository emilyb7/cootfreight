const gulp = require('gulp')
const pug = require('gulp-pug')
const rename = require('gulp-rename')

const renamePug = path => Object.assign({}, path, { extname: '.html', })

gulp.task('pug', () =>
  gulp
    .src('src/templates/views/*.pug')
    .pipe(pug({ pretty: true, }))
    .pipe(rename(path => renamePug(path)))
    .pipe(gulp.dest('public'))
)
