<template>
    <div class="car-detail">
        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
            <template v-for="(image, index) in detailInfo.imgArray" >
                <van-swipe-item :key="index">
                    <img :src="image" />
                </van-swipe-item>
            </template>
        </van-swipe>
        <div class="body-info">
            <div class="detail-car-title pdt10">
                {{detailInfo.licensingdate}}款
                {{detailInfo.brandseries}}
                {{detailInfo.remarks}}
            </div>
            <div class="bold base-color pdt10 pdb10 border-bottom"> {{detailInfo.price}}万</div>
            <div class="car-every-info pdt20 pdb20 ">
                车辆信息
            </div>
            <div class="every-sub-item-info">
                <label>表显里程  </label>
                <span>{{detailInfo.kilometers}}公里</span>
            </div>
            <div class="every-sub-item-info">
                <label>上牌时间  </label>
                <span>{{detailInfo.licensingdate}}</span>
            </div>
            <div class="every-sub-item-info">
                <label>车辆所在地  </label>
                <span>{{detailInfo.city}}</span>
            </div>
            <div class="every-sub-item-info">
                <label>车况信息及备注  </label>
                <span>{{detailInfo.condition}}</span>
            </div>
            <div class="every-sub-item-info">
                <label>车辆来源  </label>
                <span>{{detailInfo.source}}</span>
            </div>
            <div class="every-sub-item-info">
                <label>联系方式  </label>
                <span>{{detailInfo.phone}}</span>
                <a class="tel-href" :href="'tel:'+detailInfo.phone">
                    <van-icon name="phone-o" />
                </a>
            </div>
        </div>

    </div>
</template>
<script>
import {
    Popup,
    CellGroup,
    Cell,
    Field,
    IndexBar,
    IndexAnchor,
    Swipe,
    SwipeItem,
    Icon
} from 'vant';
export default {
    components: {
        [Popup.name]: Popup,
        [CellGroup.name]: CellGroup,
        [Cell.name]: Cell,
        [Field.name]: Field,
        [IndexBar.name]: IndexBar,
        [IndexAnchor.name]: IndexAnchor,
        [Swipe.name]: Swipe,
        [SwipeItem.name]: SwipeItem,
        [Icon.name]: Icon
    },
    data(){
        return {
            detailInfo: {},
        };
    },
    mounted() {
        console.log(this.$route);
        let info = JSON.parse(this.$route.query.infos);
        info.imgArray=info.imgurl?info.imgurl.split(','):[];
        this.detailInfo = info;
        console.log('this.detailInfo', this.detailInfo);
    },

};
</script>
<style lang="less">
.car-detail {
    .tel-href {
        position: relative;
    }
    .van-icon-phone-o {
        position: absolute;
        top:-8px;
        left: 20px;
        font-size: 32px;
        color: #f2826a
    }
    .body-info {
        padding:0 20px;
        .detail-car-title {
            color: #5b5757;
            font-size: 16px;
        }
        .car-every-info {
            color: #222;
            border-bottom: 2px dashed #eee
        }
    }
    .every-sub-item-info {
        font-size: 14px;
        padding: 20px 0 0;
        label {
            color: #999;
        }
        span {
            color: #333;
            margin-left: 15px
        }
    }
    .my-swipe .van-swipe-item {
        color: #fff;
        font-size: 20px;
        text-align: center;
        img{
            display: inline-block;
            width: 375px;
            height: 170px;
        }
    }
}

</style>
