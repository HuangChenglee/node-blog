/*
 * @Description  : 
 * @version      : (0是开发中，1是测试中，2是成熟版)
 * @Author       : Chenglin Huang
 * @Date         : 2020-05-25 11:41:09
 * @LastEditTime : 2020-06-02 10:42:24
 */ 
const mongoose = require("mongoose")

const schema = new mongoose.Schema({
  name: {type: String, unique: true},
  parent: {type: mongoose.SchemaTypes.ObjectId, ref: "Category"}
})

// 虚拟属性
schema.virtual('children', {
  localField: '_id',
  foreignField: 'parent',
  justOne: false,
  ref: 'Category'
})

schema.virtual('articleList', {
  localField: '_id',
  foreignField: 'categories',
  justOne: false,
  ref: 'Article'
})

module.exports = mongoose.model("Category", schema)