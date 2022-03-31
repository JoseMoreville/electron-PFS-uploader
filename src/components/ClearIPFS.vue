<template>
    <button 
    @click.prevent="clearAll"
    class="hover:underline hover:font-bold text-sm 
    text-gray-600 ease-in duration-100 underline-offset-2"
     >Delete all</button>
</template>
<script setup>
import { inject } from "vue";
import store from "@/store/store.js";
inject("store", store);

function clearAll() {
    store.mutations.clearLinkCollection()
}
</script>