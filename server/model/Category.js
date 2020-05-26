/*
 * @Description  : 
 * @version      : (0是开发中，1是测试中，2是成熟版)
 * @Author       : Chenglin Huang
 * @Date         : 2020-05-25 11:41:09
 * @LastEditTime : 2020-05-26 17:46:02
 */ 
const mongoose = require("mongoose")

const schema = new mongoose.Schema({
  name: {type: String, unique: true},
  parent: {type: mongoose.SchemaTypes.ObjectId, ref: "Category"}
})

module.exports = mongoose.model("Category", schema)