<template>
    <div class="seal-car">
        <Header :title="'卖车'"></Header>
        <van-form @submit="onSubmit">
            <van-cell title="首次上牌" is-link  @click.native="popTime">
                {{formItem.licensingdate}}
            </van-cell>
            <van-cell title="品牌车系" is-link @click.native="popBrand" >
                {{formItem.brandseries}}
            </van-cell>
            <van-cell title="所在城市" is-link @click.native="popCity" >
                {{formItem.city}}
            </van-cell>
            <van-cell title="车况描述" is-link @click.native="popCondtion" >
                {{formItem.condition}}
            </van-cell>
            <van-field
                name="radio"
                label="换挡方式"
                input-align="right"
            >
                <template #input>
                    <van-radio-group
                        v-model="formItem.remarks"
                        direction="horizontal">
                        <van-radio name="自动档">自动档 </van-radio>
                        <van-radio name="手动档">手动档 </van-radio>
                    </van-radio-group>
                </template>
            </van-field>
            <van-field
                name="radio"
                label="车辆来源"
                input-align="right"
            >
                <template #input>
                    <van-radio-group v-model="formItem.source" direction="horizontal">
                        <van-radio name="个人">个人 </van-radio>
                        <van-radio name="车商">车商</van-radio>
                    </van-radio-group>
                </template>
            </van-field>
            <van-field v-model="formItem.kilometers"
                       type="number"
                       input-align="right"
                       placeholder="请输入公里数"
                       label="公里数（万）" />
            <van-field v-model="formItem.price"
                       type="number"
                       input-align="right"
                       placeholder="请输入售价"
                       label="售价（万元）" />
            <!-- <van-field v-model="formItem.phone"
                       input-align="right"
                       type="tel"
                       maxlength="11"
                       placeholder="请输入手机号"
                       label="手机号码 " /> -->
            <div class="upload-imgs">
                <div class="img-upload-title">
                    上传图片(最多可以上传3张)
                </div>
                <van-uploader
                    v-model="fileList"
                    :after-read="afterRead"
                    @delete="deleteImg"
                    :max-count="3" />
            </div>
            <div style="margin: 16px;">
                <van-button
                    block
                    color="#f2826a"
                    size="middle"
                    :loading="sloading"
                    loading-text="提交中..."
                    loading-type="spinner"
                    native-type="submit"
                >
                    确定
                </van-button>
            </div>
        </van-form>
        <van-popup
            v-model="show"
            :overlay="false"
            :closeable="true"
            position="right"
            :style="{width:'100%', height: '100%' }" >
            <div class="fix-header-title text-center pd20">
                选择上牌时间
            </div>
            <div class="time-list fix-scroll-list">
                <template v-for="item in timeList">
                    <van-cell :key="item" :title="item" @click="selectTime(item)"/>
                </template>
            </div>
        </van-popup>
        <brand-popup ref="brand" v-model="formItem.brandseries"></brand-popup>
        <city-popup ref="city" v-model="formItem.city"></city-popup>
        <condtion-popup ref="condtion" v-model="formItem.condition"></condtion-popup>
    </div>
</template>
<script>
import {
    Toast,
    Popup,
    List,
    Cell,
    Icon,
    Field,
    Form,
    Button,
    Uploader,
    RadioGroup,
    Radio
} from 'vant';
import Api from '@/api/index';

import Header from '../layout/header.vue';
import BrandPopup from './brand.vue';
import CityPopup from './area-popup.vue';
import CondtionPopup from './condtion.vue';
export default {
    components: {
        [Form.name]: Form,
        [Popup.name]: Popup,
        [List.name]: List,
        [Cell.name]: Cell,
        [Icon.name]: Icon,
        [Field.name]: Field,
        [Button.name]: Button,
        [Uploader.name]: Uploader,
        [RadioGroup.name]: RadioGroup,
        [Radio.name]: Radio,
        Header,
        [BrandPopup.name]: BrandPopup,
        'brand-popup': BrandPopup,
        'city-popup': CityPopup,
        'condtion-popup': CondtionPopup
    },
    data(){
        return {
            show: false,
            sloading: false,
            formItem: {
                licensingdate: '',
                brandseries: '',
                city: '',
                condition: '',
                remarks: '',
                source: '',
                kilometers: '',
                price: '',
                phone: '',
                imgurl: [],
            },
            mapmessage: {
                licensingdate: '首次上牌时间',
                brandseries: '品牌车系',
                city: '所在城市',
                condition: '车况描述',
                remarks: '换挡方式',
                source: '车辆来源',
                kilometers: '公里数',
                price: '价格',
                // phone: '手机号',
                imgurl: '车辆图片',
            },
            fileList: [],
            timeList: []
        };
    },
    mounted() {
        this.creatTimeList();
    },
    methods: {
        afterRead(file){
            file.status = 'uploading';
            file.message = '上传中...';
            Api.uploadFile(file.file).then((res) => {
                console.log(res);
                file.status = 'success';
                this.formItem.imgurl.push(res.insertUrl);
            }).catch(() => {
                file.status = 'failed';
                file.message = '上传失败';
            });
        },
        deleteImg(res){
            console.log('delete', res);
        },
        creatTimeList(){
            let array = [];
            for(let i=20;i>=0;i--){
                array.unshift(new Date().getFullYear()-i);
            }
            this.timeList = array;
        },
        selectTime(time){
            this.show = false;
            this.formItem.licensingdate = time;
        },
        onSubmit(){
            if (this.sloading){
                return;
            }
            let params = {
                ...this.formItem,
                imgurl: this.formItem.imgurl.join(),
            };
            for(let i in params ){
                if (!params[i]){
                    return Toast(`${this.mapmessage[i]}必填`);
                }
            }
            let reg1 =  /^((([1-9]\d{0,1}|0)(\.\d+)?)|100)$/;
            let reg2 =  /^((([1-9]\d{0,1}|0|([1-2]\d{2}))(\.\d{1,2})?)|100|300)$/;

            if  (!reg1.test(this.formItem.kilometers)){
                return Toast('请填入0-100以内包括小数的合法公里数');
            }
            if  (!reg2.test(this.formItem.price)){
                return Toast('请填入0-300以内保留最多两位小数的合法金额数字');
            }
            this.sloading = true;
            params = {
                ...params,
                createuser: JSON.parse(localStorage.getItem('usermobile'))
            };
            console.log('params', params);
            Api.saveReleaseCar(params).then(() => {
                Toast('提交成功');
                this.sloading = false;
                this.$router.push({
                    name: 'list'
                });
            }).catch(() => {
                Toast('系统错误，稍后再试');
                this.sloading = false;
            });
        },
        popTime(){
            this.show = true;
        },
        popBrand(){
            this.$refs.brand.open();
        },
        popCondtion(){
            this.$refs.condtion.open();
        },
        popCity(){
            this.$refs.city.open();
        }
    },
};
</script>
<style lang="less">
.seal-car {
    .van-sticky--fixed {
        background: #fff;
    }
    .van-cell__title {
        color: #969799
    }
    .van-cell__value {
        flex: 2;
        color: #323233
    }
    .van-field__control--right {
        padding-right: 20px
    }
    .van-radio--horizontal {
        margin-right: 0;
        margin-left: 40px;
        width: 75px;
    }
    .upload-imgs {
        padding: 10px 20px;
        .img-upload-title {
            font-size: 14px;
            padding-bottom: 20px
        }
    }
}

</style>
