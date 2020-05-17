import {post} from './axios';
const  sendVerifyCode =(data) => post('/api/universal/sendcheckcode', data);
const loginRegister =(data) => post('/api/account/bindphone', data);
// export const queryUserOrder = (data) => post('/loan/tzd/userinfo/queryUserOrder', data)

export  {
    sendVerifyCode,
    loginRegister
};
