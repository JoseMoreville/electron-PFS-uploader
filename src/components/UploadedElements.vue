<template>
  <div
    class="hover:cursor-pointer rounded-lg w-1/5 h-52 xl:h-80 relative hover:scale-105 
    hover:brightness-125 transition ease duration-300 transform-gpu 
    antialiased hover:subpixel-antialiased hover:shadow-md"
  >
    <div class="w-full h-full">
      <div
        class="h-1/2 bottom-0 w-full absolute bg-gradient-to-b from-white to-black mix-blend-multiply rounded-b-lg"
      ></div>
      <div
        class="h-1/2 bottom-0 w-full absolute text-white text-center rounded-b-lg z-10 flex justify-center items-center"
      >
        <p
          class="text-xs font-bold hover:cursor-pointer antialiased hover:underline transition ease duration-300 hover:text-teal-500 hover:shadow underline-offset-2"
        >
          Click here to download
        </p>
        <!-- dialog,path, ipfs, fileHash,-->
      </div>
      <img
        :src="elementSRC"
        alt=""
        srcset=""
        class="aspect-auto h-full w-full rounded-lg box-shadow-lg"
        :onerror="altElement"
        :title="elementSRC"
        ref="imgElement"
        style="object-fit: cover"
        @click="downloadFileAndSave(dialog, path, $ipfs, elementSRC)"
      />
    </div>
  </div>
</template>
<script setup>
// define props for this component composition api
// eslint-disable-next-line

import { defineProps, ref } from "vue";
import { downloadFileAndSave } from "@/packages/helpers.js";
const path = require("path");
const { dialog } = require("electron").remote;
defineProps({
  elementSRC: String,
});
const imgElement = ref(null);
function altElement() {
  //this.src = "https://via.placeholder.com/728x90.png?text=No+Image+Found";
  imgElement.value.src =
    "https://via.placeholder.com/300x400.png?text=No+Image+Found";
}
// eslint-disable-next-line
function OpenCurrentLink(elementSRC) {
  // eslint-disable-next-line
  const { shell } = require("electron").remote;
  shell.openExternal(elementSRC);
}
</script>
