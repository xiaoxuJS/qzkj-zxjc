import Axios from 'axios';
let ip = "";
if (process.env.NODE_ENV === 'development') { //开发环境;
    // ip = 'http://47.98.41.126:2121/monitoring'; //服务器地址:58157
    ip = 'http://192.168.3.5:2121/monitoring'; //服务器地址:58157
    // ip = 'http://47.98.41.126:58157/smart/loading'; //服务器地址:58157
    //设置变量
    // url6 = "http://192.168.3.5:21322/communicate/sendMessage";
} else if (process.env.NODE_ENV === 'production') { // 打包环境
    ip = 'http://47.98.41.126:2121/monitoring'; //服务器地址
}

Axios.interceptors.request.use(
    config => {
        if (sessionStorage.getItem("token")) {
            config.headers.authentication = sessionStorage.getItem("token");
        }
        if (localStorage.getItem("token")) {
            // config.headers.Authorization = 'Bearer' + localStorage.getItem("jti");
            config.headers.authentication = localStorage.getItem("token");
        }
        return config;
    },
    error => {
        console.log("===发送请求拦截器报错===")
        console.log(error);
        console.log("===end===");
        Promise.reject(error);
    }
);

Axios.interceptors.response.use(
    response => {
        //拦截响应，做统一处理 
        switch (response.data.code) {
            case 10009:
            case 10021:
                window.open('/login', '_self');
                break;
            case 1:
                localStorage.removeItem('token');
                break;
            default:
                break;

        }
        return response
    },
    //接口错误状态处理，也就是说无响应时的处理
    error => {
        return Promise.reject(error.response.status) // 返回接口返回的错误信息
    })

//封装请求方法
const http = (
    url,  //地址
    method, //请求方式
    args = {} //参数
) => {
    const xhrArgsName = (method === "get" || method === 'delete') ? "params" : "data"; //根据请求方式,判断携带的参数类型;
    return new Promise((resolve, reject) => {
        Axios({
            url,
            method,
            [xhrArgsName]: args
        }).then(response => {
            resolve(response.data);
        }).catch(error => {
            reject(error);
        })
    })
};

export {
    http,
    ip
};