import {
    http,
    ip
} from './http';
//工作台设备概览
export function getDmmDeviceWorkbenchOverview(data) {
    const url = ip + '/dmmDevice/workbench/overview';
    return http(url, "get", data)
}
//业务动态
export function postSysLogFindLog(data) {
    const url = ip + '/sysLog/findLog';
    return http(url, "post", data)
}
//设备状态日志
export function postDmmLogListDmmLog(data) {
    const url = ip + '/dmmLog/list/dmmLog';
    return http(url, "post", data)
}
//设备状态日志
