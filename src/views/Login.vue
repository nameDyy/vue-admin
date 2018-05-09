<!--使用eleui布局登录窗体，需要熟悉el-form、el-form-item、el-input、el-checkbox、el-button等组件的属性、方法、事件等 -->
<!--如果要使用变量绑定属性，则需要加：，如果要使用原生属性或者不绑定变量则直接写 -->
<template>
  <el-form :model="userAccount" :rules="rules" ref="userAccountForm" label-width="0px" class="login-container">
    <h3 class="title">系统登录</h3>
    <el-form-item prop="account">
      <!-- 这里要理解v-model指令和v-bind指令，v-bind指令可以简写：指绑定某个属性用于展示，v-model不能简写，绑定某个属性可写入或读取到一个变量 -->
      <el-input type="text" v-model="userAccount.account" placeholder="账号"></el-input>
    </el-form-item>
    <el-form-item prop="checkPass">
      <el-input type="password" v-model="userAccount.checkPass" placeholder="密码"></el-input>
    </el-form-item>
    <el-form-item>
      <el-checkbox :model="checked" checked class="remember">记住密码</el-checkbox>
    </el-form-item>
    <el-form-item style="width:100%;">
      <el-button type="primary" style="width:100%;" @click="handleSubmit" :autofocus="true" :loading="logining">登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
// 对于api的调用一般都封装到一个固定的api类里面
import { requestLogin } from '../api/api'
export default {
  data() {
    return {
      // 只是用于界面上登录按钮的loading样式
      logining: false,
      // 界面状态 需要与业务数据分开
      checked: true,
      // 业务数据，默认写入的登录账号
      userAccount: {
        account: 'admin',
        checkPass: '123456'
      },
      // 验证规则，需要准确理解v-model和:model的区别，:model是绑定一个model属性
      // 具体看参见ele ui上的验证规则跳转链接
      rules: {
        account: [{ required: true, message: '请输入账号', trigger: 'blur' }],
        checkPass: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      }
    }
  },
  methods: {
    // 处理点击
    handleSubmit(ev) {
      var _this = this
      this.$refs.userAccountForm.validate(valid => {
        if (valid) {
          // 开始loading
          this.logining = true
          // 收集数据
          var loginParams = {
            username: this.userAccount.account,
            password: this.userAccount.checkPass
          }
          requestLogin(loginParams)
            .then(data => {
              // 结束loading
              this.logining = false
              // 解构返回的数据
              let { msg, code, user } = data
              // 如果返回的状态码不是200，则弹出错误消息
              if (code !== 200) {
                this.$message({
                  message: msg,
                  type: 'error'
                })
              } else {
                // 验证通过 存储用户信息到sessionStorage
                sessionStorage.setItem('user', JSON.stringify(user))
                // 跳转到/table路由，编程方式路由跳转
                this.$router.push({ path: '/sys1/table' })
              }
            })
            .catch(err => {
              this.logining = false
              console.log('error submit!!')
              return false
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.login-container {
  border-radius: 5px;
  // 背景被裁减到内边距框
  background-clip: padding-box;
  margin: 180px auto;
  width: 350px;
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
  .title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }
  .remember {
    margin: 0px 0px 35px 0px;
  }
}
</style>