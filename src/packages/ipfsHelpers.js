const fs = require("fs");
const IPFS_CLIENT = require("ipfs-http-client");
const IPFS = IPFS_CLIENT.create({
    host: "localhost",
    port: "5001",
    protocol: "http",
  });
export const addFile = async (fileName, filePath) => {
    // Reading buffer from file
    const fileBuffer = fs.readFileSync(filePath);
  
    // Adding buffer to IPFS
    const fileAdded = await IPFS.add({
      path: fileName,
      content: fileBuffer,
    });
    console.log(fileAdded.cid)
    return fileAdded.cid;
  };