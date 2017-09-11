const gulp = require('gulp')
const pug = require('gulp-pug')
const rename = require('gulp-rename')
const cleanCSS = require('gulp-clean-css')
const concatCss = require('gulp-concat-css')

const renamePug = path => Object.assign({}, path, { extname: '.html', })

gulp.task('pug', () =>
  gulp
    .src('src/templates/views/*.pug')
    .pipe(pug({ pretty: true, }))
    .pipe(rename(path => renamePug(path)))
    .pipe(gulp.dest('public'))
)

gulp.task('css', () =>
  gulp
    .src([ 'src/css/*.css', ])
    .pipe(concatCss('main.css'))
    .pipe(cleanCSS({ compatibility: 'ie8', }))
    .pipe(gulp.dest('public/css'))
)
