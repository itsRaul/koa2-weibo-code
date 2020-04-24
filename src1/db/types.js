/**
 * @description 封装 sequelize 数据类型
 * @STRING 将字段指定为变长字符串类型。默认长度为 255
 * @DECIMAL 小数，接受一个或两个参数表示精度
 * @TEXT 将字段指定为(无)有限长度的文本列。可用长度：tiny, medium, long
 * @INTEGER 32位整型
 * @BOOLEAN 小数，接受一个或两个参数表示精度
 */
const Sequelize = require('sequelize')

module.exports = {
    STRING: Sequelize.STRING,
    DECIMAL: Sequelize.DECIMAL,
    TEXT: Sequelize.TEXT,
    INTEGER: Sequelize.INTEGER,
    BOOLEAN: Sequelize.BOOLEAN
}