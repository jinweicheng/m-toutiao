<template>
    <div class="article-list">
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
            <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" class="list_container"
                v-model:error="error" error-text="请求失败，点击重新加载" @load="onLoad">
                <van-cell v-for="(item,index) in list" :key="item.art_id" :title="item.title" />
            </van-list>
        </van-pull-refresh>
    </div>
</template>

<script>
    import { getArticles } from '../../../api/articles.js'
    export default {
        name: 'ArticleList',
        components: {},
        props: {
            channel: {
                type: Object,
                required: true
            }
        },
        data() {
            return {
                list: [],
                loading: false,
                refreshing: false,
                finished: false,
                error: false,
                timestamp: null
            }
        },
        computed: {},
        watch: {},
        created() { },
        mounted() { },
        methods: {
            async onLoad() {
                console.log('onLoad')
                if (this.refreshing) {
                    this.list = [];
                    this.refreshing = false;
                }
                try {
                    const { data } = await getArticles({ channel_id: this.channel.id, timestamp: this.timestamp || Date.now() })
                    // console.log('获取文章内容成功', data.data.results)
                    let { results } = data.data
                    this.list.push(...results)
                    this.loading = false;
                    if (results.length) {
                        this.timestamp = data.data.pre_timestamp
                    } else {
                        this.finished = true;
                    }
                } catch (error) {
                    console.log('获取文章内容失败', error)
                    this.error = true
                    this.loading = false
                }
            },
            async onRefresh() {
                console.log('onRefresh')
                // 清空列表数据
                this.finished = false;
                // 重新加载数据
                // 将 loading 设置为 true，表示处于加载状态
                this.loading = true;
                this.list = [];
                this.refreshing = false;
                try {
                    const { data } = await getArticles({ channel_id: this.channel.id, timestamp: Date.now() })
                    // console.log('获取文章内容成功', data.data.results)
                    let { results } = data.data
                    this.list.push(...results)
                    this.loading = false;
                    if (results.length) {
                        this.timestamp = ""
                    } else {
                        this.finished = true;
                    }
                } catch (error) {
                    this.error = true
                    this.loading = false
                }
            }

        }
    }
</script>

<style scoped lang="less">
    .list_container {
        margin-bottom: 100px;
    }
</style>