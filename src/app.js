const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const path = require('path')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const koaStatic = require('koa-static')
// const jwtKoa = require('koa-jwt')
const session = require('koa-generic-session')
const redisStore = require('koa-redis')
const { REDIS_CONF } = require('./conf/db')
const { SESSION_SECRET_KEY } = require('./conf/secretKeys')

const userAPIRouter = require('./routes/api/user')
const utilsAPIRouter = require('./routes/api/utils')

const userViewRouter = require('./routes/view/user')

// const { SECRET } = require('../conf/constants')

// error handler
onerror(app)

app.keys = [SESSION_SECRET_KEY]
app.use(session({
	key: 'weibo_sid',	//cookie name 默认 koa_sid
	prefix: 'weibo:sess',	//redis key 的前缀 默认是 koa_sess
	cookie: {
		path: '/',
		httpOnly: true,
		maxAge: 24 * 60 * 60 * 1000 //ms
	},
	store: redisStore({
		all: `${REDIS_CONF.host}:${REDIS_CONF.prot}`
	})
}))
	
/**
 * @description  jwt 的验证
 */
// app.use(jwtKoa({
// 	secret: SECRET, //加密规则
// }).unless({
// 	path: [/^\/users\/login/] //自定义哪些目录忽略 jwt 验证
// }))

// middlewares
app.use(bodyparser({
	enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(koaStatic(__dirname + '/public'))
app.use(koaStatic(path.join(__dirname, '..','uploadFiles')))

app.use(views(__dirname + '/views', {
	extension: 'ejs'
}))

// logger
app.use(async (ctx, next) => {
	const start = new Date()
	await next()
	const ms = new Date() - start
	console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(userViewRouter.routes(), userViewRouter.allowedMethods())
app.use(userAPIRouter.routes(), userAPIRouter.allowedMethods())
app.use(utilsAPIRouter.routes(), utilsAPIRouter.allowedMethods())



// error-handling
app.on('error', (err, ctx) => {
	console.error('server error', err, ctx)
});

module.exports = app
