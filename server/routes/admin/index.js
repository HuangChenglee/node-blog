/*
 * @Description  : 通用crud
 * @version      : 0.1(0是开发中，1是测试中，2是成熟版)
 * @Author       : Chenglin Huang
 * @Date         : 2020-05-25 11:22:54
 * @LastEditTime : 2020-06-01 09:22:56
 */
module.exports = (app) => {
  const jwt = require('jsonwebtoken')
  const assert = require('http-assert')
  const AdminUser = require('../../model/AdminUser')

  const router = require('express').Router({
    mergeParams: true
  })

  router.post('/add', async (req, res) => {
    if(req.Model.modelName === 'AdminUser'){
      //权限验证
      if(req.user && req.user.type === 1){
        assert(false, 403, '抱歉，你没有该操作的权限')
      }
    }
    const model = await req.Model.create(req.body)
    res.send(model)
  })

  router.post('/', async (req, res) => {

    if(req.Model.modelName === 'AdminUser'){
      //权限验证
      if(req.user && req.user.type === 1){
        assert(false, 403, '抱歉，你没有该操作的权限')
      }
    }

    let queryOptions = {}
    if (req.Model.modelName === 'Category') {
      queryOptions.populate = 'parent'
    }
    if (req.Model.modelName === 'Article') {
      queryOptions.populate = 'categories'
    }
    const model = await req.Model.find().setOptions(queryOptions)
    res.send(model)
  })

  router.get('/:id', async (req, res) => {
    const model = await req.Model.findById(req.params.id)
    res.send(model)
  })

  router.put('/:id', async (req, res) => {
    const id = req.params.id
    const model = await req.Model.findByIdAndUpdate(id, req.body)
    console.log(id)
    res.send(model)
  })

  router.delete('/:id', async (req, res) => {
    const id = req.params.id
    await req.Model.findByIdAndDelete(id)
    console.log(id)
    res.send('success!')
  })

  app.post('/admin/api/login', async (req, res) => {

    const { username, password } = req.body
    // 1、根据用户名寻找用户
    const model = await AdminUser.findOne({
      username
    })
    assert(model, 422, '用户不存在')
    // if (!model) {
    //   res.status(422).send({
    //     message: '用户不存在'
    //   })
    // }
    // 2、验证密码
    const result = require('bcrypt').compareSync(password, model.password)
    assert(result, 422, '密码错误')
    // if (!result) {
    //   res.status(422).send({
    //     message: '密码错误'
    //   })
    // }
    // 3、返回token
    const token = jwt.sign({
      id: model._id
    }, app.get('secret'))

    res.send({ token, username: model.username })
  })

  app.use('/admin/api/rest/:resource',
    async (req, res, next) => {
      const modelName = require('inflection').classify(req.params.resource) // 英文单词形态强转Category
      const Model = require(`../../model/${modelName}`)// 会得到一个小写的model名
      req.Model = Model
      next()
    },
    async (req, res, next) => {
      const token = String(req.headers.authorization|| '').split(' ').pop()
      assert(token, 401, '请先登录')
      const { id } = jwt.verify(token, app.get('secret'))
      assert(id, 401, '无效的jwt')
      req.user = await AdminUser.findById(id)
      assert(req.user, 401, '请先登录')
      next()
    },
    router)

  // 全局错误处理，主要配合http-assert, 注意错误处理应放在最后
  app.use(async (err, req, res, next) => {
    res.status(err.statusCode || 500).send({
      message: err.message
    })
  })
}