/*
 * @Description  : 
 * @version      : 0.1(0是开发中，1是测试中，2是成熟版)
 * @Author       : Chenglin Huang
 * @Date         : 2020-05-24 20:57:13
 * @LastEditTime : 2020-05-31 20:57:39
 */ 
const express = require("express")
const app = express()

app.set('secret', 'fwifju823&&T*^&GR$UGT&*$fhw3h')

app.use(express.json())
app.use(require("cors")())

// 数据库连接
require('./plugins/db')(app)
// 路由处理
require('./routes/admin')(app)


app.listen('3000', () => {
  console.log('http://localhost:3000/')
})