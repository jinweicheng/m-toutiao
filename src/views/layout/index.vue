<template lang="">
    <div class="layout-container">
        <!-- 路由 -->
        <router-view></router-view>
        <!-- 子路由切换 -->
        <van-tabbar v-model="active" route  @change="onChange">
            <van-tabbar-item to="/home" icon="home-o">首页</van-tabbar-item>
            <van-tabbar-item to="/question" icon="service-o">问答</van-tabbar-item>
            <van-tabbar-item to="/video" icon="play-circle-o">视频</van-tabbar-item>
            <van-tabbar-item to="/my" icon="setting-o">我的</van-tabbar-item>
        </van-tabbar>


    </div>
</template>
<script>
    import { ref } from 'vue';
    export default {
        name: 'layout',
        components: {},
        props: {},
        // active: 0,
        // setup() {
        //     const active = ref(0);
        //     const onChange = (index) => Toast(`标签 ${index}`);
        //     return {
        //         icon,
        //         onChange,
        //     };
        // },
    }
</script>
<style lang="">

</style>