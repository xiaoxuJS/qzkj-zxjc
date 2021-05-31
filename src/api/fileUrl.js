import {
    ip
} from './http';

//上传文件
export function fileUrl() {
    const url = ip + '/sys/upload';
    return url;
}

