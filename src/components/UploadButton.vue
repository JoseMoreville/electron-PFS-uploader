<template>
  <div class="flex flex-col items-center">

    <button
      @click.stop="openDialog($ipfs)"
      class="w-36 h-12 bg-indigo-500 rounded-lg  text-white 
      ease-in duration-100
    hover:bg-indigo-600 hover:shadow-md hover:font-semibold 
    hover:underline underline-offset-2
      "
    >
      Upload File
    </button>
  </div>
</template>
<script setup>
import { dialogOpenWindows, dialogOpenDarwin } from "../packages/helpers.js";
import { ref, inject } from "vue";
import store from "@/store/store.js";
inject("store", store);
const path = require("path");
const { dialog } = require("electron").remote;
const isLoading = ref(false);

async function openDialog(ipfs) {
  store.mutations.setIsLoading(true)
  // If the platform is 'win32' or 'Linux'
  if (process.platform !== "darwin") {
    dialogOpenWindows(dialog, path);
  } else {
    //macOS platform
    isLoading.value = true;
    dialogOpenDarwin(dialog, path, ipfs, store);
  }
}
//eslint-disable-next-line
</script>
