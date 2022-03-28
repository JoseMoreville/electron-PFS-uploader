import * as IPFS_CLIENT from 'ipfs-core'

export default {
    install: (app) => {
      app.config.globalProperties.$ipfs = IPFS_CLIENT.create({
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
      })
    }
  }