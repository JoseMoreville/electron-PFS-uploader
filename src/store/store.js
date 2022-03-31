import { reactive, readonly } from "vue"

/* eslint-disable */
const Store = require("electron-store");
const persistentStore = new Store();

const state = reactive({
    linkCollection: [],
    isLoading: false,
})

const mutations = {
    setLinkCollectionOnStart(link) {
        state.linkCollection = []
        state.linkCollection.push(link)

    },
    setLinkCollection(link) {
        // push all links to the linkCollection and remove duplicates
        state.linkCollection.push(link)
        //state.linkCollection = []
        persistentStore.set("linkCollection", state.linkCollection )
    },
    clearLinkCollection() {
        state.linkCollection = []
        persistentStore.set("linkCollection", state.linkCollection )
     },
     removeItemFromCollection(link) {
        state.linkCollection = state.linkCollection.filter(item => item !== link)
        persistentStore.set("linkCollection", state.linkCollection )
     },
     setIsLoading(stateValue){
        state.isLoading = stateValue
     }
}

const getters = {

}

export default {
    state: readonly(state),
    mutations,
    getters
}