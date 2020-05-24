<template>
    <div class="car-display-index">
        <van-sticky>
            <van-dropdown-menu active-color="#f2826a">
                <van-dropdown-item
                    v-model="query.sort"
                    :options="option1"
                    @change="sortChange"
                />
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
            </van-dropdown-menu>
        </van-sticky>
        <car-list ref="carlist"></car-list>
        <brand-popup ref="brand" @on-change="brandChange"></brand-popup>
        <area-popup ref="area" @on-change="areaChange"></area-popup>
    </div>
</template>
<script>
import {
    Toast,
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
    Loading
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
            query: {
                sort: null,
                brandseries: null,
                price: null,
                city: null
            },
            brandlist: BrandList,
            indexList: ['A', 'B', 'C', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'W', 'X', 'Y', 'Z'],
            areaList: areaList,
            value2: null,
            value3: '100',
            value4: 'all',
            show: false,
            curActive: '0',
            option1: [
                { text: '默认排序', value: null },
                { text: '价格最低', value: 'price' },
            ],
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
            this.priceChange(price);
        },
        openBrand(){
            this.$refs.brand.open();

        },
        openArea(){
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
            // this.$refs.city.toggle();
        },
        priceChange(res){
            this.query.price = res;
            this.$refs.priceitem.toggle();
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
    .van-popup{
        overflow-y: none;
    }
    .header-title {
        text-align: center;
        padding: 5.33333vw;
        font-size: 4.8vw;
        position: fixed;
    }
    .van-dropdown-item__content {
        max-height: 75%;
        overflow-y: scroll;
    }
    .van-index-bar {
        position: relative;
        // top: 82px;
        // max-height: 100%;
        overflow-y: scroll;
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
