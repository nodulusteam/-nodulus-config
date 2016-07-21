var gulp = require('gulp');
var bump = require('gulp-bump');
var path = require('path');
var ignore = require('gulp-ignore');
var runSequence = require('run-sequence');
var del = require('del');
var fs = require('fs'),
    publish = require('gulp-publish'),
    tsc = require('gulp-typescript'),
    tslint = require('gulp-tslint'),

    Config = require('./gulpfile.config'),
    tsProject = tsc.createProject('./tsconfig.json');

 
var config = new Config();




gulp.task('npm', function (done) {
    var run = require('gulp-run');
    return run('npm publish').exec().pipe(gulp.dest('output'));
});



gulp.task('bump', function () {
    gulp.src('./package.json')
        .pipe(bump())
        .pipe(gulp.dest('./'));
});



 


/**
 * Lint all custom TypeScript files.
 */
gulp.task('ts-lint', function () {
    return gulp.src(config.allTypeScript).pipe(tslint({
        formatter: "prose"
    }))
        .pipe(tslint.report({
            emitError: false
        }));

});

/**
 * Compile TypeScript and include references to library and app .d.ts files.
 */
gulp.task('compile-ts', function () {
    var sourceTsFiles = [config.allTypeScript,                //path to typescript files
        config.libraryTypeScriptDefinitions]; //reference to library .d.ts files


    var tsResult = gulp.src(sourceTsFiles)
        .pipe(tsc(tsProject));

    tsResult.dts.pipe(gulp.dest(config.tsOutputPath));
    return tsResult.js
        // .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(config.tsOutputPath));
});

/**
 * Remove all generated JavaScript files from TypeScript compilation.
 */
gulp.task('clean-ts', function (cb) {
    var typeScriptGenFiles = [
        config.tsOutputPath + '/**/*.js',    // path to all JS files auto gen'd by editor
        config.tsOutputPath + '/**/*.js.map', // path to all sourcemap files auto gen'd by editor
        '!' + config.tsOutputPath + '/lib'
    ];

    // delete the files
    del(typeScriptGenFiles, cb);
});




gulp.task('build', function () {
    runSequence(['ts-lint', 'compile-ts'], 'npm');
});


// var install = require("gulp-install");
// gulp.task('npm-install', function () {
//     gulp.src(['./release/package.json'])
//         .pipe(install({ production: true, noOptional: true }));
// });

gulp.task('default', ['bump', 'build']);
