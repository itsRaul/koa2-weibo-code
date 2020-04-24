/**
 * @description utils 
 */

const path = require('path')
const { ErrorModel,SuccessModel } = require('../model/ResModel')
const { uploadFileSizeFailInfo } = require('../model/ErrorInfo')
const fse = require('fs-extra')

//存放图片的目录
const DIST_FOLDER_PATH = path.join(__dirname, '..', '..', 'uploadFiles')
// 文件最大体积
const MIX_SIZE = 1024 * 1024 * 1024

//是否需要创建目录
fse.pathExists(DIST_FOLDER_PATH).then(exist => {
    if (!exist) {
        fse.ensureDir(DIST_FOLDER_PATH)
    }
})

/**
 * 保存文件
 * @param {number} size 文件名
 * @param {string} filePath 文件类型
 * @param {string} name 文件体积大小 
 * @param {string} type 文件路径 
 */
async function saveFile({ size, filePath, name, type }) {
    if (size > MIX_SIZE) {
        await fse.remove(path)
        return new ErrorModel(uploadFileSizeFailInfo)
    }

    //移动文件
    const fileName = Date.now() + '.' + name
    const distFilePath = path.join(DIST_FOLDER_PATH, fileName)
    await fse.move(filePath, distFilePath)

    //返回信息
    return new SuccessModel({
        url: '/' + fileName
    })
}

module.exports = {
    saveFile
}