/**
 * @description 存储配置
 */
const { isProd } = require('../utils/env')

let REDIS_CONF = {
    prot: 6379,
    host: '127.0.0.1'
}

let MYSQL_CONF = {
    host: '101.37.20.247',
    user: 'root',
    password: '123456',
    port: '3306',
    database: 'koa2_weibo_db'
}

//线上配置
if (isProd) { 
    REDIS_CONF = {
        prot: 6379,
        host: '101.37.20.247'
    }

    MYSQL_CONF = {
        host: '101.37.20.247',
        user: 'root',
        password: '123456',
        port: '3306',
        database: 'koa2_weibo_db'
    }
}

module.exports = {
    REDIS_CONF,
    MYSQL_CONF
}