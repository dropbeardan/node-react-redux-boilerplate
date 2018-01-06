const gulp = require('gulp');
const gutil = require('gutil');
const install = require('gulp-install');
const path = require('path');

const buildEnv = process.env.NODE_ENV;

const tasks = {
    test: ['build-app', 'npm-install'],
    production: ['build-app']
};

gulp.task('default', tasks[process.env.NODE_ENV], () => {
    gutil.log('Gulp Tasks Completed.');
});

gulp.task('build-app', async () => {
    let srcDir = path.join(__dirname);
    let outputDir = path.join(__dirname, '..', 'build', buildEnv, 'server');

    gutil.log(`Transferring SRC, process.yml and package.json files from ${srcDir} to ${outputDir}.`);

    gulp
        .src([
            `!${path.join(srcDir, 'src', '**', 'tests/')}`,
            `!${path.join(srcDir, 'src', '**', 'tests', '**', '*')}`,
            path.join(srcDir, 'src', '**', '*'),
            path.join(srcDir, 'process.yml'),
            path.join(srcDir, 'package.json'),
            path.join(srcDir, 'pm2config.json')
        ])
        .pipe(gulp.dest(outputDir));

    gutil.log(`Files successfully transferred.`);
});

gulp.task('npm-install', async () => {
    let configRoot = path.join(__dirname, '..', 'build', buildEnv, 'server');

    gutil.log(`Installing NPM modules to ${configRoot}.`);

    gulp.src([path.join(configRoot, 'package.json')])
        .pipe(install({
            production: true
        }));
});