<template>
    <div class="login">
        <van-notice-bar
            class="notice-bar"
            color="#CA7C29"
            background="#FFF0D9"
            mode="closeable"
            left-icon="warning-o"
        >
            发布前需要您先登录账号
        </van-notice-bar>
        <div class="login-form">
            <!-- <div class="logo">智行科技 </div> -->
            <h2 class="text-center">智行科技</h2>
            <span class="text-center">短信验证即登录，未注册将进入注册页面。</span>
            <div class="mrt40">
                <van-field
                    class="zhixing-filed"
                    v-model="loginForm.phone"
                    placeholder="请输入手机号"
                    maxlength="11"
                    type="tel"
                    clearable
                />
                <van-field
                    class="mrt30"
                    v-model="loginForm.verifyCode"
                    center
                    clearable
                    placeholder="请输入短信验证码"
                >
                    <span
                        class="sms-btn"
                        :class="{ 'code-disabled': codeStatus|| !checkPhone  }"
                        slot="button"
                        size="small"
                        plain
                        round
                        @click="sendSMS"
                    >
                        {{  codeStatus ? codeRefresh + 's后重发' : '获取验证码' }}
                    </span>
                </van-field>
                <van-button
                    class="mrt40"
                    :disabled="loginForm.phone=='' || loginForm.verifyCode==''"
                    block
                    color="#f2826a"
                    :loading="rloading"
                    loading-text="登录中..."
                    loading-type="spinner"
                    size="middle"
                    native-type="submit"
                    @click="login"
                >
                    登录
                </van-button>
            </div>
        </div>
    </div>
</template>
<script>
import { Toast, NoticeBar, Field, CellGroup, Button } from 'vant';
// import TzdButton from '_c/Button.vue';
import { countdown, getQueryStringByName } from '@/util/util';
import  {sendVerifyCode, loginRegister}  from '@/api/user';
export default {
    components: {
        [NoticeBar.name]: NoticeBar,
        [Field.name]: Field,
        [CellGroup.name]: CellGroup,
        [Button.name]: Button,
        // 'tzd-button': TzdButton
    },
    data() {
        return {
            destroyCountDown: null,
            rloading: false,
            sloading: false,
            loginForm: {
                phone: '',
                verifyCode: ''
            },
            codeStatus: 0,
            codeRefresh: 60,
            wxCode: '',
            verifyCode: '',
            openId: ''
        };
    },
    computed: {
        checkPhone: function () {
            return /^1\d{10}$/.test(this.loginForm.phone);
        }
    },
    mounted() {
        let str =  getQueryStringByName('code');
        if (str) {
            this.wxCode = str;
        }
        console.log(str);
    },
    methods: {
        sendSMS() {
            if (this.sloading) {
                console.log('防止重复提交');
                return;
            }
            if (this.codeStatus) {
                return;
            }
            if (this.loginForm.phone === '') {
                Toast('请先填写手机号');
                return false;
            } else if (!/^1\d{10}$/.test(this.loginForm.phone)) {
                Toast('手机号格式不正确');
                return false;
            }
            const params = {
                phone: this.loginForm.phone,
            };
            this.sloading = true;
            sendVerifyCode(params).then((res) => {
                this.sloading = false;
                this.$toast('验证码已发送');
                console.log('res', res);
                this.verifyCode = res;
                this.codeRefresh = 60;
                this.codeStatus = 1;
                this.destroyCountDown = countdown(this.codeRefresh, {
                    onProgress: s => { this.codeRefresh = s; },
                    onEnd: () => { this.codeStatus = 0; }
                });
            }).catch((res) => {
                Toast(res.msg);
                this.sloading = false;
            });
        },
        login() {
            if (this.loginForm.verifyCode !== String(this.verifyCode)) {
                return this.$toast('手机验证码不对');
            }
            if (!/^1\d{10}$/.test(this.loginForm.phone)) {
                this.$toast('手机号格式不正确');
                return false;
            }
            const params = {
                phone: this.loginForm.phone,
                code: this.wxCode
            };
            this.rloading = true;
            loginRegister(params).then(() => {
                this.rloading = false;
                localStorage.setItem('usermobile', JSON.stringify(this.loginForm.phone));
                this.$router.push({ name: 'home' });
            }).catch((res) => {
                this.rloading = false;
                Toast(res.msg || '登录失败，请重试');
            });
        }
    }
};
</script>

<style lang="less">
  .login {
    background: #fff;
    &-form {
      padding: 30px 18px 0;
      .logo {
        margin-bottom: 11px;
        font-size: 14px;
      }
      .sms-btn {
          color: #f2826a;
      }
      .code-disabled {
        color: #D9D9D9;
      }

      .van-cell__value {
        color: #BFBFBF;
        font-size: 17px;
        font-weight: 400;
      }
    }
  }
</style>
