<template>
    <div class="w-full mb-8">
      <div
        class="bg-indigo-500 relative flex justify-center 
        items-center h-20 rounded-lg text-white flex-col 
        text-center text-xs font-light w-full
        "
      >
        <div
          class="rounded animate-spin ease duration-300 w-5 h-5 border-2 border-white mb-4"
        ></div>
        Awaiting for file
      </div>
    </div>
</template>
<script setup>
import { inject } from "vue";
import store from "@/store/store.js";
inject("store", store);

</script>
