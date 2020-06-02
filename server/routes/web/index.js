/*
 * @Description  : 
 * @version      : (0是开发中，1是测试中，2是成熟版)
 * @Author       : Chenglin Huang
 * @Date         : 2020-06-01 19:24:49
 * @LastEditTime : 2020-06-02 11:05:37
 */ 
module.exports = (app) => {
  const Article = require('../../model/Article')
  const Category = require('../../model/Category')

  const router = require('express').Router({
    mergeParams: true
  })

  router.get('/article/total', async (req, res) => {
    const length = (await Article.find()).length
    res.send({total: length})
  })

  router.get('/articles/:page', async (req, res) => {
    const page = req.params.page
    const models = await Article.find().populate('categories').skip( (page-1)*5 ).limit(5)
    res.send(models)
  })

  router.get('/article/:id', async (req, res) => {
    const id = req.params.id
    const model = await Article.findById(id)
    res.send(model)
  })

  router.get('/categories/num', async (req, res) => {
    const model = await Category.find().populate('articleList').lean()
    model.map((item) => {
      item.articleList = item.articleList.length
    })
    res.send(model)
  })

  app.use('/web/api/rest',router)
}