<template>
    <div class="vip-big-bg">
        <div class="vip-card">
            <div class="header-bg-image">
                <div class="company-header">
                    <div class="line-title flex flex-between" @click="openSelectCompany">
                        <div class="company-title">
                            {{whichCompany}}
                        </div>
                        <van-icon v-if="this.columns.length>1"  name="arrow-down" />
                    </div>
                    <div class="user-account flex flex-around">
                        <div class="every-item">
                            <div class="number">
                                {{accountRest.money||0}}
                            </div>
                            <div class="text-intro">
                                余额
                            </div>
                        </div>
                        <div class="line-border">

                        </div>
                        <div class="every-item">
                            <div class="number">
                                {{accountRest.integral||0}}
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
                            <span>
                                <span v-if="warnInfo.stadate">
                                    {{warnInfo.stadate}}
                                </span>
                                <span v-if="warnInfo.mileage">
                                    {{warnInfo.mileage}}万公里
                                </span>
                            </span>
                        </div>
                        <div class="every-info-item">
                            <label>下次保养：</label>
                            <span>
                                <span v-if="warnInfo.enddate">
                                    {{warnInfo.enddate}}
                                </span>
                                <span v-if="warnInfo.mileageend">
                                    {{warnInfo.mileageend}}万公里
                                </span>

                            </span>
                        </div>
                        <div class="every-info-item">
                            <label>保险时间：</label>
                            <span>{{warnInfo.insurancedate}}</span>
                        </div>
                        <div class="every-info-item">
                            <label>年检时间：</label>
                            <span>{{warnInfo.stateInspectiondate}}</span>
                        </div>
                        <div class="every-info-item">
                            <label>绑定车辆：</label>
                            <span>{{warnInfo.carno}}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="combo-main">
                <div :class="'tab-card-change'+curTab">
                    <div class="combo-title flex flex-between">
                        <div class="" @click="tabChange(1)">剩余套餐卡</div>
                        <div class="" @click="tabChange(2)">已用套餐卡</div>
                    </div>
                </div>
                <div class="padding-16 combo-box-shadow">
                    <div class="table-header-label">
                        <van-row>
                            <van-col span="7">项目名称</van-col>
                            <van-col span="4">数量</van-col>
                            <van-col span="7" v-if="curTab==2">车牌号</van-col>
                            <van-col span="6">
                                <span v-if="curTab==1">创建</span>
                                <span v-else>使用</span>
                                时间
                            </van-col>
                        </van-row>
                    </div>
                    <van-row
                        class="combo-item-list"
                        v-for="(item,index) in comboList"
                        :key="index"
                    >
                        <van-col span="7">
                            {{item.projectname}}
                        </van-col>
                        <van-col span="4">
                            {{item.account}}
                        </van-col>
                        <van-col span="7" v-if="curTab==2">
                            {{item.carno}}
                        </van-col>
                        <van-col span="6">
                            {{item.updatetime}}
                        </van-col>
                    </van-row>
                    <van-loading
                        v-if="sloading"
                        type="spinner"
                        size="34px" />

                    <div class="view-more-data"  v-if="curTab==1 && !sloading">
                        <span v-if="!comboList.length">暂无数据</span>
                        <span v-else>没有更多了</span>
                    </div>
                    <div class="view-more-data" v-if="curTab==2 && !sloading">
                        <span v-if="!comboList.length">暂无数据</span>
                        <span v-else>
                            <span
                                @click="viewMore"
                                v-if="comboList.length < total">
                                查看更多  <van-icon name="arrow-down" />
                            </span>
                            <span  v-else>没有更多了</span>
                        </span>
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
import {getUserCarInfo, deadlineWarn, getAccountRest, restCards, usedCards} from '@/api/user';
import {Sticky, Toast, Popup, Picker, Icon, Col, Row, Loading} from 'vant';
export default {
    components: {
        [Sticky.name]: Sticky,
        [Icon.name]: Icon,
        [Popup.name]: Popup,
        [Picker.name]: Picker,
        [Col.name]: Col,
        [Row.name]: Row,
        [Loading.name]: Loading
    },
    props: {
        title: {
            type: String
        }
    },
    data() {
        return {
            total: 0,
            page: 1,
            rows: 10,
            curTab: 1,
            accountRest: {
                money: '0',
                integral: '0'
            },
            comboList: [],
            comboRestList: [],
            comboUsedList: [],
            whichCompany: '',
            show: false,
            columns: [],
            companyList: [],
            warnInfo: {},
            curCarIndex: 0,
            sloading: false
        };
    },
    mounted() {
        this.getUserCarInfo();
    },
    methods: {
        getUserCarInfo(){
            let userPhone = JSON.parse(localStorage.getItem('usermobile'));
            Toast.loading({
                message: '加载中...',
                overlay: true,
                forbidClick: true,
                loadingType: 'spinner',
            });
            getUserCarInfo({
                phone: userPhone //15255550012
            }).then((res) => {
                this.companyList = res;
                this.columns = Array.isArray(res)
                    ? res.map((item) => {
                        return `${item.motorname}+(${item.carno})`;
                    })
                    :[];
                if (this.columns.length > 0) {
                    this.whichCompany = this.columns[0];
                    this.getDeadlineWarn();
                    this.getAccountRest();
                    this.getRestCards();
                }
            });
        },
        getDeadlineWarn(){
            // this.curCarIndexs
            let id = this.companyList[this.curCarIndex].carid;
            deadlineWarn({
                carid: id
            }).then((res) => {
                console.log('warnInfo', res);
                Toast.clear();
                this.warnInfo = res;
            });
        },
        getAccountRest(){
            let id = this.companyList[this.curCarIndex].clientid;
            getAccountRest({id: id}).then((res) => {
                console.log('rest', res);
                this.accountRest = res;
                Toast.clear();
            });
        },
        getRestCards(){
            let id = this.companyList[this.curCarIndex].clientid;
            if (!id) {
                return;
            }
            this.sloading = true;
            restCards({
                clientid: id
            }).then((res) => {
                console.log('getRestCards', res);
                this.sloading = false;
                this.comboList = res;
            });
        },
        getusedCards(){
            let id = this.companyList[this.curCarIndex].clientid;
            if (!id) {
                return;
            }
            this.sloading = true;
            usedCards({
                page: this.page,
                rows: this.rows,
                clientid: id
            }).then((res) => {
                console.log('getusedCards', res);
                this.sloading = false;
                this.total =res.total;
                this.comboList = this.comboList.concat(res.rows);
            }).catch(() => {
                this.sloading = false;
            });
        },
        onConfirm(value, index) {
            console.log(value, index);
            this.whichCompany = value;
            this.curCarIndex = index;
            this.getDeadlineWarn();
            this.getAccountRest();
            this.curTab===1 ? this.getRestCards() : this.getusedCards();
            this.show = false;
        },
        tabChange(index){
            if(this.curTab === index){
                return;
            }
            this.curTab = index;
            this.comboList = [];
            index===1 ? this.getRestCards() : this.getusedCards()
            ;
        },
        onChange(picker, value, index) {
            console.log(value, index);
            // this.curCarIndex = index;
            // this.whichCompany = value;

        },
        viewMore(){
            this.page++;
            this.getusedCards();
            // this.comboList = this.comboList.concat(this.comboList);
        },
        openSelectCompany(){
            if (this.columns.length===1) {
                return;
            }
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
                    // margin-right: 5px;
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
            .van-loading--spinner {
                text-align: center
            }
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
        .van-col{
            text-align: center;
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
