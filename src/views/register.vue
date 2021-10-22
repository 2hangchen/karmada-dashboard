<template>
  <div class="login-container">
    <div class="headerBg">
      <div class="el-header">
        <el-row :gutter="50">
          <el-col :md="14" :lg="14">
            <a href="/"><img src="@/assets/logo.png" class="logoImg" /></a>
          </el-col>
          <el-col v-if="true" :md="10" :lg="10" class="insideFloatRight">
            <el-link href="#/login">用户登录</el-link>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="manufacturer bg-white">
      <el-form
        ref="registerForm"
        :model="loginForm"
        :rules="loginRules"
        class="register-form"
        autocomplete="on"
        label-position="left"
        label-width="110px"
      >
        <p class="title">欢迎注册</p>

        <el-form-item prop="username" label="用户名">
          <el-input
            ref="username"
            v-model="loginForm.username"
            name="username"
            type="text"
            tabindex="1"
            autocomplete="on"
          />
        </el-form-item>

        <el-form-item prop="nickName" label="昵称">
          <el-input
            ref="nickName"
            v-model="loginForm.nickName"
            name="nickName"
            type="text"
            tabindex="1"
            autocomplete="on"
          />
        </el-form-item>

        <!-- <el-form-item prop="emailCode" label="验证码">
          <el-input
            ref="emailCode"
            v-model="loginForm.emailCode"
            placeholder=""
            name="emailCode"
            type="text"
            tabindex="1"
            autocomplete="on"
          />
        </el-form-item> -->

        <el-tooltip
          v-model="capsTooltip"
          content="Caps lock is On"
          placement="right"
          manual
        >
          <el-form-item prop="password" label="密码">
            <el-input
              :key="passwordType"
              ref="password"
              v-model="loginForm.password"
              :type="passwordType"
              placeholder=""
              name="password"
              tabindex="2"
              autocomplete="on"
              @keyup.native="checkCapslock"
              @blur="capsTooltip = false"
              @keyup.enter.native="handleRegister"
            />
            <!-- <span class="show-pwd" @click="showPwd">
              <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
            </span> -->
          </el-form-item>
        </el-tooltip>

        <el-tooltip
          v-model="capsTooltip"
          content="Caps lock is On"
          placement="right"
          manual
        >
          <el-form-item prop="passwordR" label="再次输入密码">
            <el-input
              :key="passwordType"
              ref="passwordR"
              v-model="loginForm.passwordR"
              :type="passwordType"
              placeholder=""
              name="passwordR"
              tabindex="2"
              autocomplete="on"
              @keyup.native="checkCapslock"
              @blur="capsTooltip = false"
              @keyup.enter.native="handleRegister"
            />
            <!-- <span class="show-pwd" @click="showPwd">
              <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
            </span> -->
          </el-form-item>
        </el-tooltip>

        <el-form-item prop="email" label="邮箱账号">
          <el-input
            ref="email"
            v-model="loginForm.email"
            placeholder=""
            name="email"
            type="text"
            tabindex="1"
            autocomplete="on"
          />
        </el-form-item>

        <el-button
          :loading="loading"
          type="primary"
          style="width: 100%; margin-bottom: 30px"
          @click.native.prevent="handleRegister"
          >注册</el-button
        >

        <div style="position: relative">
          <div class="tips">
            <p><a href="#/">返回首页</a></p>
          </div>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
  import { jRegister } from '@/api/user'

  export default {
    name: 'Register',
    data() {
      return {
        loginForm: {
          // username: 'admin',
          // password: '111111',
        },
        loginRules: {
          username: [
            { required: true, trigger: 'blur', message: '请输入用户名' }
          ],
          nickName: [{ required: true, trigger: 'blur', message: '请输入昵称' }],
          password: [{ required: true, trigger: 'blur', message: '请输入密码' }],
          passwordR: [
            { required: true, trigger: 'blur', message: '请再次输入密码' }
          ],
          email: [
            {
              validator: this.checkEmail,
              trigger: 'blur'
            }
          ]
        },
        rememberMe: false,
        passwordType: 'password',
        capsTooltip: false,
        loading: false,
        showDialog: false,
        redirect: undefined,
        otherQuery: {}
      }
    },
    watch: {
      $route: {
        handler(route) {
          const { query } = route
          if (query) {
            this.redirect = query.redirect
            // this.otherQuery = this.getOtherQuery(query);
          }
        },
        immediate: true
      }
    },
    created() {
      // window.addEventListener('storage', this.afterQRScan)
    },
    mounted() {
      this.$refs.username.focus()
    },
    destroyed() {
      // window.removeEventListener('storage', this.afterQRScan)
    },
    methods: {
      checkEmail(rule, value, callback) {
        if (
          value &&
          !value.match(
            /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/
          )
        ) {
          callback(new Error('请输入正确的邮箱'))
        }
        callback()
      },
      checkCapslock(e) {
        const { key } = e
        this.capsTooltip = key && key.length === 1 && key >= 'A' && key <= 'Z'
      },
      handleRegister() {
        this.$refs.registerForm.validate(valid => {
          if (valid) {
            const { password, passwordR } = this.loginForm
            if (password === passwordR) {
              jRegister(this.loginForm).then(res => {
                if (res) {
                  this.$message({
                    message: '注册成功',
                    type: 'success'
                  })
                  this.$router.push({ path: '/login' })
                }
              })
            } else {
              this.$message({
                message: '两次输入密码不一致！',
                type: 'warning'
              })
            }
          }
        })
      }
    }
  }
</script>
<style scoped lang="scss">
  .register-form {
    width: 300px;
    margin: 0 auto;
    padding: 40px 0;
    .title {
      font-size: 28px;
    }
  }
  .bg-white {
    background-color: #ffffff;
    margin-bottom: 70px;
  }
</style>
