/* eslint-disable */
import { addFile } from "./ipfsHelpers.js";
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
    .then((file) => {
      // Stating whether dialog operation was
      // cancelled or not.
      console.log(file.canceled);
      if (!file.canceled) {
        // Updating the GLOBAL filepath variable
        // to user-selected file.
        global.filepath = file.filePaths[0].toString();
        console.log(global.filepath);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const dialogOpenDarwin = (
  dialog,
  path,
  ipfs,
  isLoading,
  state = null
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
        console.log("cancelled", file.canceled);
        isLoading.value = false;
        global.filepath = undefined;
        throw new Error("file upload was cancelled");
        return;
      }
      const fileName = file.filePaths[0].toString().split("/")[
        file.filePaths[0].toString().split("/").length - 1
      ];
      const filePath = `/files/${fileName}`;
      const fileHash = await addFile(fileName, file.filePaths[0], ipfs);
      //linkCollection?.value.push(`https://ipfs.io/ipfs/${fileHash}`);
      state?.mutations?.setLinkCollection(`https://ipfs.io/ipfs/${fileHash}`);
      isLoading.value = false;
    })
    .catch((err) => {
      isLoading.value = false;
    });
};

export const downloadFileAndSave = async (dialog, path, ipfs, fileHash) => {
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
      if (!savePath.endsWith('.mfs')) {
        savePath += '.jpeg';
      }
      const IPFS = await ipfs;
      const CAT = IPFS.cat(extractCIDfromURL)
      for await (const chunk of CAT) {
        chunks.push(chunk);
      }
      fs.writeFileSync(savePath, Buffer.concat(chunks))
    });
};
