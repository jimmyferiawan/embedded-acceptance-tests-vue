// Karma configuration
var bundler = "stealjs";
module.exports = function (config) {

    if (!global.whichBrowsers) {
        global.whichBrowsers = ["ChromeHeadless, FirefoxHeadless"];
    }
    config.set({
        basePath: '../../',
        frameworks: ['jasmine-jquery', 'jasmine'],
        // list of files / patterns to load in the browser
        files: [
            //Webcomponents for Firefox - used for link tag with import attribute.
            {pattern: bundler + "/appl/jasmine/webcomponents-hi-sd-ce.js", watched: false},
            //Jasmine tests
            bundler + '/tests/unit_*.js',
            //Application and Acceptance specs.
            bundler + '/appl/testapp_karma.html',
            //Module loader - so we can run steal unit tests - see include-all-tests.js
            'node_modules/steal/steal.js',
            {pattern: 'node_modules/steal/**/*.js', watched: false, included: false},
            {pattern: 'node_modules/steal-css/css.js', watched: false, included: false},
            {pattern: 'node_modules/steal-vue/**/*.js', watched: false, included: false},
            {pattern: 'node_modules/**/*.map', watched: false, included: false, served: false},
            {pattern: 'node_modules/bootstrap/**/*.js', watched: false, included: false},
            {pattern: 'node_modules/popper.js/dist/umd/*', watched: false, included: false},
            {pattern: 'node_modules/vue/**/*.js', watched: false, included: false},
            {pattern: 'node_modules/de-indent/index.js', watched: false, included: false},
            {pattern: 'node_modules/he/he.js', watched: false, included: false},
            {pattern: bundler + '/appl/components/**/*.vue', included: false},
            {pattern: bundler + '/appl/App.vue', included: false},
            {pattern: 'node_modules/vue-*/**/*.js', watched: false, included: false},
            {pattern: bundler + '/appl/*.js', included: false},
            {pattern: bundler + '/appl/js/**/*.js', included: false},
            {pattern: 'node_modules/**/package.json', watched: false, included: false},
            {pattern: 'node_modules/jquery/**/*.js', watched: false, served: true, included: false},
            {pattern: 'node_modules/tablesorter/**/*.js', watched: false, served: true, included: false},
            {pattern: 'package.json', watched: false, included: false},
            {pattern: 'node_modules/lodash-es/**/*js', watched: false, included: false},
            {pattern: 'node_modules/moment/**/*.js', watched: false, included: false},
            {pattern: 'node_modules/handlebars/dist/**/*.js', watched: false, included: false},
            {pattern: 'README.md', included: false},
            {pattern: 'index.js', included: false, served: false, watched: false},
            {pattern: bundler + '/appl/**/*.html', included: false},
            {pattern: 'dev-bundle.js', watched: false, included: false},
            //Test suites
            {pattern: bundler + '/appl/jasmine/**/*test.js', included: false},
            //end Test suites
            {pattern: bundler + '/images/favicon.ico', included: false},
            {pattern: 'node_modules/bootstrap/dist/css/bootstrap.min.css', watched: false, included: false},
            {pattern: 'node_modules/tablesorter/dist/css/theme.blue.min.css', watched: false, included: false},
            {pattern: 'node_modules/tablesorter/dist/css/jquery.tablesorter.pager.min.css', watched: false, included: false},
            {pattern: bundler + '/appl/templates/stache/*.stache', included: false},
            {pattern: bundler + '/appl/templates/*.json', included: false},
            {pattern: bundler + '/appl/views/prod/Test.pdf', included: false},
            {pattern: bundler + '/appl/css/**/*.css', included: false},
            {pattern: 'node_modules/steal-css/**/*.js', watched: false, included: false},
            {pattern: 'node_modules/font-awesome/css/font-awesome.css', watched: false, included: false},
            {pattern: 'node_modules/font-awesome/fonts/fontawesome-webfont.woff2', watched: false, included: false},
            //Jasmine/Steal tests and starts Karma
            bundler + '/build/karma.bootstrap.js'
        ],
        bowerPackages: [
        ],
        plugins: [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-opera-launcher',
            'karma-jasmine',
            'karma-jasmine-jquery',
            'karma-mocha-reporter'
        ],
        /* Karma uses <link href="/base/appl/testapp_dev.html" rel="import"> -- you will need webcomponents polyfill to use browsers other than Chrome.
         * This test demo will work with Chrome/ChromeHeadless by default - Webcomponents included above, so FirefoxHeadless should work also. 
         * Other browsers may work with tdd.
         */
        browsers: global.whichBrowsers,
        customLaunchers: {
            FirefoxHeadless: {
                base: 'Firefox',
                flags: ['--headless']
            }
        },
        browserNoActivityTimeout: 0,
        exclude: [
        ],
        preprocessors: {
            '*/**/*.html': []
        },
        reporters: ['mocha'],
        port: 9876,
        colors: true,
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_WARN,
        autoWatch: true,
        singleRun: false,
        loggers: [{
                type: 'console'
            }
        ],
        client: {
            captureConsole: true,
            clearContext: true
        },
        concurrency: 5, //Infinity
    });
};
