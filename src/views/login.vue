<template>
  <div class="login-container">
    <div class="headerBg">
      <div class="el-header">
        <el-row :gutter="50">
          <el-col :xs="16" :sm="16" :md="14" :lg="14">
            <a href="/"><img src="@/assets/logo.png" class="logoImg" /></a>
          </el-col>
          <el-col
            v-if="true"
            :xs="8"
            :sm="8"
            :md="10"
            :lg="10"
            class="insideFloatRight"
          >
            <el-link href="#/register">新用户注册</el-link>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="manufacturer">
      <el-row :gutter="50" class="login-part">
        <el-col :span="12">
          <p class="title">欢迎使用</p>
          <p>操作更便捷，访问更安全</p>
          <img src="@/assets/log-img.png" />
        </el-col>
        <el-col :span="12">
          <el-card shadow="always">
            <el-form
              ref="loginForm"
              :model="loginForm"
              :rules="loginRules"
              class="login-form"
              autocomplete="on"
              label-position="left"
            >
              <div class="title-container">
                <p>用户登录</p>
              </div>

              <el-form-item prop="username" label="">
                <el-input
                  ref="username"
                  v-model="loginForm.username"
                  placeholder="用户名"
                  name="username"
                  type="text"
                  tabindex="1"
                  autocomplete="on"
                />
              </el-form-item>

              <el-tooltip
                v-model="capsTooltip"
                content="Caps lock is On"
                placement="right"
                manual
              >
                <el-form-item prop="password" label="">
                  <el-input
                    :key="passwordType"
                    ref="password"
                    v-model="loginForm.password"
                    placeholder="密码"
                    name="password"
                    tabindex="2"
                    autocomplete="on"
                    show-password
                    @keyup.native="checkCapslock"
                    @blur="capsTooltip = false"
                    @keyup.enter.native="handleLogin"
                  />
                </el-form-item>
              </el-tooltip>
              <el-checkbox class="margin-20" v-model="rememberMe"
                >记住我</el-checkbox
              >

              <el-button
                :loading="loading"
                type="primary"
                style="width: 100%; margin-bottom: 30px"
                @click.native.prevent="handleLogin"
                >登录</el-button
              >

              <div style="position: relative">
                <div class="tips">
                  <a style="text-align: center" href="#/">返回首页</a>
                </div>
              </div>
            </el-form>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'Login',
    data() {
      return {
        loginForm: {},
        loginRules: {
          username: [
            { required: true, trigger: 'blur', message: '请输入用户名' }
          ],
          password: [{ required: true, trigger: 'blur', message: '请输入密码' }]
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
    created() {},
    mounted() {
      if (this.loginForm.username === '') {
        this.$refs.username.focus()
      } else if (this.loginForm.password === '') {
        this.$refs.password.focus()
      }
    },
    destroyed() {},
    methods: {
      checkCapslock(e) {
        const { key } = e
        this.capsTooltip = key && key.length === 1 && key >= 'A' && key <= 'Z'
      },
      showPwd() {
        if (this.passwordType === 'password') {
          this.passwordType = ''
        } else {
          this.passwordType = 'password'
        }
        this.$nextTick(() => {
          this.$refs.password.focus()
        })
      },
      handleLogin() {
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            this.loading = true
            setTimeout(() => {
              this.$store
                .dispatch('user/login', this.loginForm)
                .then(() => {
                  this.$message.success('登录成功')
                  this.$router.push({ path: this.redirect || '/' })
                  this.loading = false
                })
                .catch(() => {
                  this.loading = false
                })
            }, 1500)
            return true
          }
          return false
        })
      }
    }
  }
</script>
<style lang="scss">
  .login-part {
    img {
      width: 90%;
    }
    p {
      font-size: 25px;
      padding: 0 20px;
      text-align: left;
    }
    .title {
      font-size: 40px;
      font-weight: 600;
      margin: 0;
    }
    .el-card {
      margin: 0 20px;
    }
    .login-form {
      margin: 40px;
      color: #666666;
      .title-container p {
        padding: 0;
      }
    }
  }
</style>
