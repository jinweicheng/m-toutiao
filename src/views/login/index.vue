<template>
    <div class="login-container">
        <!-- 导航栏 -->
        <van-nav-bar id="page-nav-bar" title="登录" />
        <!-- /导航栏 -->

        <!-- 登录表单 -->
        <van-form @submit="onSubmit" ref="loginForm">
            <van-field v-model="user.mobile" 
                name="mobile" 
                placeholder="请输入手机号" 
                icon-prefix="toutiao" 
                left-icon="shouji"
                maxlength="11"
                :rules="userFormRules.mobile">
                <template #left-icon>
                    <div class="toutiao toutiao-shouji"></div>
                </template>
            </van-field>
            <van-field v-model="user.code" 
                type="number" 
                name="code" 
                placeholder="请输入验证码"  
                icon-prefix="toutiao" 
                left-icon="yanzhengma"
                maxlength="6"
                :rules="userFormRules.code">
                <template #left-icon>
                    <div class="toutiao toutiao-yanzhengma"></div>
                </template>
                <template #button>
                    <van-count-down v-if="isShowTimeDown" 
                        :time="1000*60" 
                        format="ss 秒"
                        @finish="isShowTimeDown=false" />
                    <van-button  v-else class="send-sms-btn" 
                        round size="small" 
                        @click="onSendSMS"
                        type="default">发送验证码</van-button>
                </template>
            </van-field>
            <div class="login-btn-wrap">
                <van-button class="login-btn" block type="info" native-type="submit">
                    登录
                </van-button>
            </div>
        </van-form>
        <!-- /登录表单 -->
    </div>
</template>

<script>
    import { login,sendsms } from "../../api/user.js"
    export default {
        name: 'LoginPage',
        components: {},
        props: {},
        data() {
            return {
                isShowTimeDown: false,
                user: {
                    mobile: '17621155386',
                    code: '246810'
                },
                userFormRules: {
                    mobile: [{
                        required: true,
                        message: '手机号不能为空'
                    },{
                        pattern: /^1[3|5|7|8]\d{9}$/,
                        message: '手机号格式错误'
                    }],
                    code: [{
                        required: true,
                        message: '验证码不能为空'
                    },{
                        pattern: /^\d{6}$/,
                        message: '验证码格式错误'
                    }]
                }
            }
        },
        computed: {},
        watch: {},
        created() { },
        mounted() { },
        methods: {
            async onSendSMS() {
                console.log('send')
                // 1、单独校验手机号
                try {
                    await this.$refs.loginForm.validate('mobile')
                } catch (error) {
                    return console.log('验证失败！')
                }
                // 2、验证手机号成功显示倒计时组件
                console.log('验证手机号成功！')
                this.isShowTimeDown = true
                // 3、发送验证码
                try {
                    const res = await sendsms(this.user.mobile)
                    this.$toast.success({message: '获取验证码成功'})
                } catch (error) {
                    this.$toast.success({message: '获取验证码失败'})
                    this.isShowTimeDown = false
                }

            },
            async onSubmit(values) {
                // 1、获取手机号和验证码
                let user = this.user
                console.log(user)
                // 2、校验

                // 3、提交后台
                this.$toast.loading({
                    message: '登录中...',
                    forbidClick: true,
                    duration: 0
                });
                try {
                    const res = await login(user)
                    this.$toast.success({
                        message: '登录成功',
                    })
                    // console.log('登录成功',res.data)
                    // token  refresh_token
                    this.$store.commit('setUser',res.data)

                } catch (error) { 
                    console.log('error',error)
                    if(error.response.status === 400) {
                        // console.log('手机号或者验证码错误')
                        this.$toast.fail({
                            message: '手机号或者验证码错误',
                        })
                    } else {
                        // console.log('请稍后重试',error)
                        this.$toast.fail({
                            message: '请稍后重试',
                        })
                    }
                }

            }
        }
    }
</script>

<style scoped lang="less">
    .login-container {
      .toutiao {
        font-size: 35px;
        /* width: 30px;
        height: 30px; */
      }
      .send-sms-btn {
        width: 182px;
        height: 46px;
        line-height: 46px;
        background-color: #ededed;
        font-size: 12px;
        color: #666;
      }
      .login-btn-wrap {
        padding: 53px 33px;
        .login-btn {
          background-color: #6db4fb;
          border: none;
        }
      }
    }
    </style>