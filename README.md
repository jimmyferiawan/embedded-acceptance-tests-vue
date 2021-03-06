# Embedded Vue Acceptance Testing with Karma and Jasmine

This demo is comprised of seven javascript bundlers each configured to run the tests.  The Bootstrap single page application retains functionality among the bundlers with only minor code change.  The javascript framework used is Vue and instrumentation is done with Gulp and Karma.  So you can pick your poison, Stealjs, Webpack, Browserify, Fusebox, Rollup, Parcel or Brunch. The demo was orginally developed using the Canjs framework which can be found at https://github.com/DaveO-Home/embedded-acceptance-tests.

__Note__; the demo was not developed to compare software, rather simply to demonstrate how one might embed test code as part of the build process.  And the configuration also shows how to develop using hot module reload and test driven development.

## Installation

**Desktop:**

  clone the repository or download the .zip

**Install Assumptions:**

  1. OS Linux or Windows(Tested on Windows10)
  1. Node and npm
  1. Gulp
  1. Google Chrome
  1. Firefox

**Server:**

  `cd` to top level directory `<install>/acceptance-tests`

```bash
  npm install
```

  This will install a small Node/Express setup to view the results of a production build.

  `cd <install>/acceptance-tests/public`

```bash
  npm install
```

  To install all required dependencies. Also install the global package for Brunch, `npm install brunch -g`.

**Client:**

Test builds will generate bundles in 'dist_test' and production in the 'dist' directory at the root level, 'public'.

## Production Build

To generate a build "cd to `public/<bundler>/build` and type `gulp`, e.g.

```bash
  cd public/fusebox/build
  gulp
```

If the tests succeed then the build should complete.

To run the production application:

  1. `cd <install>/acceptance_tests`
  1. `npm start`  -  This should start a Node Server with port 3080.
  1. Start a browser and enter `localhost:3080/dist/<bundler>/appl/testapp.html`
  1. For Brunch the Production Url is `localhost:3080/dist/brunch/testapp.html` or `localhost:3080/dist/brunch`
  1. For Parcel the Production Url is `localhost:3080/dist/parcel/testapp.html`

You can repeat the procedure with "webpack", "browserify", "stealjs", "brunch", "parcel" or "rollup". Output from the build can be logged by setting the environment variable `USE_LOGFILE=true`.

Normally you can also run the test bundles(dist_test) from the node express server. However, when switching between development karma testing and running the test(dist_test) application, some resources are not found because of the "base/dist_test" URL. To fix this run `gulp rebuild` from the `<bundler>/build` directory.

## Test Build

The test build simply runs the tests in headless mode. The default browsers are ChromeHeadless and FirefoxHeadless.  To change the default you can set an environment variable; e.g.

```bash
  export USE_BROWSERS=ChromeHeadless,Opera
```

to remove FirefoxHeadless from the browser list and add Opera.  You can also set this environment variable for a production build.

To run the tests "cd to `public/<bundler>/build` and type `gulp test`, e.g.

```bash
  cd public/webpack/build
  gulp test
```

A test result might look like;

```text
  Suite for Unit Tests
    ✔ Verify that browser supports Promises
    ✔ ES6 Support
    ✔ blockStrip to remove Canjs block of code
  Unit Tests - Suite 2
    ✔ Is Karma active
    ✔ Verify NaN
  Popper Defined - required for Bootstrap
    ✔ is JQuery defined
    ✔ is Popper defined
  Application Unit test suite - AppTest
    ✔ Is Welcome Page Loaded
    ✔ Is Tools Table Loaded
    Test Router: table/tools
      ✔ controller set: table
      ✔ action set: tools
      ✔ dispatch called: table
    ✔ Is Pdf Loaded
    Test Router: pdf/test
      ✔ controller set: pdf
      ✔ action set: test
      ✔ dispatch called: pdf
    Load new tools page
      ✔ setup and change event executed.
      ✔ new page loaded on change.
    Contact Form Validation
      ✔ Contact form - verify required fields
      ✔ Contact form - validate populated fields, email mismatch.
      ✔ Contact form - validate email with valid email address.
      ✔ Contact form - validate form submission.
    Popup Login Form
      ✔ Login form - verify modal with login loaded
      ✔ Login form - verify cancel and removed from DOM

Finished in 13.883 secs / 9.677 secs @ 13:26:11 GMT-0800 (PST)

SUMMARY:
✔ 48 tests completed
```

## Development

__Note__; When modifying project assets(.handlebars, .html, etc.) you can execute `gulp copy` from the `public/<bundler>/build` directory to preview changes. This is not required for __StealJs__.

__A word on developing tests__; You can write and execute tests quicker by using the rebuild process of a given bundler and running the `acceptance` gulp task after the auto-rebuild, e.g. with __Rollup__ you can;

  * `cd public/rollup/build`
  * `gulp watch`
  * Develop or modify a test.
  * In another window execute `gulp acceptance` from the `build` directory to view the modified or new test results.

### I.  **Browserify**

1\. ***Development Server Window*** -

   * `cd public/browserify/build`
   * `gulp server`

   Browsersync will start a browser tab(default Chrome) with `localhost:3080/dist_test/browserify/appl/testapp_dev.html`.  Any changes to the source code(*.js files) should be reflected in the browser auto reload.

2\. ***Hot Module Reload(HMR) Window*** -

   * `cd public/browserify/build`
   * `gulp hmr`

   The `watchify` plugin will remain active to rebuild the bundle on code change.

3\. ***Test Driven Development(tdd) Window*** -

   * `cd public/browserify/build`
   * `gulp tdd`

   Tests will rerun as source code(*.js) is changed. Note, tests can be added or removed as code is developed. Both Chrome and Firefox are the default browsers. This can be overridden with an environment variable, `export USE_BROWSERS=Opera`.  Note, you do not need `hmr` active for `tdd`. Also, `tdd` can be run with a headless browser.

### II.  **Brunch**

1\. ***Watch, Recompile and Reload Window*** -

  * `cd public/brunch/build`
  * `gulp watch` or `./cook watch` (output formatted better)

At this point you can start a browser and enter `localhost:3080/`. Any changes to the source code(*.js files and other assets such as *.html) should be reflected in the browser auto reload.

__Note__; The test url is `localhost:3080` since Brunch by default uses 'config.paths.public' as the server context. Also, the reload may fail at times, I've noticed that making a second code mod re-rights the ship.

2\. ***Test Driven Development(tdd) Window*** -

  * `cd public/brunch/build`
  * `gulp tdd` or `./cook tdd`

  While the Brunch watcher is running, tests are re-run when code are changed. 
  
  __Note__; tests can be added or removed as code is developed. Both Chrome and Firefox are the default browsers. This can be overridden with an environment variable, `export USE_BROWSERS=Opera`.

3\. ***Special Considerations***
  
  * Brunch plugin eslint-brunch uses eslint 3. The demo/vue uses version 4.  The `gulp`(production build) command uses a gulp linter, so javascript linting is executed. However, if you wish to use the Brunch eslint-brunch plugin, do the following;
    * `cd <install>/public/node_modules/eslint-brunch`
    * `npm install eslint@latest`
    * `cd <install>/public` and edit the `brunch-config.js` file and uncomment the eslint section.
  * Using the local custom plugin for stripping development code. The application from the production build will work with the development code embedded, however to strip the code, do the following;
    * `cd <install>/public/brunch/appl/js/stripcode-brunch`
    * `npm link`
    * `cd <install>/public`
    * `npm link stripcode-brunch`
    * Edit `brunch-config.js` and uncomment the `stripcode` plugin section.
    * Edit `package.json` and in devDependencies section add `"stripcode-brunch": "^0.1.1"`. Development Code will be stripped during the production build.

### III.  **Fusebox**

1\. ***Hot Module Reload(HMR) Server Window*** -

   * `cd public/fusebox/build`
   * `gulp hmr` or `fuse hmr`

   At this point you can start a browser and enter `localhost:3080/fusebox/appl/testapp_dev.html` or `localhost:3080/dist_test/fusebox/appl/testapp_dev.html`.  Any changes to the source code(*.js files) should be reflected in the browser auto reload.

2\. ***Test Driven Development(tdd) Window*** -

   * `cd public/fusebox/build`
   * `gulp tdd`

   The HMR Server must be running if you want tests to rerun as source code(*.js) is changed. Note, tests can be added or removed as code is developed. Both Chrome and Firefox are the default browsers. This can be overridden with an environment variable, `export USE_BROWSERS=Opera`. A warning is issued under `tdd`(404: /dist_test/fusebox/resources) since `hmr` requires a non-karma build, this can be ignored.

### IV.  **Parcel**

1\. ***Watch, Recompile and Reload Window*** -

  * `cd public/parcel/build`
  * `gulp watch`

At this point you can start a browser and enter `localhost:3080/dist_test/parcel/testapp_dev.html` (configured to auto open browser tab). Any changes to the source code(*.js and *.css files) should be reflected in the browser auto reload.

2\. ***Test Driven Development(tdd) Window*** -

  * `cd public/parcel/build`
  * `gulp tdd`

  While the Parcel watcher is running, tests are re-run when code are changed.
  
  * Using `export USE_BUNDLER=false` - When using `gulp watch & gulp tdd` together, you can set USE_BUNDLER to false to startup TDD without building first, `gulp watch` does the test build.  Also, by settting `USE_BUNDLER=false` before `gulp`(production build), only testing and linting will execute.

  __Note__; tests can be added or removed as code is developed. Both Chrome and Firefox are the default browsers. This can be overridden with an environment variable, `export USE_BROWSERS=Opera`.

3\. ***Special Considerations***
  
  * Using the local custom plugin for stripping development code. The application from the production build will work with the development code embedded, however to strip the code, do the following;
    * `cd <install>/public/parcel/appl/js/parcel-plugin-strip`
    * `npm link`
    * `cd <install>/public`
    * `npm link parcel-plugin-strip`
    * Edit `package.json` and in devDependencies section add `"parcel-plugin-strip": "^0.1.1"`. Development code will be stripped during the production build.
  * As of parcel 1.8.1, there is a compatibility issue with bootstrap 4.1. This demo is using a CDN to link bootstrap css on the main pages, testapp_dev.html and testapp.html. Another solution is to upgrade cssnano to @next under parcel-bundler.

### V.  **Rollup**

1\. ***Development Server Window*** -

   * `cd public/rollup/build`
   * `gulp watch`

   The Rollup Development Server, Watch(auto-rebuild) and Page Reload functions are started together.  Simply use one of the following URLs in any browser; `localhost:3080/rollup/appl/testapp_dev.html` or `localhost:3080/dist_test/rollup/appl/testapp_dev.html`.

2\. ***Test Driven Development(tdd) Window*** -

   * `cd public/rollup/build`
   * `gulp tdd`

   Tests will rerun as source code(*.js) is changed. Note, tests can be added or removed as code is developed. Both Chrome and Firefox are the default browsers. This can be overridden with an environment variable, `export USE_BROWSERS=Opera`.

### VI. **Stealjs**

1\. ***Development Server Window*** -

   * `cd public/stealjs/build`
   * `gulp server`


2\. ***Live-Reload(HMR) Window*** -

   * `cd public/stealjs/build`
   * `gulp hmr`

   At this point you can start a browser and enter `localhost:3080/stealjs/appl/testapp_dev.html`(please note that dist_test is not in the URL).  Any changes to the source code(*.js files) should be reflected in the browser auto reload.  The `gulp hmr` by default builds a vendor bundle for faster reload.  When you are not modifying the node_modules directory, subsequent executions of `gulp hmr` do not need the vendor bundle build. You can disable by setting an environment variable, `export USE_VENDOR_BUILD=false`.

   Stealjs does not require a dist_test build. It runs development directly from the source(nice!). However, when starting `hmr` a vendor bundle is produced at public/dev-bundle.js for `hmr` performance. The bundle is accessed from the `testapp_dev.html` page, via a `deps-bundle` attribute.

3\. ***Test Driven Development(tdd) Window*** -

   * `cd public/steal/build`
   * `gulp tdd`

   Tests will rerun as source code(*.js) is changed. Note, tests can be added or removed as code is developed. Both Chrome and Firefox are the default browsers. This can be overridden with an environment variable, `export USE_BROWSERS=Opera`.

### VII. **Webpack**

1\. ***Development HMR Server Window*** -

   * `cd public/webpack/build`
   * `gulp hmr`


2\. ***Hot Module Reload(Watch) Window*** -

   * `cd public/webpack/build`
   * `gulp watch`

   At this point you can start a browser and enter `localhost:3080/dist_test/webpack/appl/testapp_dev.html`.  Any changes to the source code(*.js files) should be reflected in the browser auto reload. Running the application from the source directory should also work, e.g., `localhost:3080/webpack/appl/testapp_dev.html`.

3\. ***Test Driven Development(tdd) Window*** -

   * `cd public/webpack/build`
   * `gulp tdd`

   Tests will rerun as source code(*.js) is changed. Note, tests can be added or removed as code is developed. Both Chrome and Firefox are the default browsers. This can be overridden with an environment variable, `export USE_BROWSERS=Opera`.
