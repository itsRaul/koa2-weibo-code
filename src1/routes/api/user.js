const router = require('koa-router')()
const { 
    isExist,
    register,
    login,
    changeInfo,
    changePassword, 
    logout,
} = require('../../controller/user')
const { userValidate } = require('../../validator/user')
const { genValidator } = require('../../middlewares/validator')
const { loginCheck } = require('../../middlewares/loginChecks')

router.prefix('/api/user')

// 用户名是否存在
router.post('/isExist', async (ctx,next) => {
    const { userName } = ctx.request.body
    ctx.body = await isExist(userName)
})

// 注册路由
router.post('/register', genValidator(userValidate), async (ctx,next) => {
    const { userName, password, gender } = ctx.request.body

    ctx.body = await register({
        userName, 
        password, 
        gender 
    })
})

// 登录
router.post('/login', async (ctx,next) => {
    const { userName, password } = ctx.request.body 
    ctx.body = await login({ctx,userName,password})
})

// 修改个人信息
router.patch('/changeInfo',loginCheck, genValidator(userValidate), async(ctx, next) => {
    const { userName, city, picture } = ctx.request.body
    ctx.body = await changeInfo(ctx, { userName, city, picture })
})

// 修改密码
router.patch('/changePassword',loginCheck, genValidator(userValidate), async(ctx, next) => {
    const { password, newPassword } = ctx.request.body
    const { userName } = ctx.session.userInfo
    ctx.body = await changePassword(userName, password, newPassword)
})

// 退出登录
router.post('/logout', loginCheck, async (ctx, next) => {
    ctx.body = await logout(ctx)
})

module.exports = router