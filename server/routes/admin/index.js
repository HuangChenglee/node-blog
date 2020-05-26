/*
 * @Description  : 
 * @version      : (0是开发中，1是测试中，2是成熟版)
 * @Author       : Chenglin Huang
 * @Date         : 2020-05-25 11:22:54
 * @LastEditTime : 2020-05-26 17:51:09
 */ 
module.exports = (app) => {
  const router = require('express').Router()

  const Category = require("../../model/Category")

  router.post('/categories/add', async (req, res) => {
    const model = await Category.create(req.body)
    res.send(model)
  })

  router.post('/categories', async (req, res) => {
    const model = await Category.find().populate('parent')
    res.send(model)
  })

  router.put('/category/:id', async (req, res) => {
    const id = req.params.id
    const model = await Category.findByIdAndUpdate(id, req.body)
    console.log(id)
    res.send(model)
  })

  router.delete('/category/:id', async (req, res) => {
    const id = req.params.id
    await Category.findByIdAndDelete(id)
    console.log(id)
    res.send('success!')
  })

  app.use('/admin/api', router)
}