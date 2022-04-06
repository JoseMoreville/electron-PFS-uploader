/* eslint-disable */
import store from "@/store/store.js";
import { addFile } from "./ipfsHelpers.js";
import {readLocalFilebuffer, createTimeout} from "./utilities.js";
const { getCurrentWindow } = require("electron").remote;
const fs = require("fs");
global.filepath = undefined;

export const dialogOpenWindows = (dialog, path) => {
  dialog
    .showOpenDialog({
      title: "Select the File to be uploaded",
      defaultPath: path.join(__dirname, "../assets/"),
      buttonLabel: "Upload",
      // Restricting the user to only Text Files.
      filters: [
        {
          name: "Text Files",
          //extensions: ["txt", "docx"],
        },
      ],
      // Specifying the File Selector Property
      properties: ["openFile"],
    })
    .then(async (file) => {
      // Stating whether dialog operation was
      // cancelled or not.
      // file cancelled handling
      if (file.canceled) {
        store.mutations.setIsLoading(false)
        global.filepath = undefined;
        throw new Error("file upload was cancelled");
        return;
      }
      const fileName = file.filePaths[0].toString().split("/")[
        file.filePaths[0].toString().split("/").length - 1
      ];
      console.log(fileName); 
      const uploadedData = await addFile(fileName, file.filePaths[0], ipfs);
      store?.mutations?.setLinkCollection({fileName:uploadedData.fileName, hash:`https://ipfs.io/ipfs/${uploadedData.fileHash}`});
      store?.mutations.setIsLoading(false)
    })
    .catch((err) => {
      console.log(err);
    });
};

export const dialogOpenDarwin = (
  dialog,
  path,
  ipfs,
  store = null
) => {
  // If the platform is 'darwin' (macOS)
  dialog
    .showOpenDialog({
      title: "Select the File to be uploaded",
      defaultPath: path.join(__dirname, "../assets/"),
      buttonLabel: "Upload",
      filters: [
        {
          name: "Text Files",
          extensions: ["png", "jpg", "jpeg", "gif"],
        },
      ],
      // Specifying the File Selector and Directory
      // Selector Property In macOS
      properties: ["openFile", "openDirectory"],
    })
    .then(async (file) => {
      // file cancelled handling
      if (file.canceled) {
        store.mutations.setIsLoading(false)
        global.filepath = undefined;
        throw new Error("file upload was cancelled");
        return;
      }
      const fileName = file.filePaths[0].toString().split("/")[
        file.filePaths[0].toString().split("/").length - 1
      ];
      console.log(fileName); 
      const uploadedData = await addFile(fileName, file.filePaths[0], ipfs);
      store?.mutations?.setLinkCollection({fileName:uploadedData.fileName, hash:`https://ipfs.io/ipfs/${uploadedData.fileHash}`});
      store?.mutations.setIsLoading(false)
    })
    .catch((err) => {
      store.mutations.setIsLoading(false)
    });
};

export const downloadFileAndSave = async (dialog, path, ipfs, fileHash, title) => {
  const Dialog = dialog
  const extractCIDfromURL = fileHash.split("/")[fileHash.split("/").length - 1];
  const chunks = [];
  Dialog
    .showSaveDialog(getCurrentWindow(), {
      title: "Save File",
      defaultPath: path.join(__dirname, "/downloads"),
      buttonLabel: "Save",
    })
    .then(async (result) => {
      if (result.canceled) return;
      let savePath = result.filePath;
      const IPFS = await ipfs;
      let isTheTimeout = false
      let loopFinished = false
      if (!savePath.endsWith('.mfs')) {
        savePath += '.jpeg';
      }

      createTimeout(2500, isTheTimeout, loopFinished, ()=>{
        if(loopFinished === false){
          console.log('timeout for forawait')
          fs.writeFileSync(savePath, readLocalFilebuffer(`${title}`))
        }
      })
      while(isTheTimeout === false){
        if(loopFinished){
          break;
        }
        const CAT = IPFS.cat(extractCIDfromURL)
        for await (const chunk of CAT) {
          chunks.push(chunk);
        }
        fs.writeFileSync(savePath, Buffer.concat(chunks))
        loopFinished = true
      }
    });
};
