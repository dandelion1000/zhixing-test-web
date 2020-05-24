<template>
    <div class="vip-big-bg">
        <div class="vip-card">
            <div class="header-bg-image">
                <div class="company-header">
                    <div class="line-title flex flex-between" @click="openSelectCompany">
                        <div class="company-title">
                            {{whichCompany}}
                        </div>
                        <van-icon name="arrow-down" />
                    </div>
                    <div class="user-account flex flex-around">
                        <div class="every-item">
                            <div class="number">
                                {{recordlist.money}}
                            </div>
                            <div class="text-intro">
                                余额
                            </div>
                        </div>
                        <div class="line-border">

                        </div>
                        <div class="every-item">
                            <div class="number">
                                {{recordlist.integral}}
                            </div>
                            <div class="text-intro">
                                积分
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="dead-line-notice">
                <div class="dead-time-content">
                    <div class="notice-title-header">
                        <i class="notice-icon"></i> 到期提醒
                    </div>
                    <div class="detail-car-info">
                        <div class="every-info-item">
                            <label>本次保养：</label>
                            <span>{{recordlist.stadate}}</span>
                        </div>
                        <div class="every-info-item">
                            <label>下次保养：</label>
                            <span>{{recordlist.enddate}}</span>
                        </div>
                        <div class="every-info-item">
                            <label>保险时间：</label>
                            <span>{{recordlist.insurancedate}}</span>
                        </div>
                        <div class="every-info-item">
                            <label>年检时间：</label>
                            <span>{{recordlist.stateInspectiondate}}</span>
                        </div>
                        <div class="every-info-item">
                            <label>绑定车辆：</label>
                            <span>{{recordlist.car}}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="combo-main">
                <div class="combo-bg">
                    <div class="combo-title flex flex-between">
                        <div>剩余套餐卡</div>
                        <div>已用套餐卡</div>
                    </div>
                </div>
                <div class="padding-16 combo-box-shadow">
                    <div class="table-header-label">
                        <van-row>
                            <van-col span="6">序号</van-col>
                            <van-col span="6">项目名称</van-col>
                            <van-col span="6">数量</van-col>
                            <van-col span="6">创建时间</van-col>
                        </van-row>
                    </div>
                    <van-row
                        class="combo-item-list"
                        v-for="(item,index) in comboList"
                        :key="index"
                    >
                        <van-col span="6">
                            <span class="index-circle">
                                {{index+1}}
                            </span>
                        </van-col>
                        <van-col span="6">
                            {{item.projectname}}
                        </van-col>
                        <van-col span="6">
                            {{item.account}}
                        </van-col>
                        <van-col span="6">
                            {{item.createdate}}
                        </van-col>
                    </van-row>
                    <div class="view-more-data">
                        <span
                            @click="viewMore"
                            v-if="comboList.length < total">
                            查看更多  <van-icon name="arrow-down" />
                        </span>
                        <span v-else>没有更多了</span>
                    </div>
                </div>
            </div>
            <van-popup position="bottom" v-model="show">
                <van-picker
                    show-toolbar
                    :columns="columns"
                    @confirm="onConfirm"
                    @cancel="onCancel"
                    @change="onChange"
                />
            </van-popup>
        </div>
    </div>
</template>
<script>
import {Sticky, Popup, Picker, Icon, Col, Row} from 'vant';
export default {
    components: {
        [Sticky.name]: Sticky,
        [Icon.name]: Icon,
        [Popup.name]: Popup,
        [Picker.name]: Picker,
        [Col.name]: Col,
        [Row.name]: Row
    },
    props: {
        title: {
            type: String
        }
    },
    data() {
        return {
            total: 10,
            recordlist: {
                'money': '100', //余额
                'integral': '1900', //积分
                'stadate': '2012-12-12 ', //本次保养
                'enddate': '2013-12-12', //下次保养
                'insurancedate': '2012-12-12', //保险时间
                'stateInspectiondate': '2012-12-12'//年检时间
            },
            comboList: [{
                'projectname': '洗车',
                'account': '2',
                'createdate': '2020-12-13'
            }, {
                'projectname': '洗车',
                'account': '2',
                'createdate': '2020-12-13'
            }, {
                'projectname': '洗车',
                'account': '2',
                'createdate': '2020-12-13'
            }],
            whichCompany: '清行科技(皖A545466)',
            show: false,
            columns: ['巢湖洁诺(皖AW2L66)', '清行科技(皖A545466)'],
            companyList: [
                {
                    name: '巢湖洁诺(皖AW2L66)'
                }, {
                    name: '清行科技(皖A545466)'
                }]
        };
    },
    methods: {
        onConfirm(value, index) {
            console.log(value, index);
            this.whichCompany = value;
            this.show = false;
        },
        onChange(picker, value, index) {
            console.log(value, index);

        },
        viewMore(){
            this.comboList = this.comboList.concat(this.comboList);
        },
        openSelectCompany(){
            this.show = true;
        },
        onCancel() {
            this.show = false;
        },
        goBack() {
            this.$router.go(-1);
        },
    },
};
</script>
<style lang="less">
.vip-card {
    padding: 16px;
    .company-header {
        padding: 16px 16px 0;
        .line-title {
            padding-bottom: 16px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.36)
        }
        .company-title {
            color: #625921;
            font-size: 16px;
        }
        .van-icon-arrow-down{
            color:#625921
        }
        .user-account {
            padding-top: 12px;
            .every-item {
                text-align: center
            }
            .line-border {
                width: 1px;
                background: rgba(255, 255, 255, 0.36);
            }
            .number {
                color: #311500;
                font-size: 26px;
                font-family:Arial;
                font-weight:400;
            }
            .text-intro {
                font-size: 13px;
                color: #625921;
                font-family:PingFang SC;
                font-weight:500;
                margin-top: 5px
            }
        }
    }
    .dead-line-notice {
        margin-top: 15px;
        background:rgba(255,255,255,1);
        box-shadow:0px 12px 29px 0px rgba(170,170,170,0.24);
        border-radius:24px;
        .dead-time-content {
            padding: 20px 16px;
        }
        .notice-title-header{
            color: #625921;
            font-size: 16px;
            padding-bottom:13px;
            border-bottom: 1px solid #E6E6E6
        }
        .detail-car-info {
            margin-top: 16px;
            .every-info-item {
                font-weight:500;
                font-size:14px;
                font-family:PingFang SC;
                margin-top: 10px;
                label{
                    color:rgba(153,153,153,1);
                    margin-right: 12px;
                }
                span {
                    color:rgba(34,34,34,1);
                }
            }
        }
    }
    .combo-main {
        margin-top: 16px;
        .combo-box-shadow {
            background:rgba(255,255,255,1);
            box-shadow:0px 12px 29px 0px rgba(170,170,170,0.24);
            border-radius:0px 0px 24px 24px;
        }
        .combo-title{
            color:#625921;
            font-size: 17px;
            line-height: 45px;
            padding: 0 44px
        }
        .padding-16{
            padding: 16px;
        }
        .table-header-label {
            font-size: 14px;
            color: #BBBBBB
        }
        .combo-item-list {
            font-size: 14px;
            color: #222222;
            .index-circle {
                color: #fff;
                font-size: 10px;
                text-align: center;
                line-height: 23px;
            }
        }
        .view-more-data {
            border-top: 1px solid #E8E8E8;
            padding: 15px 0 0;
            font-size: 14px;
            color: #BBBBBB;
            text-align: center;
            .van-icon-arrow-down {
                position: relative;
                top: 1px
            }
        }
        .van-row {
            padding-bottom: 16px
        }
    }
}
</style>
