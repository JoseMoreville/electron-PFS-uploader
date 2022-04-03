const fs = require("fs");
const { app } = require("electron").remote;

export const saveFileBufferLocal = (buffer, fileName)=>{
  try {
    const fileNameWithoutExtension = fileName.split('.')[0]
  fs.writeFileSync(app.getPath('userData')+ '/uploads/' + fileNameWithoutExtension + '.jpeg', buffer);
  } catch (error) {
    console.log(error)
  }
}

export const readLocalFilebuffer = (fileName)=>{
  //remove extension from file name
    return fs.readFileSync(app.getPath('userData')+ '/uploads/' + fileName);
}

// eslint-disable-next-line
export const createTimeout = (time, flag, flag2 = null, cb)=>{
setTimeout(()=>{
  console.log('dgdf')
  flag = true
  flag2 = true
  cb()
}, time)

}
