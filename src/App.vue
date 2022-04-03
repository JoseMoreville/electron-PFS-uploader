<template>
  <div
    class="w-screen h-full flex flex-col px-24 
    max-w-screen-2xl self-center justify-around"
  >
    <header class="flex w-full justify-between items-center">
      <img src="./assets/p2p.png" 
      alt="" 
      srcset="" 
      class="w-12 h-12 animate-[spin_16s_ease-in-out_infinite] " />
      <small 
      class="text-sm self-end text-slate-500">
        Connected with: {{ connections || localConnections }} users</small
      >
    </header>

    <div class="flex flex-col w-full min-h-48">
      <h1 class="text-indigo-500 font-bold text-xl mb-8">Your uploads</h1>
      <FileIsLoading 
        v-if="store.state.isLoading"
      />
      <div
        v-if="store.state.linkCollection.length !== 0 || store.state.existingLinks "
        class="flex flex-wrap justify-between items-center gap-[1.6rem] 
        grow basis-1/5 border-[3px] border-solid border-indigo-500 min-h-[16em]
        max-h-[24em]  
        rounded-lg p-4 min-w-[130px]"
        :class="{
          'overflow-y-scroll' : store.state.linkCollection.length > 4,
        }"
      >

        <UploadedElements
          v-for="(item,index) in store.state.linkCollection"
          :key="item.fileName"
          :title="item.fileName"
          :elementSRC="item.hash"
          :indexOnCollection="index"
        />
      </div>

      <div
        class="w-full h-48 flex justify-center border-2 
        border-solid border-indigo-500 rounded-lg bg-slate-100"
        v-if="store.state.linkCollection.length === 0 && store.state.existingLinks === null "
        
      >
        <p class="text-center text-gray-500 self-center">
          You have not uploaded any files yet.
        </p>
      </div>
    </div>
    <div class="flex justify-evenly">
    <UploadButton />
    <ClearIPFS />
    </div>

  </div>
</template>

<script setup>
import UploadButton from "./components/UploadButton.vue";
import UploadedElements from "./components/UploadedElements.vue";
import ClearIPFS from "./components/ClearIPFS.vue";
import FileIsLoading from "./components/FileIsLoading.vue";
import store from "./store/store";
import { onMounted, provide, ref } from "vue";
// eslint-disable-next-line
const Store = require("electron-store");
//const persistentStore = new Store();
provide("store", store);

const connections = ref(0);
const localConnections = ref(0);
const isThereLocalData = ref(false);
const { exec } = require("child_process");
// eslint-disable-next-line
exec("ipfs swarm peers", (err, stdout, stderr) => {
  if (err) {
    //console.error(err);
    return;
  }
  connections.value = stdout.split("\n").length - 1;
  console.log("Connected with: " + connections.value + " users");
});

// eslint-disable-next-line
exec("arp -a", (err, stdout, stderr) => {
  if (err) {
    //console.error(err);
    return;
  }
  localConnections.value = stdout.split("\n").length - 1;
  console.log("locally Connected with: " + localConnections.value + " users");
});

onMounted(() => {
  if (store.state.existingLinks) {
    isThereLocalData.value = true;
    store.mutations.clearTempLinkCollection()
    store.state.existingLinks.forEach((item) => {
      store.mutations.setLinkCollectionOnStart(item);
    });
  }
});
</script>
