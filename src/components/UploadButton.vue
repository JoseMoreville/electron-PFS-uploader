<template>
  <div>
    <button @click.stop="openDialog">Upload File</button>
  </div>
</template>
<script setup>
import { dialogOpenWindows, dialogOpenDarwin } from "../packages/helpers.js";
const path = require("path");
const { dialog } = require("electron").remote;
async function openDialog() {
  // If the platform is 'win32' or 'Linux'
  if (process.platform !== "darwin") {
    dialogOpenWindows(dialog, path);
  } else {
    //macOS platform
    dialogOpenDarwin(dialog, path);
  }
}
</script>
