import {
    http,
    ip
} from './http';
//企业各地数据
export function getcpCompanyFindGeographical(data) {
    const url = ip + '/cpCompany/find/geographical';
    return http(url, "get", data)
}
//企业各地数据
export function postcpCompanyListCompany(data) {
    const url = ip + '/cpCompany/list/company';
    return http(url, "post", data)
}
//城市下拉数据
export function getcpCompanyFindCoordinate(data) {
    const url = ip + '/cpCoordinate/find/coordinate';
    return http(url, "get", data)
}
//企业基本信息新增
export function putcpCompanyInsertCompany(data) {
    const url = ip + '/cpCompany/insert/company';
    return http(url, "put", data)
}
//企业详情
export function getcpCompanyFindCompany(data) {
    const url = ip + '/cpCompany/find/company';
    return http(url, "get", data)
}
//企业基本信息更新
export function postcpCompanyUpdateCompany(data) {
    const url = ip + '/cpCompany/update/company';
    return http(url, "post", data)
}
//删除企业
export function postcpCompanyDeleteCompany(data) {
    const url = ip + '/cpCompany/delete/company';
    return http(url, "post", data)
}
//设备列表
export function postDmmDeviceFindDevice(data) {
    const url = ip + '/dmmDevice/find/device';
    return http(url, "post", data)
}


