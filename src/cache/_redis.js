/**
 * @description 连接 redis 的方法 get set
 */

const redis = require('redis')
const { REDIS_CONF } = require('../conf/db')

const redisClient = redis.createClient(REDIS_CONF.prot, REDIS_CONF.host)

redisClient.on('error', err => {
    console.error('redis error', err)
})

/**
 *
 * redis set
 * @param {string} key 健
 * @param {string} val 值
 * @param {number} [timeout=60 * 60] 过期时间 s
 */
function set(key, val, timeout = 60 * 60) {
    if (typeof key === 'object') {
        val = JSON.stringify(val)
    }
    redisClient.set(key, val)
    redisClient.expire(key, timeout)
}

/**
 *
 *
 * @param {string} key 健
 * @returns
 */
function get(key) {
    const promise = new Promise((resolve, reject) => {
        redisClient.get(key, (err, val) => {
            if (err) {
                reject(err) 
                return
            }
            if (val == null) {
                resolve(null)
                return
            }
            
            try {
                resolve(
                    JSON.parse(val)
                )
            } catch (ex) {
                resolve(ex)
            }
        })
    })

    return promise
}

module.exports = {
    set,
    get
}
 