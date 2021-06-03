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
//岗位 - 列表
export function postSysDepartmentFindDepartment(data) {
    const url = ip + '/sysDepartment/find/department';
    return http(url, "post", data)
}
//企业下拉框
export function getCpCompanyLikeCompany(data) {
    const url = ip + '/cpCompany/like/company';
    return http(url, "get", data)
}
//岗位 - 新增
export function putSysDepartmentInsertDepartment(data) {
    const url = ip + '/sysDepartment/insert/department';
    return http(url, "put", data)
}
//用户 - 下拉
export function getSysUserUserList(data) {
    const url = ip + '/sysUser/userList';
    return http(url, "get", data)
}
//岗位 - 删除
export function getSysDepartmentDelDepartment(data) {
    const url = ip + '/sysDepartment/del/department';
    return http(url, "get", data)
}
//岗位 - 修改
export function postSysDepartmentUpdateDepartment(data) {
    const url = ip + '/sysDepartment/update/department';
    return http(url, "post", data)
}
//企业部门信息-列表（辅助业务）
export function getSysDepartmentFindList(data) {
    const url = ip + '/sysDepartment/find/list';
    return http(url, "get", data)
}
//用户列表
export function postSysUserFindPage(data) {
    const url = ip + '/sysUser/findPage';
    return http(url, "post", data)
}
//用户-注册
export function putSysUserRegisterUser(data) {
    const url = ip + '/sysUser/registerUser';
    return http(url, "put", data)
}
//用户-个人资料-回显
export function getSysUserUpdMaterial(data) {
    const url = ip + '/sysUser/updMaterial';
    return http(url, "get", data)
}
//用户-个人资料-修改
export function postSysUserUpdMaterial(data) {
    const url = ip + '/sysUser/updMaterial';
    return http(url, "post", data)
}
//账号状态更新
export function postSysUserUpdStatus(data) {
    const url = ip + '/sysUser/updStatus';
    return http(url, "post", data)
}
//手机号修改
export function postSysUserUpdMobile(data) {
    const url = ip + '/sysUser/updMobile';
    return http(url, "post", data)
}
//密码修改
export function postSysUserUpdPwd(data) {
    const url = ip + '/sysUser/updPwd';
    return http(url, "post", data)
}
//用户详情
export function getSysUserFindParticulars(data) {
    const url = ip + '/sysUser/findParticulars';
    return http(url, "get", data)
}

