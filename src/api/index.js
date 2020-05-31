import {post, get} from './axios';
const  getCarList =(data) => get('/manage/vxUsedcar/list', data);
const  saveReleaseCar =(data) => get('/manage/vxUsedcar/save', data);
const uploadFile=(file) => {
    console.log('file', file);
    let form = new FormData();
    form.append('file', file);
    return post('/manage/vxUsedcar/uploadimg', form, {
        transformRequest: [function (data) {
            return data;
        }],
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
};
export  default{
    getCarList,
    saveReleaseCar,
    uploadFile
};
