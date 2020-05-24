<template>
    <div class="seal-car">
        <Header :title="'卖车'"></Header>
        <van-form @submit="onSubmit">
            <van-cell title="首次上牌" is-link  @click.native="popTime">
                {{formItem.licensingDate}}
            </van-cell>
            <van-cell title="品牌车系" is-link @click.native="popBrand" >
                {{formItem.brandSeries}}
            </van-cell>
            <van-field v-model="formItem.kilometers"
                       type="number"
                       input-align="right"
                       placeholder="请输入公里数"
                       label="公里数（万）" />
            <van-cell title="车况描述" is-link @click.native="popCondtion" >
                {{formItem.condition}}
            </van-cell>
            <van-field v-model="formItem.price"
                       type="number"
                       input-align="right"
                       placeholder="请输入售价"
                       label="售价（万元）" />
            <van-cell title="所在城市" is-link @click.native="popCity" >
                {{formItem.city}}
            </van-cell>
            <van-field v-model="formItem.phone"
                       type="number"
                       input-align="right"
                       placeholder="请输入手机号"
                       label="手机号码 " />
            <div class="upload-imgs">
                <div class="img-upload-title">
                    上传图片(最多可以上传3张)
                </div>
                <van-uploader v-model="fileList" :after-read="afterRead"  multiple :max-count="3" />
            </div>
            <div style="margin: 16px;">
                <van-button
                    block
                    color="#f2826a"
                    size="middle"
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
        <brand-popup ref="brand" v-model="formItem.brandSeries"></brand-popup>
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
    Uploader
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
        Header,
        [BrandPopup.name]: BrandPopup,
        'brand-popup': BrandPopup,
        'city-popup': CityPopup,
        'condtion-popup': CondtionPopup
    },
    data(){
        return {
            show: false,
            formItem: {
                licensingDate: '',
                brandSeries: '',
                kilometers: '',
                price: '',
                condition: '',
                imgurl: '',
                source: '',
                city: '',
                phone: '',
            },
            fileList: [],
            timeList: []
        };
    },
    mounted() {
        this.creatTimeList();
    },
    methods: {
        afterRead(res){
            Api.uploadFile(res.file).then((res) => {
                console.log(res);
            });
        },

        creatTimeList(){
            let array = [];
            for(let i=20;i>=0;i--){
                array.unshift(new Date().getFullYear()-i);
            }
            this.timeList = array;
            console.log(this.timeList);
        },
        selectTime(time){
            this.show = false;
            this.formItem.licensingDate = time;
        },
        onSubmit(){
            let params = this.formItem;
            console.log(params);
            Api.saveReleaseCar(params).then((res) => {
                console.log('res', res);
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
    .upload-imgs {
        padding: 10px 20px;
        .img-upload-title {
            font-size: 14px;
            padding-bottom: 20px
        }
    }
}

</style>
