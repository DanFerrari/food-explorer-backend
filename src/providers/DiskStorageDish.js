const fs = require("fs");
const path = require("path");
const uploadConfig = require("../configs/uploads");

class DiskStorageDish {

    async saveFile(file){
        await fs.promises.rename(
            path.resolve(uploadConfig.TMP_FOLDER,file),
            path.resolve(uploadConfig.UPLOADS_FOLDER_DISH, file)
        );
            return file;
    }

async deleteFile(file){
    const filePath = path.resolve(uploadConfig.UPLOADS_FOLDER_DISH,file);
    try{
        await fs.promises.stat(filePath);
    } catch {
        return;
    }


    await fs.promises.unlink(filePath);
}


}

module.exports =DiskStorageDish;

