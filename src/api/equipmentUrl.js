
import {
    http,
    ip
} from './http';
//型号管理
export function postDmmModelFindModePage(data) {
    const url = ip + '/dmmModel/find/modelPage';
    return http(url, "post", data)
}
//型号新增
export function putDmmModelInsertDmmModel(data) {
    const url = ip + '/dmmModel/insert/dmmModel';
    return http(url, "put", data)
}
//型号删除
export function getDmmModelDeleteDmmModel(data) {
    const url = ip + '/dmmModel/delete/dmmModel';
    return http(url, "get", data)
}
//型号更新
export function postDmmModelUpdateDmmModel(data) {
    const url = ip + '/dmmModel/update/dmmModel';
    return http(url, "post", data)
}
//型号更新
export function getDmmModelFindEcho(data) {
    const url = ip + '/dmmModel/find/echo';
    return http(url, "get", data)
}
//设备信息 - list
export function postDmmDeviceFindDevice(data) {
    const url = ip + '/dmmDevice/find/device';
    return http(url, "post", data)
}
//企业查询--下拉
export function getCpCompanyLikeCompany(data) {
    const url = ip + '/cpCompany/like/company';
    return http(url, "get", data)
}
//设备型号-- 下拉
export function getDmmModelFindDmmModel(data) {
    const url = ip + '/dmmModel/find/dmmModel';
    return http(url, "get", data)
}
//参数-- 下拉
export function getDmmParamFindParam(data) {
    const url = ip + '/dmmParam/find/param';
    return http(url, "get", data)
}
//设备信息新增
export function putDmmDeviceInsertDevice(data) {
    const url = ip + '/dmmDevice/insert/device';
    return http(url, "put", data)
}
//设备参数信息
export function getDmmPeakFindDmmPeak(data) {
    const url = ip + '/dmmPeak/find/dmmPeak';
    return http(url, "get", data)
}
//设备参数删除
export function getDmmDeviceDeleteParam(data) {
    const url = ip + '/dmmDevice/delete/param';
    return http(url, "get", data)
}
//设备信息回显
export function getDmmDeviceEchoDevice(data) {
    const url = ip + '/dmmDevice/echo/device';
    return http(url, "get", data)
}
//设备信息编辑
export function postDmmDeviceUpdateDevice(data) {
    const url = ip + '/dmmDevice/update/device';
    return http(url, "post", data)
}
//设备信息删除
export function getDmmDeviceDeleteDevice(data) {
    const url = ip + '/dmmDevice/delete/device';
    return http(url, "get", data)
}
//设备信息 - 添加参数
export function postDmmDeviceAddParam(data) {
    const url = ip + '/dmmDevice/add/param';
    return http(url, "post", data)
}
//设备信息回显



