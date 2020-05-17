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
                <van-checkbox-group v-model="result">
                    <van-cell-group>
                        <van-cell
                            v-for="(item, index) in list"
                            clickable
                            :key="item"
                            :title="`${item}`"
                            @click="toggle(index)"
                        >
                            <template #right-icon>
                                <van-checkbox shape="square" :name="item" ref="checkboxes" />
                            </template>
                        </van-cell>
                    </van-cell-group>
                </van-checkbox-group>
                <div class="pd20">
                    变速器换挡方式:
                </div>
                <van-radio-group v-model="radio">
                    <van-cell-group>
                        <van-cell title="自动档" clickable @click="radio = '自动档'">
                            <template #right-icon>
                                <van-radio name="自动档" />
                            </template>
                        </van-cell>
                        <van-cell title="手动档" clickable @click="radio = '手动档'">
                            <template #right-icon>
                                <van-radio name="手动档" />
                            </template>
                        </van-cell>
                    </van-cell-group>
                </van-radio-group>
                <div class="mark-title-header">
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
                />
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
    Button
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
            list: ['火烧', '泡水', '重大事故', '换件', '补漆'],
            radio: '',
            mark: '',
            result: [],
            show: false,
        };
    },
    mounted() {
    },
    methods: {
        toggle(index) {
            this.$refs.checkboxes[index].toggle();
        },
        open(){
            this.show = true;
        },
        saveCondtion(){
            let value = this.result.join(',') +',' +this.radio+','+this.mark;
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
            padding: 20px 30px 30px;
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
