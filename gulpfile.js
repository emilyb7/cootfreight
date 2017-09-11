const path = require('path')
const gulp = require('gulp')
const pug = require('gulp-pug')
const rename = require('gulp-rename')
const cleanCSS = require('gulp-clean-css')
const concatCss = require('gulp-concat-css')
const browserSync = require('browser-sync').create()

const renamePug = path => Object.assign({}, path, { extname: '.html', })

/* directory names */
const SRC = 'src'
const PUBLIC = 'public'
const STYLES = 'styles'
const TEMPLATES = 'templates'
const FONTS = 'fonts'

/* task names */
const PUG = 'pug'
const CSS = 'css'
const BROWSERSYNC = 'browsersync'
const WATCH = 'watch'
const COPY = 'copy'

/* tasks */

gulp.task(COPY, () => {
  const srcPath = path.join(SRC, FONTS, '*.ttf')
  const destPath = path.join(PUBLIC, FONTS)
  return gulp.src(srcPath).pipe(gulp.dest(destPath))
})

gulp.task(PUG, () => {
  const srcPath = path.join(SRC, TEMPLATES, '/views/*.pug')
  return gulp
    .src(srcPath)
    .pipe(pug({ pretty: true, }))
    .pipe(rename(path => renamePug(path)))
    .pipe(gulp.dest(PUBLIC))
    .pipe(
      browserSync.reload({
        stream: true,
      })
    )
})

gulp.task(CSS, () => {
  const srcPath = path.join(SRC, STYLES, 'index.css')
  const destPath = path.join(PUBLIC, STYLES)
  const fileName = 'main.css'
  const cleanOptions = { compatibility: 'ie8', }

  return gulp
    .src(srcPath)
    .pipe(concatCss(fileName))
    .pipe(cleanCSS(cleanOptions))
    .pipe(gulp.dest(destPath))
    .pipe(
      browserSync.reload({
        stream: true,
      })
    )
})

gulp.task(BROWSERSYNC, () => {
  browserSync.init({
    server: {
      baseDir: PUBLIC,
    },
  })
})

gulp.task(WATCH, [ BROWSERSYNC, COPY, PUG, CSS, ], () => {
  gulp.watch(path.join(SRC, TEMPLATES, '**', '*.pug'), [ PUG, ])
  gulp.watch(path.join(SRC, STYLES, '*.css'), [ CSS, ])
})
