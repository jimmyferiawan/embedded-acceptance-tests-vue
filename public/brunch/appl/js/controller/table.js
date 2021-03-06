
import App from '../app'
import Base from '../utils/base.control'
Base.init()
export default App.controllers['Table'] || (App.controllers['Table'] = Object.assign({ // new (Base.extend({
    defaults: {
    },
    name: 'table',
    tools (data) {
        const toolsUrl = 'templates/stache/'
        if (this.base || window.testit) {
            this.baseUrl = `base/${window._bundler}/appl/`
        }
        this.view({
            controller: 'table',
            action: 'tools',
            templateUrl: this.baseUrl + toolsUrl,
            template: 'tools.stache',
            list: true,
            loading: true,
            vue: true
        })
    },
    decorateTable (elementId) {
        const id = `#${elementId}`
        let headers

        const pageSorter = {
            container: $('.ts-pager'),
            cssGoto: '.pagenum',
            removeRows: false,
            output: '{startRow} - {endRow} / {filteredRows} ({totalRows})',
            updateArrows: true,
            page: 0,
            size: 10
        }

        let defaultPage = [1, 10]

        if (elementId === 'tools') {
            headers = { '.disabled': { sorter: false, filter: false } }
            defaultPage = [1, 20]
        }

        $(id).tablesorter({
            theme: 'blue',
            widthFixed: true,
            headers,
            headerTemplate: '{content} {icon}',
            widgets: ['filter', 'columns', 'resizeable', 'zebra'],
            widgetOptions: {
                zebra: ['even', 'odd'],
                columns: ['primary', 'secondary', 'tertiary'],
                filter_reset: '.reset'
            }
        }).tablesorterPager(pageSorter)

        $(id).trigger('pageAndSize', defaultPage)
        $($('#dropdown1 a')[0]).fa({ icon: 'check' })
    },
    base: false,
    '#dropdown1 a click': function (sender, e) {
        e.preventDefault()
        this.dropdownEvent(sender)
    },
    '#dropdown1 a select': function (sender, e) {
        e.preventDefault()
        this.dropdownEvent(sender)
    },
    dropdownEvent (sender) { },
    getHtml () {
        return this.html
    },
    html: ''
}, Base))
