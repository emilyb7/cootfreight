/* eslint-disable no-console */

const del = require('del')
const path = require('path')
const gulp = require('gulp')
const pug = require('gulp-pug')
const rename = require('gulp-rename')
const cleanCSS = require('gulp-clean-css')
const concatCss = require('gulp-concat-css')
const browserSync = require('browser-sync').create()

/* content to be injected into pug templates */
const content = require('./src/content/')

/* helper functions */
const renamePug = path => Object.assign({}, path, { extname: '.html', })

/* CONSTANTS */
/* directory names */
const SRC = 'src'
const PUBLIC = 'public'
const STYLES = 'styles'
const TEMPLATES = 'templates'
const FONTS = 'fonts'
const IMAGES = 'images'
const CONTENT = 'content'

/* task names */
const PUG = 'pug'
const CSS = 'css'
const BROWSERSYNC = 'browsersync'
const WATCH = 'watch'
const BUILD = 'build'
const CLEAN = 'clean'
const COPY_FONTS = 'copyfonts'
const COPY_IMAGES = 'copyimages'
const COPY_FAVICON = 'copyfavicon'

/* tasks */
gulp.task(CLEAN, () => {
  return del(PUBLIC)
})

gulp.task(COPY_FONTS, () => {
  const srcPath = path.join(SRC, FONTS, '*.ttf')
  const destPath = path.join(PUBLIC, FONTS)
  return gulp.src(srcPath).pipe(gulp.dest(destPath))
})

gulp.task(COPY_IMAGES, () => {
  const srcPath = path.join(SRC, IMAGES, '*.png')
  const destPath = path.join(PUBLIC, IMAGES)
  return gulp.src(srcPath).pipe(gulp.dest(destPath))
})

gulp.task(COPY_FAVICON, () => {
  const srcPath = path.join(SRC, 'favicon.ico')
  return gulp.src(srcPath).pipe(gulp.dest(PUBLIC))
})

gulp.task(PUG, () => {
  const srcPath = path.join(SRC, TEMPLATES, '/views/*.pug')
  return gulp
    .src(srcPath)
    .pipe(pug({ pretty: true, locals: content, }))
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
  const cleanOptions = { compatibility: 'ie8', rebase: false, }

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

gulp.task(
  WATCH,
  [ BROWSERSYNC, COPY_FONTS, COPY_IMAGES, COPY_FAVICON, PUG, CSS, ],
  () => {
    gulp.watch(path.join(SRC, TEMPLATES, '**', '*.pug'), [ PUG, ])
    gulp.watch(path.join(SRC, CONTENT, '**', '*.js'), [ PUG, ])
    gulp.watch(path.join(SRC, STYLES, '*.css'), [ CSS, ])
  }
)

gulp.task(BUILD, [ CLEAN, COPY_FONTS, COPY_IMAGES, COPY_FAVICON, PUG, CSS, ])
