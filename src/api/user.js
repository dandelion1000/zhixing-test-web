import {post, get} from './axios';
const  sendVerifyCode =(data) => post('/manage/vxUsedcar/sendsms', data);
const loginRegister =(data) => post('/manage/vxUsedcar/loginvx', data);
const getUserCarInfo =(data) => get('/manage/vxUsedcar/cars', data);//获取车行信息列表
const deadlineWarn =(data) => get('/manage/vxUsedcar/warn', data);//会员卡到期提醒
const getAccountRest =(data) => get('/manage/vxUsedcar/account', data);//查询账户余额
const restCards =(data) => get('/manage/vxUsedcar/unusedcard', data);//剩余套餐卡
const usedCards =(data) => get('/manage/vxUsedcar/usedcard', data);//已用套餐卡


const getOpenId =(code) => get(`https://api.weixin.qq.com/sns/oauth2/access_token?appid=wx1683897a0af2da49&secret=719122509b8bcd15ac3f18db782499c1&code=${code}&grant_type=authorization_code`);
export  {
    sendVerifyCode,
    loginRegister,
    getOpenId,
    getUserCarInfo,
    deadlineWarn,
    getAccountRest,
    restCards,
    usedCards
};
