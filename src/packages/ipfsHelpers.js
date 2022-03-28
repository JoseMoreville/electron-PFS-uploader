/* eslint-disable */
const fs = require("fs");
//const IPFS_CLIENT = require("ipfs-http-client");
//import * as IPFS_CLIENT from 'ipfs-core'
/*
const IPFS = IPFS_CLIENT.create({
  init: true,
  start: true,
  repo: 'ok' + Math.random(),
  host:'localhost',
  port: "5001",
  protocol: "http",
  apiPath: '/ipfs/api/v0',
  API: {
    // API config for IPFS daemon
    HTTPHeaders: {
      "Access-Control-Allow-Origin": ["*"], // Origins from which to allow http requests
      "Access-Control-Allow-Methods": ["PUT", "GET", "POST"], // "PUT", "GET", "POST", "DELETE", etc.
      "Access-Control-Allow-Credentials": ["true"], // "true" || "false"
    },
  },
});
*/
export const addFile = async (fileName, filePath, ipfs) => {
  // Reading buffer from fileç
   const IPFS = await ipfs
  const fileBuffer = fs.readFileSync(filePath);
  //Adding buffer to IPFS
  const fileAdded = await IPFS.add({
    path: fileName,
    content: fileBuffer,
  });
  const fileHash = fileAdded.cid.toString()
  //https://ipfs.io/ipfs/QmWwCXY3anymkXjA3CDzBnoxkLsTgNPBWsshUe5ZkUdtVu?filename=WhatsApp%20Image%202022-03-16%20at%204.25.05%20PM.jpeg
  return fileHash
};


