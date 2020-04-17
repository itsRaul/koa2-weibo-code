/**
 * @description 数据格式化
 */
const { DEFAULT_PICTURE } = require('../conf/constant')

/**
 * 用户默认头像
 * @param {Object} obj 用户头像 
 */
function _formatUserPicture(obj) {
    if (obj.picture == null) {
        obj.picture = DEFAULT_PICTURE
    }
    return obj
}

/**
 * @description 格式化用户信息
 * @param {Array|Object} list 
 */
function formatUser(list) {
    if (list == null) {
        return list
    }

    //数组 用户列表
    if (list instanceof Array) {
        return list.map(_formatUserPicture)
    }

    return _formatUserPicture(list)
}

module.exports = {
    formatUser
}