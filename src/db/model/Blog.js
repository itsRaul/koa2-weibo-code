/**
 * @description 博客
 */
const seq = require('../seq')
const { INTEGER,STRING,TEXT } = require('../types')

const Bolg = seq.define('blog', {
    userId: {
        type: INTEGER,
        allowNull: false,
        comment: '用户 ID'
    },
    content: {
        type: TEXT,
        allowNull: false,
        comment: '微博内容'
    },
    image: {
        type: STRING,
        comment: '图片地址'
    }
})

module.exports = Bolg