/*
 * @Description  : 
 * @version      : (0是开发中，1是测试中，2是成熟版)
 * @Author       : Chenglin Huang
 * @Date         : 2020-05-29 21:36:35
 * @LastEditTime : 2020-05-30 14:39:50
 */ 
const mongoose = require("mongoose")

const schema = new mongoose.Schema({
  title: {type: String},
  categories: [{type: mongoose.SchemaTypes.ObjectId, ref: "Category"}],
  content: {type: String}
})

module.exports = mongoose.model("Article", schema)