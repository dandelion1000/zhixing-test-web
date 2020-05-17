<template>
    <div class="car-list-page">
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
            <van-list
                v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                @load="onLoad"
            >
                <template v-for="item in datalist" >
                    <div class="car-item-li flex flex-between"
                         @click="goCarDetail(item.id)"
                         :key="item.id">
                        <img :src="item.imgurl" alt="">
                        <div class="right-series">
                            <div class="title">
                                {{item.licensingdate}}款  {{item.brandseries}}
                            </div>
                            <div class="sub-info">
                                {{item.licensingdate}}上牌 ／
                                {{item.kilometers}}公里 ／ {{item.city}}
                            </div>
                            <div class="car-price clearfix">
                                <span class="sub-info">{{item.time}}</span>
                                <span class="fr bold base-color"> {{item.price}}万</span>
                            </div>
                        </div>
                    </div>
                </template>
            </van-list>
        </van-pull-refresh>
        <div class="fixed-20 seal-btn base-trans-bg" @click="goSealCar">
            <span ><van-icon name="plus" /> 卖车</span>
        </div>
    </div>
</template>
<script>
import {
    Toast,
    PullRefresh,
    List,
    Cell,
    Icon,
    Loading
} from 'vant';
export default {
    components: {
        [PullRefresh.name]: PullRefresh,
        [List.name]: List,
        [Cell.name]: Cell,
        [Icon.name]: Icon,
        [Loading.name]: Loading
    },
    data(){
        return {
            loading: false,
            finished: false,
            refreshing: false,
            list: [],
            datalist: [{
                'id': '1',
                'licensingdate': '2020',
                'brandseries': '奔驰 c200 自动智能型自动智能型自动智能型',
                'kilometers': '25.5',
                'condition': 'xxxxxx ',
                'price': '7.9',
                'imgurl': 'https://dss2.bdstatic.com/8_V1bjqh_Q23odCf/pacific/1951812166.jpg ',
                'city': '合肥',
                'phone': '奔驰 c200 ',
                'source': '个人',
                'time': '15:03'
            }, {
                'id': '2',
                'licensingdate': '2020',
                'brandseries': '奔驰 c200 自动智能型',
                'kilometers': '25.5',
                'condition': 'xxxxxx ',
                'price': '7.9',
                'imgurl': 'https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2666014032,2820809245&fm=26&gp=0.jpg ',
                'city': '合肥',
                'phone': '奔驰 c200 ',
                'source': '个人',
                'time': '15:03'
            },
            {
                'id': '3',
                'licensingdate': '2020',
                'brandseries': '奔驰 c200 自动智能型',
                'kilometers': '25.5',
                'condition': 'xxxxxx ',
                'price': '7.9',
                'imgurl': 'https://dss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3161057015,1042861478&fm=26&gp=0.jpg ',
                'city': '合肥',
                'phone': '奔驰 c200 ',
                'source': '个人',
                'time': '15:03'
            }, {
                'id': '4',
                'licensingdate': '2020',
                'brandseries': '奔驰 c200 自动智能型 ',
                'kilometers': '25.5',
                'condition': 'xxxxxx ',
                'price': '7.9',
                'imgurl': 'https://dss2.bdstatic.com/8_V1bjqh_Q23odCf/pacific/1951812166.jpg ',
                'city': '合肥',
                'phone': '奔驰 c200 ',
                'source': '个人',
                'time': '15:03'
            }, {
                'id': '5',
                'licensingdate': '2020',
                'brandseries': '奔驰 c200 自动智能型',
                'kilometers': '25.5',
                'condition': 'xxxxxx ',
                'price': '7.9',
                'imgurl': 'https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2666014032,2820809245&fm=26&gp=0.jpg ',
                'city': '合肥',
                'phone': '奔驰 c200 ',
                'source': '个人',
                'time': '15:03'
            },
            {
                'id': '6',
                'licensingdate': '2020',
                'brandseries': '奔驰 c200 自动智能型',
                'kilometers': '25.5',
                'condition': 'xxxxxx ',
                'price': '7.9',
                'imgurl': 'https://dss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3161057015,1042861478&fm=26&gp=0.jpg ',
                'city': '合肥',
                'phone': '奔驰 c200 ',
                'source': '个人',
                'time': '15:03'
            }]
        };
    },
    methods: {
        goCarDetail(id){
            this.$router.push(
                {
                    name: 'carDetail',
                    params: {
                        id: id
                    }
                }
            );
        },
        onLoad() {
            setTimeout(() => {
                if (this.refreshing) {
                    this.list = [];
                    this.refreshing = false;
                }

                for (let i = 0; i < 10; i++) {
                    this.list.push(this.list.length + 1);
                }
                // this.loading = false;

                if (this.list.length >= 40) {
                    // this.finished = true;
                }
            }, 1000);
        },
        onRefresh() {
            // 清空列表数据
            this.finished = false;

            // 重新加载数据
            // 将 loading 设置为 true，表示处于加载状态
            this.loading = true;
            this.onLoad();
        },
        goSealCar(){
            this.$router.push({
                name: 'seal'
            });
        }
    },
};
</script>
<style lang="less">
    .car-list-page {
        .car-item-li {
            padding:20px;
            border-bottom: 1px solid #eee;
            img {
                width: 127px;
                height: 78px;
            }
            .right-series {
                width: 240px;
                margin-left: 15px;
                .title {
                    font-weight: bold;
                    font-size: 16px;
                    color: #333;
                    max-width: 193px;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                }
                .sub-info {
                    margin-top: 3px;
                    font-size: 13px;
                    color: #777
                }
            }
            .car-price {
                font-size: 15px;
                margin-top: 13px;
            }
        }
        .fixed-20 {
            position: fixed;
            bottom: 25px;
            right: 20px;
        }
        .seal-btn {
            width: 53px;
            height: 53px;
            text-align: center;
            border-radius: 100%;
            color: #fff;
            font-weight: bold;
            span {
                position: relative;
                top: 6px;
                font-size: 12px;
            }
            .van-icon {
                display: block;
                font-size: 20px;
                position: relative;
                font-weight: bold;
                top: 3px;
            }
        }
    }
</style>
