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
                    车况信息
                </div>
            </van-sticky>
            <div class="condtion-select fix-scroll-list">
                <van-cell-group>
                    <van-cell
                        v-for="(item, index) in list"
                        clickable
                        :key="index"
                        :title="`${item.title}`"
                    >
                        <template #right-icon>
                            <van-radio-group v-model="item.radio" direction="horizontal">
                                <van-radio name="有">有</van-radio>
                                <van-radio name="无">无</van-radio>
                            </van-radio-group>
                            <!-- <van-checkbox shape="square" :name="item" ref="checkboxes" /> -->
                        </template>
                    </van-cell>
                </van-cell-group>
                <!-- <div class="mark-title-header">
                    备注：
                </div>
                <van-field
                    class="mark-textarea"
                    v-model="mark"
                    rows="2"
                    autosize
                    :border="true"
                    type="textarea"
                    placeholder="请输入其他车况"
                    show-word-limit
                /> -->
                <div class="isOk flex flex-between">
                    <van-button
                        class="flex1"
                        style="margin-right:20px"
                        @click="cancel"
                    >
                        取消
                    </van-button>
                    <van-button
                        class="flex1"
                        color="#f2826a"
                        @click="saveCondtion"
                    >
                        确认
                    </van-button>
                </div>
            </div>
        </van-popup>
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
    Sticky,
    Checkbox,
    CheckboxGroup,
    RadioGroup,
    Radio,
    Button,
} from 'vant';
export default {
    components: {
        [Popup.name]: Popup,
        [CellGroup.name]: CellGroup,
        [Cell.name]: Cell,
        [Field.name]: Field,
        [IndexBar.name]: IndexBar,
        [IndexAnchor.name]: IndexAnchor,
        [Sticky.name]: Sticky,
        [Checkbox.name]: Checkbox,
        [CheckboxGroup.name]: CheckboxGroup,
        [RadioGroup.name]: RadioGroup,
        [Radio.name]: Radio,
        [Button.name]: Button
    },
    data(){
        return {
            list: [{
                title: '火烧',
                radio: '无'
            }, {
                title: '泡水',
                radio: '无'
            }, {
                title: '重大事故',
                radio: '无'
            }, {
                title: '换件',
                radio: '无'
            },
            {
                title: '补漆',
                radio: '无'
            }],
            // radio: '',
            mark: '',
            result: [],
            show: false,
        };
    },
    mounted() {
    },
    methods: {
        // toggle(index) {
        //     this.$refs.checkboxes[index].toggle();
        // },
        open(){
            this.show = true;
        },
        saveCondtion(){
            console.log('this.list', this.list);
            let value = this.list.map((item) => {
                return item.radio +item.title;
            }).join(',');
            console.log(value);
            this.show = false;
            this.$emit('input', value);
        },
        cancel(){
            this.show = false;
        }

    },
};
</script>
<style lang="less">
    .condtion-select {
        .mark-title-header {
            padding-top: 10px;
            padding-left: 20px;
        }
        .isOk {
            padding: 50px 30px 30px;
            // width: 100%;
            // position: fixed;
            // bottom: 0px;
        }
        .mark-textarea {
            font-size: 14px;
            .van-cell__value, .van-cell__value--alone, .van-field__value {
                border: 1px solid #eee;
                padding: 5px;
            }
        }
    }
</style>
