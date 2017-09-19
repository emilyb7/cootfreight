/* eslint-disable no-console */

const del = require('del')
const path = require('path')
const fs = require('fs')
const gulp = require('gulp')
const pug = require('gulp-pug')
const rename = require('gulp-rename')
const cleanCSS = require('gulp-clean-css')
const concatCss = require('gulp-concat-css')
const data = require('gulp-data')
const wait = require('gulp-wait')
const insert = require('gulp-insert')
const browserSync = require('browser-sync').create()

/* content to be injected into pug templates */
const locals = require('./src/content/locals')

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
const VIEWS = 'views'
const CONFIG = 'config'

/* task names */
const PUG = 'pug'
const CSS = 'css'
const BROWSERSYNC = 'browsersync'
const WATCH = 'watch'
const BUILD = 'build'
const CLEAN = 'clean'
const COPY = 'copy'
const COPY_FONTS = 'copyfonts'
const COPY_IMAGES = 'copyimages'
const COPY_FAVICON = 'copyfavicon'
const PUG_PROD = 'pug_prod'

/* tasks */
gulp.task(CLEAN, () => {
  return del(PUBLIC)
})

gulp.task(COPY_FONTS, () => {
  const srcPath = path.join(SRC, FONTS, '*.ttf')
  const destPath = path.join(PUBLIC, FONTS)
  return gulp.src(srcPath).pipe(gulp.dest(destPath))
})

gulp.task(COPY_IMAGES, [ CLEAN, ], () => {
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
    .pipe(
      data(file => {
        const filename = path.basename(file.path, '.pug')
        const dataPath = path.join(
          __dirname,
          SRC,
          CONTENT,
          VIEWS,
          filename + '.js'
        )
        const view = require(dataPath)
        return Object.assign({}, { view, }, locals)
      })
    )
    .pipe(pug({ pretty: true, }))
    .pipe(rename(path => renamePug(path)))
    .pipe(gulp.dest(PUBLIC))
    .pipe(wait(1000))
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
    gulp.watch(path.join(SRC, CONTENT, 'markdown', '*.md'), [ PUG, ])
    gulp.watch(path.join(SRC, STYLES, '*.css'), [ CSS, ])
  }
)

gulp.task(PUG_PROD, [ PUG, ], () => {
  const srcPath = path.join(PUBLIC, '*.html')

  return gulp
    .src(srcPath)
    .pipe(
      insert.transform((contents, file) => {
        const filename = path.basename(file.path, '.html')
        const configPath = path.join(__dirname, SRC, CONFIG, filename + '.yml')
        if (fs.existsSync(configPath)) {
          console.log(fs.readFileSync(configPath))
          return fs.readFileSync(configPath).toString() + contents
        } else return contents
      })
    )
    .pipe(gulp.dest(PUBLIC))
})

gulp.task(COPY, [ COPY_FONTS, COPY_IMAGES, COPY_FAVICON, ])

gulp.task(BUILD, [ COPY, PUG_PROD, CSS, ])
