let path = require('path');
let fs = require('fs-extra');

const methods = {
  moveuploadedfile: async (file, dir, object) => {
      const tempPath = file.path;
      console.log(`file: ${file}`);
      console.log(`paath: ${file.path}`);
      const fileName = file.originalname;
      const fileExtension = await fileName.split('.').slice(-1).pop();
      const filePath = `${dir}/${object._id}.${fileExtension}`

      console.log(filePath);
      console.log(tempPath);
      const targetPath = await path.resolve('public' + filePath);
      await fs.rename(tempPath, targetPath, () => {});
      object.img = filePath
      await object.save()
      return object;
    },
}
module.exports = methods;
