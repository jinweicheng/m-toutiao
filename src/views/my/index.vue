<template lang="">
    <div class="my-container">
        <div class="header">
            <!-- 登录 -->
            <div v-if="user" class="logined">
                <div class="user_info">
                    <div class="left">
                        <van-image width="50" height="50" fit="cover" round 
                            class="avatar"
                            :src="userInfo.photo" />
                        <span>{{ userInfo.name }}</span>
                    </div>
                    <div class="right">
                        <van-button type="default" round size="small">编辑按钮</van-button>
                    </div>
                </div>
                <div class="follow_info">
                    <div class="data_item">
                        <span>{{ userInfo.art_count }}</span>
                        <i>头条</i>
                    </div>
                    <div class="data_item">
                        <span>{{ userInfo.follow_count }}</span>
                        <i>关注</i>
                    </div>
                    <div class="data_item">
                        <span>{{ userInfo.fans_count }}</span>
                        <i>粉丝</i>
                    </div>
                    <div class="data_item">
                        <span>{{ userInfo.like_count }}</span>
                        <i>获赞</i>
                    </div>
                </div>
            </div>

            <!-- 未登录 -->
            <div v-else class="not_login" @click="$router.push('/login')">
                <img src='../../assets/mobile.png' alt="">
                <span>登录/注册</span>
            </div>
        </div>
        <!-- 收藏、历史 -->
        <div class="shoucang_lishi">
            <van-grid :column-num="2" clickable>
                <van-grid-item>
                    <i slot="icon" class="toutiao toutiao-shoucang" id="toutiao_shoucang_icon"></i>
                    <span slot="text" id="toutiao_text">收藏</span>
                </van-grid-item>
                <van-grid-item>
                    <i slot="icon" class="toutiao toutiao-lishi" id="toutiao_lishi_icon"></i>
                    <i slot="text" id="toutiao_text">历史</i>
                </van-grid-item>
            </van-grid>
        </div>

        <!-- 消息通知、小智同学、退出登录 -->
        <div class="loginout_containter">
            <van-cell title="消息通知" is-link id="space_top" />
            <van-cell title="小智同学" is-link />
            <van-cell title="退出登录" id="loginout_btn" @click="onloginout" v-if="user" />
        </div>
    </div>
</template>
<script>
    import { mapState } from 'vuex'
    import { Dialog } from 'vant'
    import { loadUserInfo } from "../../api/user.js"
    export default {
        name: 'my',
        computed: {
            ...mapState(['user'])
        },
        data() {
            return {
                userInfo:{}
            }
        },
        methods: {
            // 退出登录
            onloginout() {
                console.log('onloginout')
                Dialog.confirm({
                    title: '退出',
                    message:
                        '是否确定退出登录？',
                }).then(() => {
                    console.log('confirm')
                    this.$store.commit('setUser',null)
                }).catch(() => {
                    console.log('cancel')
                });
            },
            // 加载用户信息
            async loadUserData() {
                try {
                    const res = await loadUserInfo()
                    console.log('获取用户信息成功',res.data)
                    this.userInfo = res.data.data
                    // this.$nextTick(function() {
                    //     this.userInfo = res.data
                    // })   
                } catch (error) {
                    console.log('获取用户信息失败，请稍后重试！')
                }
            }
        },
        created() {
            if(this.user) {
                this.loadUserData()
            }   
        },
    }
</script>
<style scoped lang="less">
    .my-container {
        .header {
            height: 361px;
            width: 750px;
            background-image: url('~@/assets/banner.png');
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;

            .not_login {
                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: column;

                img {
                    width: 120px;
                    height: 120px;
                }

                span {
                    padding-top: 20px;
                    color: #fff;
                    font-size: 32px;
                }
            }

            .logined {
                width: 750px;

                .user_info {
                    display: flex;
                    height: 230px;

                    /* background-color: pink; */
                    .left {
                        padding-left: 20px;
                        align-self: flex-end;
                        flex: 1;

                        span {
                            display: inline-block;
                            padding-bottom: 0px;
                            font-size: 30px;
                            color: #fff;
                        }
                    }

                    .right {
                        align-self: flex-end;
                        padding-right: 20px;
                        padding-bottom: 40px;
                    }
                }

                .follow_info {
                    display: flex;
                    justify-content: space-evenly;
                    height: 130px;
                    width: 100%;
                    /* background-color: gray; */

                    .data_item {
                        display: flex;
                        flex-direction: column;
                        justify-content: center;

                        i {
                            font-size: 25px;
                            color: #fff;

                        }

                        span {
                            align-self: center;
                            font-size: 30px;
                            color: #fff;
                        }
                    }
                }
            }
        }

        .shoucang_lishi {
            #toutiao_shoucang_icon {
                font-size: 40px;
                color: red;
            }

            #toutiao_lishi_icon {
                font-size: 40px;
                color: #ff9d1d;
            }

            #toutiao_text {
                font-size: 30px;
                color: black;
            }

        }

        .loginout_containter {
            #space_top {
                margin-top: 10px;
            }

            #loginout_btn {
                margin-top: 10px;
                text-align: center;
                color: red;
            }
        }

    }
</style>