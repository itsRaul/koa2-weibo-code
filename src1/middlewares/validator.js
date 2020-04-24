/**
 * @description json schema 验证的中间件
 */
const { ErrorModel } = require('../model/ResModel')
const { jsonSchemaFileInfo } = require('../model/ErrorInfo')

/**
 * 
 * @param {function} validatorFn 验证函数
 */
function genValidator(validatorFn) {
    async function validator(ctx,next) {
        const data = ctx.request.body
        const error = validatorFn(data)
        if (error) {
            ctx.body = new ErrorModel(jsonSchemaFileInfo)
            return
        }
        await next()
    } 
    return  validator
}

module.exports = {
    genValidator
}