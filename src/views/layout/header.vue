<template>
    <van-sticky>
        <div class="nav-header flex flex-center ">
            <van-icon name="arrow-left"  @click="goBack"/>
            <span class="title">{{title}}</span>
        </div>
    </van-sticky>
</template>
<script>
import {Sticky, Icon} from 'vant';
export default {
    components: {
        [Sticky.name]: Sticky,
        [Icon.name]: Icon
    },
    props: {
        title: {
            type: String
        }
    },
    methods: {
        goBack() {
            this.$router.go(-1);
        },
    },
};
</script>
<style lang="less">
    .nav-header {
        padding: 15px;
        justify-content: center;
        position: relative;
        border-bottom: 1px solid #eee;
        .van-icon {
            position: absolute;
            left: 10px;
            top:15px;
            font-size: 26px;
            color: gray
        }
        .title {
            font-size: 18px;
            color: #333;
            text-align: center
        }
    }
</style>
