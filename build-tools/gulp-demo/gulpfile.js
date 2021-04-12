// gulp的入口文件

const { src, dest, parallel, series, watch } = require('gulp');
const del = require('del');
// const sass = require('gulp-sass');
// const babel = require('gulp-babel');
// const swig = require('gulp-swig');
// const imagemin = require('gulp-imagemin');
const loadPlugins = require('gulp-load-plugins');
const browserSync = require('browser-sync');

const clean = () => del(['dist', '.temp']);

const plugins = loadPlugins();

const bs = browserSync.create();

const style = () => {
  return src('src/assets/styles/*.scss', { base: 'src' })
    .pipe(plugins.sass())
    .pipe(dest('.temp'))
    .pipe(bs.reload({ stream: true }));
};

const script = () => {
  return src('src/assets/scripts/*.js', { base: 'src' })
    .pipe(
      plugins.babel({
        presets: ['@babel/preset-env'],
      })
    )
    .pipe(dest('.temp'))
    .pipe(bs.reload({ stream: true }));
};

const data = {
  pkg: require('./package.json'),
};

const page = () => {
  return src('src/*.html', { base: 'src' })
    .pipe(plugins.swig({ defaults: { cache: false }, data }))
    .pipe(dest('.temp'))
    .pipe(bs.reload({ stream: true }));
};

const image = () => {
  return src('src/assets/images/**', { base: 'src' })
    .pipe(plugins.imagemin())
    .pipe(dest('dist'));
};

const font = () => {
  return src('src/assets/fonts/**', { base: 'src' })
    .pipe(plugins.imagemin())
    .pipe(dest('dist'));
};

const serve = () => {
  watch('src/assets/styles/*.scss', style);
  watch('src/assets/scripts/*.js', script);
  watch('src/*.html', page);

  watch(
    ['src/assets/images/**', 'src/assets/fonts/**', 'public/**'],
    bs.reload
  );

  bs.init({
    // files: 'dist/**',
    server: {
      baseDir: ['.temp', 'src', 'public'],
    },
  });
};

const useref = () => {
  return src('.temp/**.html', { base: 'src' })
    .pipe(plugins.useref({ searchPath: ['dist', '.'] }))
    .pipe(plugins.if(/\.js$/, plugins.uglify()))
    .pipe(plugins.if(/\.css$/, plugins.cleanCss()))
    .pipe(
      plugins.if(
        /\.html$/,
        plugins.htmlmin({
          collapseWhitespace: true,
          minifyCss: true,
          minifyJs: true,
        })
      )
    )
    .pipe(dest('dist'))
};

const compile = parallel(style, script, page);

const build = series(clean, parallel(series(compile, useref), image, font));

const dev = series(compile, serve);

module.exports = {
  clean,
  compile,
  build,
  dev,
  useref,
};
