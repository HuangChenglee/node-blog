/*
 * @Description  : 
 * @version      : (0是开发中，1是测试中，2是成熟版)
 * @Author       : Chenglin Huang
 * @Date         : 2020-05-30 17:42:32
 * @LastEditTime : 2020-05-30 22:32:10
 */ 
const mongoose = require("mongoose")

const schema = new mongoose.Schema({
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true, set(val) {
    return require("bcrypt").hashSync(val, 10)
  }},
  type: {type: Number},
  avatar: {type: String}
})

module.exports = mongoose.model("AdminUser", schema)