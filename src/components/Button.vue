<template>
    <button
        class="tzd-btn"
        :class="['size-' + size, 'type-' + type, {'isactive': !disabled}] "
        :disabled="disabled" @click="handleClick">
        <van-loading v-if="loading" color="#fff" type="spinner"/>
        <span v-else>
            <slot name="icon"></slot>
            <slot name="default">
            </slot>
        </span>

    </button>
</template>
<script>
// 判断参数是否是其中之一
import { Loading } from 'vant';
function oneOf(value, validList) {
    for (let i = 0; i < validList.length; i++) {
        if (value === validList[i]) {
            return true;
        }
    }
    return false;
}
export default {
    components: {
        [Loading.name]: Loading
    },
    props: {
        size: {
            validator(value) {
                return oneOf(value, ['small', 'large', 'default']);
            },
            default: 'default'
        },
        type: {
            validator(value) {
                return oneOf(value, ['disabled', 'forbidden', 'primary', 'plain']);
            },
            default: 'primary'
        },
        disabled: {
            type: Boolean,
            default: false
        },
        loading: {
            type: Boolean,
            default: false

        }
    },
    methods: {
        handleClick(event) {
            if (this.loading || this.disabled || this.type === 'forbidden') {
                return;
            }
            this.$emit('on-click', event);
        }
    }
};
</script>
<style lang="less" scoped>
.tzd-btn{
  display: block;
  border-radius: 4px;
  color: #fff;
  text-align: center;
  border: none;
  .van-icon {
    position: relative;
    top: 3px;
  }
}
.type-primary {
  background: linear-gradient(to right, #3E4DD5 0%, #8594FF 100%);
}
.type-plain {
  border: 1px solid #5160E0;
  background: #fff;
  color: #5160E0
}
.type-disabled {
    background: rgb(92, 90, 90);
    background: linear-gradient(to right, rgba(62, 77, 213, 0.4) 0%, rgba(133, 148, 255, 0.4) 100%);
    color: rgba(255, 255, 255, 0.6)
}
.type-forbidden{
  background: #E0E1E5;
}
.size-default{
  width: 100%;
  line-height: 46px;
  height: 46px;
  font-size: 18px;
}
.size-small {
  width: 87px;
  line-height: 36px;
  height: 36px;
  font-size: 14px;
}
.type-primary[disabled] {
  // opacity: 0.4;
    cursor: not-allowed;
    background: linear-gradient(to right, #b3b8ee, #ccd2fe);
}
.isactive:active {
  background: linear-gradient(to right, #303BA1 0%, #6172EE 100%);
}
.type-plain {
  &:active {
    background: #fff
  }
}
</style>
