
import './utils/set.globals'
import vm from './entry'
import './config'
import App from './app'
import Default from './utils/default'
import Setup from './utils/setup'
/* develblock:start */
import apptest from '../jasmine/apptest'
/* develblock:end */
import 'tablesorter'
import '../../../node_modules/tablesorter/dist/js/extras/jquery.tablesorter.pager.min.js'

App.init(Default)
Setup.init()
/* develblock:start */
// Code between the ..start and ..end tags will be removed by the BlockStrip plugin during the production build.
// testit is true if running under Karma - see testapp_dev.html
if (typeof testit !== 'undefined' && testit) {

    new Promise((resolve, reject) => {
        setTimeout(function () {
            resolve(0)
        }, 500)
    }).catch(rejected => {
        fail(`Error ${rejected}`)
    }).then(resolved => {
        // Run acceptance tests. - To run only unit tests, comment the apptest call.
        apptest(App, vm)
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000
        __karma__.start()
    })
}
/* develblock:end */
