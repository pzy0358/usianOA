<template>
  <div class="login-container">
    <div class="logo" />
    <div class="form">
      <h1 style="font-size: 20px">手机号登录</h1>
      <el-card shadow="never" class="login-card">
        <!--登录表单-->
        <el-form ref="form" :model="form" :rules="rules">
          <el-form-item prop="mobile">
            <el-input
              v-model.trim="form.mobile"
              placeholder="请输入手机号"
            />
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model.trim="form.password"
              type="password"
              placeholder="请输入密码"
              show-password
            />
          </el-form-item>
          <el-form-item prop="isAgree">
            <el-checkbox
              v-model="form.isAgree"
            >用户平台使用协议</el-checkbox>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submit">登录</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      form: {
        mobile: process.env.NODE_ENV === 'development' ? '13800000002' : '',
        password: process.env.NODE_ENV === 'development' ? 'hm#qd@23!' : '',
        isAgree: process.env.NODE_ENV === 'development'
      },
      rules: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          {
            pattern: /^1[3-9]\d{9}$/,
            message: '手机号格式不正确',
            trigger: 'blur'
          }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            min: 6,
            max: 16,
            message: '密码长度应该为6-16位之间',
            trigger: 'blur'
          }
        ],
        isAgree: [
          {
            validator: (rule, value, callback) => {
              value ? callback() : callback(new Error('请勾选用户平台使用协议'))
            }
          }
        ]
      }
    }
  },
  methods: {
    submit() {
      this.$refs.form.validate(async(valid) => {
        if (valid) {
          // 执行登录相关操作
          await this.$store.dispatch('user/login', this.form)
          this.$router.push('/')
        }
      })
    }
  }
}
</script>

<style lang="scss">
.login-container {
  display: flex;
  align-items: stretch;
  height: 100vh;
  .logo {
    flex: 3;
    background: rgba(38, 72, 176) url(../../assets/common/login_back.png)
      no-repeat center / cover;
    display: flex;
    border-top-right-radius: 60px;
    flex-direction: column;
    align-items: flex-end;
    justify-content: center;
    padding: 0 100px;
  }
  .icon {
    background: url(../../assets/common/logo.png) no-repeat 70px center /
      contain;
    width: 300px;
    height: 50px;
    margin-bottom: 50px;
  }
  p {
    color: #fff;
    font-size: 18px;
    margin-top: 20px;
    width: 300px;
    text-align: center;
  }
  .form {
    flex: 2;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 100px;
  }
  .el-button {
    width: 100%;
    margin-top: 20px;
  }
}
</style>
