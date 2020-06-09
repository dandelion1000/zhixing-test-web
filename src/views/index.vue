<template>
    <div class="car-display-index">
        <van-sticky>
            <van-row
                class="top-header-search"
                type="flex"
                justify="space-between">
                <van-col
                    :class="{'tab-active':curATab==1}"
                    span="6"
                    @click="openBrand(1)">
                    品牌
                </van-col>
                <van-col
                    :class="{'tab-active':curATab==2}"
                    span="6"
                    @click="openPrice(2)"
                >
                    价格
                </van-col>
                <van-col
                    :class="{'tab-active':curATab==3}"
                    span="6"
                    @click="openArea(3)">
                    区域
                </van-col>
                <van-col
                    :class="{'tab-active':curATab==4}"
                    span="6"
                    @click="searchMy(4)">
                    我的发布
                </van-col>
            </van-row>
            <!-- <van-dropdown-menu
                active-color="#f2826a">
                <van-dropdown-item title="品牌" ref="brand" @open="openBrand">
                </van-dropdown-item>
                <van-dropdown-item title="价格" ref="priceitem">
                    <div class="white-bg">
                        <div class="self-define ">
                            <div class="price-title">自定义价格 </div>
                            <div class="flex flex-center">
                                <van-field
                                    border
                                    size="small"
                                    class="file-input-num gray-bg"
                                    v-model="query.price1"
                                    type="number"  >
                                    <template #button>
                                        万
                                    </template>
                                </van-field>
                                <span class="line">——</span>
                                <van-field
                                    border
                                    size="small"
                                    class="file-input-num gray-bg"
                                    v-model="query.price2"
                                    type="number"  >
                                    <template #button>
                                        万
                                    </template>
                                </van-field>
                                <van-button
                                    color="#f2826a"
                                    size="small"
                                    :disabled="!query.price1||!query.price2"
                                    @click="priceChange(query.price1+'-'+query.price2)"
                                >
                                    确定
                                </van-button>
                            </div>
                        </div>
                        <div class="price-list">
                            <van-tag
                                v-for="(item,index) in priceList"
                                :key="index"
                                @click="selectPrice(index,item.code)"
                                :color="curActive==index?'#f2826a':'#969799'"
                                class="tag-item-li"
                                size="large"
                                plain
                            >
                                {{item.value}}
                            </van-tag>
                        </div>
                    </div>
                </van-dropdown-item>

                <van-dropdown-item title="区域" ref="city" @open="openArea">
                </van-dropdown-item>
            </van-dropdown-menu> -->
        </van-sticky>
        <car-list ref="carlist" :is-check-my="isCheckMy"></car-list>
        <van-popup
            v-model="showPrice"
            position="top"
            :style="{ height: '50%' }"
            :overlay-class="priceOverlay"
            :class="{'price-overlay-body':isAddStyle}"
            @close="closePrice"
        >
            <div class="white-bg">
                <div class="self-define ">
                    <div class="price-title">自定义价格 </div>
                    <div class="flex flex-center">
                        <van-field
                            border
                            size="small"
                            class="file-input-num gray-bg"
                            v-model="query.price1"
                            type="number"  >
                            <template #button>
                                万
                            </template>
                        </van-field>
                        <span class="line">——</span>
                        <van-field
                            border
                            size="small"
                            class="file-input-num gray-bg"
                            v-model="query.price2"
                            type="number"  >
                            <template #button>
                                万
                            </template>
                        </van-field>
                        <van-button
                            color="#f2826a"
                            size="small"
                            :disabled="!query.price1||!query.price2"
                            @click="priceChange(query.price1+'-'+query.price2)"
                        >
                            确定
                        </van-button>
                    </div>
                </div>
                <div class="price-list">
                    <van-tag
                        v-for="(item,index) in priceList"
                        :key="index"
                        @click="selectPrice(index,item.code)"
                        :color="curActive==index?'#f2826a':'#969799'"
                        class="tag-item-li"
                        size="large"
                        plain
                    >
                        {{item.value}}
                    </van-tag>
                </div>
            </div>
        </van-popup>
        <brand-popup ref="brand" @on-change="brandChange" @on-close="onClose"></brand-popup>
        <area-popup ref="area" @on-change="areaChange" @on-close="onClose"></area-popup>
    </div>
</template>
<script>
import {
    Col,
    Row,
    Field,
    DropdownMenu,
    DropdownItem,
    IndexBar,
    IndexAnchor,
    Cell,
    Popup,
    Tag,
    Button,
    Area,
    Sticky,
    Loading,
} from 'vant';
import areaList from '@/util/area.js';
import CarList from './car/list.vue';
import BrandList from '@/util/brand.js';
import BrandPopup from '@/views/car/brand.vue';
import AreaPopup from '@/views/car/area-popup.vue';
export default {
    components: {
        [Col.name]: Col,
        [Row.name]: Row,
        [Field.name]: Field,
        [DropdownMenu.name]: DropdownMenu,
        [DropdownItem.name]: DropdownItem,
        [IndexBar.name]: IndexBar,
        [IndexAnchor.name]: IndexAnchor,
        [Cell.name]: Cell,
        [Popup.name]: Popup,
        [Tag.name]: Tag,
        [Button.name]: Button,
        [Area.name]: Area,
        [Sticky.name]: Sticky,
        [Loading.name]: Loading,
        'area-popup': AreaPopup,
        'car-list': CarList,
        'brand-popup': BrandPopup
    },
    data() {
        return {
            showPrice: false,
            curATab: null,
            isCheckMy: false,
            query: {
                sort: null,
                brandseries: null,
                price: null,
                city: null,
                createuser: null
            },
            priceOverlay: '',
            brandlist: BrandList,
            indexList: ['A', 'B', 'C', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'W', 'X', 'Y', 'Z'],
            areaList: areaList,
            value2: null,
            value3: '100',
            value4: 'all',
            show: false,
            isAddStyle: false,
            curActive: '0',
            // option1: [
            //     { text: '默认排序', value: null },
            //     { text: '价格最低', value: 'price' },
            // ],
            option3: [
                { text: '价格', value: '100' },
                { text: '新款商品', value: '200' },
                { text: '活动商品', value: '300' },
            ],
            option4: [
                { text: '区域', value: 'all' },
                { text: '新款商品', value: '1' },
                { text: '活动商品', value: '2' },
            ],
            priceList: [{
                code: null,
                value: '不限',
            }, {
                code: '0-3',
                value: '3万以下',
            },
            {
                code: '3-5',
                value: '3-5万',
            },
            {
                code: '5-10',
                value: '5-10万',
            }, {
                code: '10-15',
                value: '10-15万',
            }, {
                code: '15-20',
                value: '15-20万'
            }, {
                code: '20-25',
                value: '20-25万'
            }, {
                code: '25-30',
                value: '25-30万'

            }, {
                code: '30',
                value: '30万以上'
            }]
        };
    },
    methods: {
        selectPrice(index, price){
            this.curActive = index;
            this.isCheckMy = false;
            this.priceChange(price);
        },
        onClose(){
            this.curATab=null;
        },
        searchMy(index){
            this.isCheckMy = true;
            this.curATab = index;
            this.query.createuser=JSON.parse(localStorage.getItem('usermobile'));
            this.$refs.carlist.onRefresh(this.query);
        },
        openPrice(index){
            this.isCheckMy = false;
            this.curATab = index;
            this.showPrice=true;
            this.isAddStyle = true;
            this.priceOverlay = 'price-overlay-body';
        },
        closePrice(){
            this.isAddStyle = false;
            this.showPrice=false;
            this.priceOverlay='';
        },
        openBrand(index){
            this.isCheckMy = false;
            this.curATab = index;
            this.$refs.brand.open();
        },
        openArea(index){
            this.isCheckMy = false;
            this.curATab = index;
            this.$refs.area.open();
        },
        openSubSeries(items){
            this.curFirstSelct = items.name;
            this.subItems = items.typename;
            this.subShow = true;
        },
        areaChange(res){
            this.query.city = res;
            this.$refs.carlist.onRefresh(this.query);
        },
        priceChange(res){
            this.query.price = res;
            // this.$refs.priceitem.toggle();
            this.showPrice=false;
            this.$refs.carlist.onRefresh(this.query);
        },
        sortChange(res){
            this.query.sort = res;
            this.$refs.carlist.onRefresh(this.query);
        },
        brandChange(res){
            this.query.brandseries = res;
            this.$refs.carlist.onRefresh(this.query);
        }
    },

};
</script>
<style lang="less">

.car-display-index {
    .top-header-search {
        padding: 15px 10px;
        text-align: center;
        box-shadow:0 2px 12px rgba(100, 101, 102, 0.08);
        background: #fff;
        .van-col--6 {
            position: relative;
        }

        .tab-active{
            color:#f2826a
        }
    }
    .header-title {
        text-align: center;
        padding: 5.33333vw;
        font-size: 4.8vw;
        position: fixed;
    }

    .header-title {
        text-align: center;
        padding: 20px;
        font-size: 18px;
    }
    .self-define {
        color: #2c3e50cf;
        padding: 10px 20px;
        border-bottom: 1px solid #eee;
        .van-cell {
            padding: 4px 8px;
            line-height: inherit;
        }
        .van-button{
            margin-left: 20px;
            font-size: 13px;
            line-height: 13px;
        }
        .line {
            margin:0 10px;
            color: #969799;
            // color: #2c3e50cf
        }
        .price-title {
            font-size: 14px;
            margin-bottom: 10px;
        }
        .file-input-num {
            width: 70px;
            .van-field__button {
                color: #2c3e50cf;
                font-size: 13px;
            }
        }
    }
    .price-list {
        margin: 10px 0 10px;
    }
    .tag-item-li {
        display: inline-block;
        width: 90px;
        text-align: center;
        margin: 10px 0 10px 15px
    }
    .van-picker__confirm {
        color: #f2826a
    }
    // .van-picker__toolbar {
    //     display: none
    // }

}

</style>
