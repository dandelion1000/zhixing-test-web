<template>
    <div class="car-list-page">
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
            <van-list
                v-model="loading"
                :finished="finished"
                :error.sync="error"
                error-text="请求失败，点击重新加载"
                finished-text="没有更多了"
                @load="onLoad"
            >
                <template v-for="item in datalist" >
                    <div class="car-item-li flex flex-between"
                         @click="goCarDetail(item)"
                         :key="item.id">
                        <img :src="item.imgurl?item.imgurl.split(',')[0]:item.imgurl" alt="">
                        <div class="right-series">
                            <div class="title">
                                {{item.licensingdate}}款  {{item.brandseries}}
                            </div>
                            <div class="sub-info">
                                {{item.licensingdate}}上牌 ／
                                {{item.kilometers}}公里 ／ {{item.city}}
                            </div>
                            <div class="car-price clearfix">
                                <span class="sub-info color-time">{{item.createtime}}</span>
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
    PullRefresh,
    List,
    Cell,
    Icon,
    Loading
} from 'vant';
import Api from '@/api/index';
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
            error: false,
            loading: false,
            finished: false,
            refreshing: false,
            list: [],
            curPage: 1,
            total: null,
            datalist: []
        };
    },
    methods: {
        goCarDetail(item){
            this.$router.push(
                {
                    name: 'carDetail',
                    params: {
                        id: item.id
                    },
                    query: {
                        infos: JSON.stringify(item)
                    }
                }
            );
        },
        onLoad() {
            this.error = false;
            setTimeout(() => {
                if (this.refreshing) {
                    this.datalist = [];
                    this.refreshing = false;
                }
                let params = {
                    page: this.curPage,
                    rows: 10,
                    ...this.query
                };
                Api.getCarList(params).then((data) => {
                    this.loading = false;
                    this.datalist = this.datalist.concat(data.rows);
                    this.total = data.total;
                    this.curPage++;
                    if (this.datalist.length >= this.total || !data.rows.length) {
                        this.finished = true;
                    }
                }).catch(() => {
                    this.loading = false;
                    this.error = true;
                });
            }, 1000);
        },
        onRefresh(query) {
            // 清空列表数据
            this.finished = false;
            this.loading = true;
            this.curPage =1;
            this.datalist =[];
            this.query = query;
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
                    color: #565656
                }
                .color-time{
                   color:#777
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
