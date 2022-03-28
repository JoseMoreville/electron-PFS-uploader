/* eslint-disable */
const { dialog } = require("electron").remote;

export default {
    install: (app) => {
        app.config.globalProperties.$dialog = dialog
    }
}