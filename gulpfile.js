const gulp = require('gulp')
const nodemon = require('gulp-nodemon')
const babel = require('gulp-babel');
const replace = require('gulp-replace');
const gulpSequence = require('gulp-sequence')
const sass = require('gulp-sass')
const uglify = require('gulp-uglify')
const minifyCss = require('gulp-clean-css')
const clean = require('gulp-clean')
let buildUrl = './dist'

/*---------------------------------------------dev------------------------------------------------------------------*/
var jsScript = 'node'
if (process.env.npm_config_argv !== undefined && process.env.npm_config_argv.indexOf('debug') > 0) {
    jsScript = 'node debug'
}
gulp.task('nodemon', function() {
    return nodemon({
        script: 'build/server.js',
        restartable:'rs',
        execMap: {
            js: jsScript
        },
        verbose: true,
        ignore: ['build/*.js', 'dist/*.js',
            'src/public/**',
            'nodemon.json', '.git', 'node_modules/**/node_modules',
            'gulpfile.js'
        ],
        env: {
            NODE_ENV: 'development'
        },
        ext: 'js json html'
    })
})



gulp.task('sass', function() {
    return gulp.src(['./src/public/sass/*.scss'])
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./src/public/css'));
});


gulp.task('watch', function() {
    return gulp.watch('./src/public/sass/*.scss', ['sass']);
});

gulp.task('default', ['nodemon', 'sass','watch']);

/*---------------------------------------------------------- build ---------------------------------------------------*/
// 清除文件
gulp.task('clean:dist', function() {
    return gulp.src(['./dist', './dist/test/'], {
        read: false
    })
        .pipe(clean());
});

//复制所有文件
gulp.task('copy-all', () => {
    return gulp.src(["./src/**"])
        .pipe(gulp.dest(buildUrl))
});



// 编译前端js
gulp.task('babel', () => {
    return gulp.src([buildUrl+'/public/js/*.js'])
        .pipe(babel({
            "presets": ["es2017"],
            "plugins": ["transform-es2015-modules-commonjs"]
        }))
        .pipe(gulp.dest(buildUrl+ "/assets/js"));
});



// babel 编译后端js
gulp.task('babel:server:gen', () => {
    return gulp.src(buildUrl+'/*.js')
        .pipe(babel({
            "presets": ["es2017"],
            "plugins": ["transform-es2015-modules-commonjs"]
        }))
        .pipe(gulp.dest(buildUrl));
});


gulp.task('babel:server:con', () => {
    return gulp.src(buildUrl+'/controllers/*.js')
        .pipe(babel({
            "presets": ["es2017"],
            "plugins": ["transform-es2015-modules-commonjs"]
        }))
        .pipe(gulp.dest(buildUrl+'/controllers'));
});


gulp.task('babel:server:routers', () => {
    return gulp.src(buildUrl+'/routes/*.js')
        .pipe(babel({
            "presets": ["es2017"],
            "plugins": ["transform-es2015-modules-commonjs"]
        }))
        .pipe(gulp.dest(buildUrl+'/routes'));
});


gulp.task('babel:server:tool', () => {
    return gulp.src(buildUrl+'/tool/*.js')
        .pipe(babel({
            "presets": ["es2017"],
            "plugins": ["transform-es2015-modules-commonjs"]
        }))
        .pipe(gulp.dest(buildUrl+'/tool'));
});




// 压缩所有前端js
gulp.task('js:minify', function() {
    return gulp.src([buildUrl+'/public/js/*.js'])
        .pipe(uglify())
        .pipe(gulp.dest(buildUrl+'/public/js/'));
});

// 压缩前端所有css
gulp.task('css:minify', function() {
    return gulp.src([buildUrl+'/public/css/*.css'])
        .pipe(minifyCss())
        .pipe(gulp.dest(buildUrl+'/public/css/'));
});



//replace
gulp.task('replace:config', function() {
    return gulp.src([buildUrl + '/config.js'])
        .pipe(replace('http://127.0.0.1:18080', 'http://xxx.com'))
        .pipe(replace(/PASSWORD(.+)?123456'/, "PASSWORD:'root'"))
        .pipe(replace('use(KoaLogger())', ""))
        .pipe(gulp.dest(buildUrl));
});


gulp.task('build', gulpSequence(
    'clean:dist', 'copy-all','babel','replace:config',['js:minify', 'css:minify'],
    ['babel:server:gen','babel:server:con','babel:server:routers',
        'babel:server:tool']
));


