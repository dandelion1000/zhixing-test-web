import {
    post
} from './axios';

export default {
    getTopics(num, size) {
        return post('/api/topic/list', {
            num,
            size
        });
    },
    updateAvator(parmas) {
        return post('/api/account/update/avatar', parmas);
    },
    uploadFile(file) {
        alert('file', file);
        let form = new FormData();
        form.append('file', file);
        return post('/uploadimg', form, {
            transformRequest: [function (data) {
                return data;
            }],
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    },
};
