<template>
    <div class="home-container">
        <!-- 导航栏 -->
        <van-nav-bar id="page-nav-bar" fixed>
            <template #title>
                <van-button class="search-btn" slot="title" type="info" size="small" round icon="search">搜索</van-button>
            </template>
        </van-nav-bar>
        <!-- /导航栏 -->

        <!-- 选择项 -->
        <van-tabs class="channel-tabs" v-model:active="active" swipeable>
            <van-tab v-for="item in channels" :title="item.name" :key="item.id">
                <!-- {{ item.name }} -->
                <ArticleList :channel="item"></ArticleList>
            </van-tab>
            <template #nav-right>
                <div class="placehold">
                </div>
                <div class="hamburger_btn">
                    <i class="toutiao toutiao-gengduo"></i>
                </div>
            </template>
        </van-tabs>
    </div>
</template>

<script>
    import { loadUserChannels } from '@/api/user.js'
    import ArticleList from './components/ArticleList'
    export default {
        name: 'HomePage',
        components: {
            ArticleList
        },
        props: {},
        data() {
            return {
                channels: []
            }
        },
        computed: {},
        watch: {},
        created() {
            this.loadChannels()
        },
        mounted() { },
        methods: {
            async loadChannels() {
                try {
                    const res = await loadUserChannels()
                    console.log('加载用户频道成功', res.data)
                    this.channels = res.data.data.channels
                } catch (error) {
                    console.log('加载用户频道失败', error)
                }
            }
        }
    }
</script>

<style scoped lang="less">
    .home-container {
        padding-top: 192px;
        ::v-deep .van-nav-bar__title {
            max-width: unset;
        }

        .search-btn {
            width: 555px;
            height: 64px;
            background-color: #5babfb;
            border: none;
            font-size: 28px;

            .van-icon {
                font-size: 32px;
            }
        }

        .channel-tabs {
            ::v-deep .van-tabs__wrap {
                position: fixed;
                top: 92px;
                left: 0;
                right: 0;
                z-index: 1;
            }

            /* tab选项的样式 */
            ::v-deep .van-tab {
                border-right: 1px solid #edeff3;
                padding: 0 40px;

                span {
                    color: #777;
                    font-size: 28px;
                }

            }

            /* 选中项的下划线字体 */
            ::v-deep .van-tab--active {
                span {
                    color: #333;
                    font-size: 30px;
                }

            }

            /* 设置下划线的偏移 */
            ::v-deep .van-tabs__line {
                background: blue;
                width: 45px;
                border-radius: 2px;
            }

            /* 设置空的占位符 */
            .placehold {
                flex-shrink: 0;
                width: 66px;
                height: 82px;
            }

            /* 设置汉堡图标 */
            .hamburger_btn {
                position: fixed;
                right: 0;
                width: 66px;
                height: 82px;
                background-color: #fff;

                .toutiao {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 66px;
                    height: 82px;
                }

                &::before {
                    content: '';
                    position: absolute;
                    left: 0;
                    width: 1px;
                    height: 100%;
                    background-image: url('../../assets/gradient-gray-line.png');
                    background-size: contain;

                }
            }
        }

    }
</style>