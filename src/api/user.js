import {post, get} from './axios';
const  sendVerifyCode =(data) => post('/manage/vxUsedcar/sendsms', data);
const loginRegister =(data) => post('/manage/vxUsedcar/loginvx', data);
const getOpenId =(code) => get(`https://api.weixin.qq.com/sns/oauth2/access_token?appid=wx1683897a0af2da49&secret=719122509b8bcd15ac3f18db782499c1&code=${code}&grant_type=authorization_code`);

export  {
    sendVerifyCode,
    loginRegister,
    getOpenId
};
