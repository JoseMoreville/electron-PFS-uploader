<template>
<div class="w-1/5 flex flex-col ease duration-300 rounded-lg v max-h-[22em] min-w-[130px]">
<div class="w-full relative hover:shadow-md peer rounded-lg ">
  <button
    type="button"
    class="bg-white rounded-md p-2 inline-flex items-center justify-center 
    text-gray-400 hover:text-white focus:outline-none 
    focus:ring-2 focus:ring-inset focus:ring-indigo-500
    absolute z-20
    right-0 top-0 hover:scale-110 ease duration-300 hover:bg-indigo-500
    peer
    "
    
    @click="deleteElement(indexOnCollection)"
  >
    <span class="sr-only">Close menu</span>
    <svg
      class="h-6 w-6"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  </button>

  <div
    class="hover:cursor-pointer rounded-lg w-full h-52 xl:h-80 relative 
     hover:brightness-125 transition  transform-gpu antialiased 
    hover:subpixel-antialiased hover:shadow-md min-w-[130px]
    peer-*:scale-100
    group
    "
    @click="downloadFileAndSave(dialog, path, $ipfs, elementSRC, title)"
  >
    <div class="w-full h-full">
      <div
        class="h-1/2 bottom-0 w-full absolute bg-gradient-to-b 
        from-white to-black mix-blend-multiply rounded-b-lg "
      ></div>
      <div
        class="h-1/2 bottom-0 w-full absolute text-white text-center 
        rounded-b-lg z-10 flex justify-center items-center max-h-[20em]"
      >
        <p
          class="text-xs font-bold hover:cursor-pointer antialiased hover:underline 
          transition ease duration-300 hover:text-teal-500 hover:shadow underline-offset-2
          group-hover:text-teal-500 group-hover:shadow-md group-hover:underline
          "
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
        :title="title"
        ref="imgElement"
        style="object-fit: cover"
      />
    </div>
  </div>
</div>

<p class="text-center text-indigo-600 text-sm">{{title}}</p>
</div>
</template>
<script setup>
// define props for this component composition api
// eslint-disable-next-line

import { defineProps, ref, inject } from "vue";
import { downloadFileAndSave } from "@/packages/helpers.js";
import store from "@/store/store.js";
inject("store", store);
const path = require("path");
const { dialog } = require("electron").remote;
defineProps({
  elementSRC: String,
  title: String,
  indexOnCollection: Number,
});

const imgElement = ref(null);
function altElement() {
  imgElement.value.src =
    "https://via.placeholder.com/300x400.png?text=No+Image+Found";
}
// eslint-disable-next-line
function OpenCurrentLink(elementSRC) {
  // eslint-disable-next-line
  const { shell } = require("electron").remote;
  shell.openExternal(elementSRC);
}
function deleteElement(item){
  store.mutations.removeItemFromCollection(item)
}
</script>
