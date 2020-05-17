<template>
    <div>
        <van-popup
            v-model="show"
            :overlay="false"
            :closeable="true"
            position="right"
            :style="{width:'100%', height: '100%' }" >
            <van-sticky>
                <div class="fix-header-title text-center pd21">
                    选择品牌系数
                </div>
            </van-sticky>
            <div class="brand-list fix-scroll-list">
                <van-index-bar :index-list="indexList">
                    <template v-for="(item,index) in brandlist">
                        <van-index-anchor :key="index" :index="index" />
                        <template v-for="(i,j) in item">
                            <van-cell
                                :key="i.id"
                                :title="i.name"
                                :class="{selectedclr:parentActive==j+index}"
                                is-link
                                @click.native="openSubSeries(j+index,i)"/>
                        </template>
                    </template>
                </van-index-bar>
            </div>
        </van-popup>
        <van-popup
            v-model="subShow"
            :overlay="false"
            :closeable="true"
            position="right"
            :style="{width:'100%', height: '100%' }" >
            <div class="fix-scroll-list">
                <template v-for="(i,index) in subItems">
                    <van-cell
                        :key="index"
                        :title="i.name"
                        :class="{selectedclr:childActive==index}"
                        @click.native="okSelect(index,i.name)"/>
                </template>
            </div>
        </van-popup>
    </div>
</template>
<script>
import BrandList from '@/util/brand.js';
import {
    Popup,
    Cell,
    Field,
    IndexBar,
    IndexAnchor,
    Sticky
} from 'vant';
export default {
    components: {
        [Popup.name]: Popup,
        [Cell.name]: Cell,
        [Field.name]: Field,
        [IndexBar.name]: IndexBar,
        [IndexAnchor.name]: IndexAnchor,
        [Sticky.name]: Sticky
    },
    data(){
        return {
            parentActive: '',
            childActive: '',
            show: false,
            subShow: false,
            curFirstSelct: '',
            brandlist: BrandList,
            subItems: [],
            indexList: ['A', 'B', 'C', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'W', 'X', 'Y', 'Z']
        };
    },
    mounted() {

    },
    methods: {
        open(){
            this.show = true;
        },
        openSubSeries(index, items){
            if (index!==this.parentActive) {
                this.parentActive = index;
                this.childActive= '';
            }
            this.curFirstSelct = items.name;
            this.subItems = items.typename;
            this.subShow = true;
        },
        okSelect(index, name){
            this.childActive = index;
            this.curFirstSelct = this.curFirstSelct+' - '+name;
            this.subShow = false;
            this.show = false;
            this.$emit('input', this.curFirstSelct);
            this.$emit('on-change', this.curFirstSelct);
        }
    },
};
</script>
