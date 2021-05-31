import {
    http,
    ip
} from './http';
//获取权限列表
export function getSysPermissionFindPermission(data) {
    const url = ip + '/sysPermission/find/permission';
    return http(url, "get", data)
}
