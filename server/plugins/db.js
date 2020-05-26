/*
 * @Description  : 
 * @version      : (0是开发中，1是测试中，2是成熟版)
 * @Author       : Chenglin Huang
 * @Date         : 2020-05-25 11:34:28
 * @LastEditTime : 2020-05-26 15:07:09
 */ 

 module.exports = app => {
   const mongoose = require("mongoose")
   mongoose.connect('mongodb://127.0.0.1:27017/node-blog', {
     useNewUrlParser: true,
     useUnifiedTopology: true,
     useFindAndModify: false
   })
 }
