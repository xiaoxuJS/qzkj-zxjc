import {
    http,
    ip
} from './http';
//企业各地数据
export function getcpCompanyFindGeographical(data) {
    const url = ip + '/cpCompany/find/geographical';
    return http(url, "get", data)
}

