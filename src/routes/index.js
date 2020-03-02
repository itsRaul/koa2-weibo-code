const router = require('koa-router')()

router.get('/', async (ctx, next) => {
	ctx.body = 'hello liufupeng'
})

router.get('/user', async (ctx, next) => {
	ctx.body = 'liufupeng'
})

router.get('/string', async (ctx, next) => {
	ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
	ctx.body = {
		title: 'koa2 json'
	}
})

router.get('/profile/:userName', async (ctx, next) => {
	const { userName } = ctx.params
	ctx.body = {
		title: 'tj',
		userName
	}
})

module.exports = router
