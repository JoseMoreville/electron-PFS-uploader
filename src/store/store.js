import { reactive, readonly,ref } from "vue"
const Store = require("electron-store");
const persistentStore = new Store();

const state = reactive({
    linkCollection: ref([]),
})

const mutations = {
    setLinkCollection(link) {
        // push all links to the linkCollection and remove duplicates
        state.linkCollection.push(link)
        state.linkCollection = [...new Set(state.linkCollection)]
        persistentStore.set("linkCollection", state.linkCollection )
    }
}

const getters = {

}

export default {
    state: readonly(state),
    mutations,
    getters
}