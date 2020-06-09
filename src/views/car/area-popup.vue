<template>
    <div>
        <van-popup
            v-model="areashow"
            :overlay="false"
            @close="close"
            :closeable="true"
            position="right"
            :style="{width:'100%', height: '100%' }" >
            <div class="fix-header-title text-center pd21">
                选择城市
            </div>
            <div class="brand-list fix-scroll-list">
                <van-index-bar :index-list="indexList">
                    <template v-for="item in citylist">
                        <van-index-anchor :key="item.name" :index="item.name" />
                        <template v-for="(i,j) in item.citys">
                            <van-cell
                                :key="j"
                                :title="i"
                                :class="{selectedclr:curActive==j+item.name}"
                                @click.native="selectArea(j+item.name,i)"/>
                        </template>
                    </template>
                </van-index-bar>
            </div>
        </van-popup>
    </div>
</template>
<script>
import CityList from '@/util/area.js';
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
            curActive: '',
            areashow: false,
            citylist: CityList,
            indexList: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'W', 'X', 'Y', 'Z'],
        };
    },
    mounted() {
    },
    methods: {
        open(){
            this.areashow = true;
        },
        close(){
            this.areashow  = false;
            this.$emit('on-close');
        },
        selectArea(index, item){
            this.curActive = index;
            this.$emit('input', item);
            this.$emit('on-change', item);
            this.areashow  = false;

        },

    },
};
</script>
