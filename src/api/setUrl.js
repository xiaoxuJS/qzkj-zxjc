import {
    http,
    ip
} from './http';
//获取权限列表
export function getSysPermissionFindPermission(data) {
    const url = ip + '/sysPermission/find/permission';
    return http(url, "get", data)
}
//添加权限
export function putSysPermissionInsertPermission(data) {
    const url = ip + '/sysPermission/insert/permission';
    return http(url, "put", data)
}
//回显-
export function getSysPermissionEchoPermission(data) {
    const url = ip + '/sysPermission/echo/permission';
    return http(url, "get", data)
}
//修改菜单
export function postSysPermissionUpdPermission(data) {
    const url = ip + '/sysPermission/upd/permission';
    return http(url, "post", data)
}
//权限信息删除
export function getSysPermissionDelPermission(data) {
    const url = ip + '/sysPermission/del/permission';
    return http(url, "get", data)
}
