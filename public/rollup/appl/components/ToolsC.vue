<template>
    <span id="data" v-html="tools"></span>
</template>

<script>
import Table from 'table'
import Setup from 'setup'
import App from 'app'
import Helpers from 'helpers'

let that
let inPromise = false
let table = {
      tools: null
    }

export default {
  name: 'ToolsC',
  data () {
      that = this
      this.loadTools()
      this.getData()
    return table
  },
  mounted: function () {
    this.$nextTick(function () {
        Setup.init()
    })
  },
  methods: {
    loadTools () {
        const controllerName = 'Table'
        const actionName = 'tools'
        const failMsg = `Load problem with: '${controllerName}/${actionName}'.`
        App.loadController(controllerName, Table, controller => {
            if (controller &&
                controller[actionName]) {
                    controller[actionName]({})
            } else {
                console.error(failMsg)
            }
        }, err => {
            console.error(`${failMsg} - ${err}`)
        })
    },
    getData () {
      if (inPromise) {
        return table.tools
      }
      inPromise = true
      new Promise(function (resolve, reject) {
          let count = 0
          Helpers.isLoaded(resolve, reject, table.tools, Table, count, 10)
        })
        .catch(function (rejected) {
          console.warn('Failed', rejected)
        })
        .then(function (resolved) {
            table.tools = resolved
            inPromise = false
            that.$nextTick(function () {
                Table.decorateTable('tools')
                Helpers.scrollTop()
                $('#dropdown1').on('click', Table.dropdownEvent)
                if (App.controllers['Start']) {
                    App.controllers['Start'].initMenu()
                }
            })
            return table.tools
        })
    }
  }
}
</script>
