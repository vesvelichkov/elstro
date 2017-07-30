var gulp        = require('gulp'),
    gutil       = require('gulp-util'),
    sass        = require('gulp-sass'),
    concat      = require('gulp-concat'),
    cssnano     = require('gulp-cssnano'),
    fileinclude = require('gulp-file-include'),
    uglify      = require('gulp-uglify'),
    watch       = require('gulp-watch'),
    rename      = require('gulp-rename'),
    stripDebug  = require('gulp-strip-debug'),
    prefix      = require('gulp-autoprefixer'),
    imagemin    = require('gulp-imagemin'),
    del         = require('del'),
    pngquant    = require('imagemin-pngquant');


// A list of JS files to compile,
// add any new JS file here.
var sourceFilesJs = [
    // 'node_modules/angular/angular.min.js',
    'resources/js/**/*.js'
];

var destDirJs  = 'build/js',
    destFileJs = 'app.js';

var destDirCss = 'build/css',
    destFileCss = 'app.css';

function swallowError (error) {
    console.log(error.toString());
    this.emit('end');
}

// Compile Sass
gulp.task('sass', function () {
    return gulp.src('resources/sass/master.scss')
        .pipe(sass({
            includePaths: ['node_modules'],
            outputStyle: 'compact'
        }))
        .on('error', swallowError)
        // .pipe(prefix({
        //     browsers: ['> 1%', 'ie > 8', 'last 2 versions', 'Firefox ESR', 'Opera 12.1', 'Android 4.4', 'Firefox ESR'],
        //     cascade: true
        // }))
        //.pipe(cssnano())
        .pipe(rename(destFileCss))
        .pipe(gulp.dest(destDirCss));
});

// Compile JS
gulp.task('js', function () {
    return gulp.src(sourceFilesJs)
        .pipe(concat('scripts.js'))
        // .pipe(uglify())
        // .pipe(stripDebug())
        .on('error', swallowError)
        .pipe(rename(destFileJs))
        .pipe(gulp.dest(destDirJs));
});

// Copy angular js files to js root
gulp.task('angularjs', function () {
    return gulp.src('node_modules/angular/angular.min.js')
        .on('error', swallowError)
        .pipe(gulp.dest(destDirJs));
});

// Copy angular js files to js root
gulp.task('angularjs-msg', function () {
    return gulp.src('node_modules/angular-messages/angular-messages.min.js')
        .on('error', swallowError)
        .pipe(gulp.dest(destDirJs));
});

// Copy html files to build dir
gulp.task('html', function() {
    return gulp.src('resources/html/index.html')
        .pipe(fileinclude({
          prefix: '@@',
          indent: true,
          basepath: '@file'
        }))
        .on('error', swallowError)
        .pipe(gulp.dest('build'));
});

// Copy font files to build root
gulp.task('fonts', function () {
    return gulp.src('resources/fonts/**/*')
        .on('error', swallowError)
        .pipe(gulp.dest('build/fonts'));
});


// Optimize and move images.
gulp.task('imagemin', function () {
    return gulp.src([
        'resources/images/**/*.png',
        'resources/images/**/*.jpg',
        'resources/images/**/*.gif',
        'resources/images/**/*.jpeg',
        'resources/images/**/*.svg'
        ])
        .pipe(imagemin({
            optimizationLevel: 5,
            progressive: true,
            use: [pngquant({quality: '80-100', speed: 3})]
        }))
        .pipe(gulp.dest('build/images'));
});

// Watch Sass and JS files and compile them in dev mode.
gulp.task('watch', ['html', 'sass', 'js', 'imagemin'], function() {
    gulp.watch('resources/html/**/*.html', ['html']);
    gulp.watch('resources/sass/**/*.scss', ['sass']);
    gulp.watch('resources/js/**/*.js', ['js']);
});

// Compile Sass, JS and images, then start watching.
gulp.task('default', [
    'angularjs',
    'angularjs-msg',
    'fonts',
    'html',
    'sass',
    'js',
    'imagemin',
    'watch'
]);
