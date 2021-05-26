import {
    http,
    ip
} from './http';
//获取验证码
export function getSysGetCode(data) {
    const url = ip + '/sys/getCode';
    return http(url, "get", data)
}

//登录
export function postSysUserlogin(data) {
    const url = ip + '/sysUser/login';
    return http(url, "post", data)
}
