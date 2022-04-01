import { reactive, readonly } from "vue"

/* eslint-disable */
const Store = require("electron-store");
const persistentStore = new Store();

const state = reactive({
    linkCollection: [],
    existingLinks: persistentStore.get("linkCollection") || null,
    isLoading: false,
})

const mutations = {
    setLinkCollectionOnStart(link) {
        state.linkCollection.push(link)
    },
    setLinkCollection(link) {
        // push all links to the linkCollection and remove duplicates
        state.linkCollection.push(link)
        //state.linkCollection = []
        persistentStore.set("linkCollection", state.linkCollection )
    },
    clearTempLinkCollection() {
        state.linkCollection = []
    },
    clearLinkCollection() {
        state.linkCollection = []
        state.existingLinks = null
        persistentStore.set("linkCollection", state.linkCollection )
     },
     removeItemFromCollection(link) {
        state.linkCollection.splice(state.linkCollection.indexOf(link), 1)
        //state.linkCollection = state.linkCollection.filter(item => item !== link)
        state.existingLinks.splice(state.existingLinks.indexOf(link), 1)
        if(state.existingLinks.length === 0) {
            state.existingLinks = null
        }
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