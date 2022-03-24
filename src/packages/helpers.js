import { addFile } from './ipfsHelpers.js'
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

export const dialogOpenDarwin = (dialog, path) => {
  // If the platform is 'darwin' (macOS)
  dialog
    .showOpenDialog({
      title: "Select the File to be uploaded",
      defaultPath: path.join(__dirname, "../assets/"),
      buttonLabel: "Upload",
      filters: [
        {
          name: "Text Files",
          //extensions: ["txt", "docx"],
        },
      ],
      // Specifying the File Selector and Directory
      // Selector Property In macOS
      properties: ["openFile", "openDirectory"],
    })
    .then(async (file) => {
        console.log(file)
        console.log(file.canceled);
        if (!file.canceled) {
        global.filepath = file.filePaths[0].toString();
        const fileHash = await addFile('lol', global.filepath);
        console.log(fileHash);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

