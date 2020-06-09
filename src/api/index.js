import {post, get} from './axios';
const  getCarList =(data) => get('/admin/manage/vxUsedcar/list', data);
const  delCarItem =(data) => get('/admin/manage/vxUsedcar/remove', data);

const  saveReleaseCar =(data) => get('/admin/manage/vxUsedcar/save', data);
const uploadFile=(file) => {
    console.log('file', file);
    let form = new FormData();
    form.append('file', file);
    return post('/admin/manage/vxUsedcar/uploadimg', form, {
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
    delCarItem,
    saveReleaseCar,
    uploadFile
};
