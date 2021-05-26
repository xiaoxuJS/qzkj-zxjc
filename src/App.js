import React from 'react';
//引入路由
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

//引入登录页面和首页
import Login from "./pages/Login";
import Frame from "./pages/Frame";

//antd 中文 以及时间插件moment
import { ConfigProvider } from 'antd'
import zhCN from "antd/es/locale/zh_CN";
import moment from "moment";
import "moment/locale/zh-cn";
import "antd/dist/antd.css";

//公共样式
import { StyleCommon } from './style';
import { IconfontStyle } from './assets/icon/iconfont'

moment.locale("zh_CN");

function App() {
    const isLogin = () => {
        if (!localStorage.getItem("token")) {
            return false
        }
        return true
    }
    return (
        <div className="App" style={{ height: '100%' }}>
            <Router basename="/">
                <StyleCommon />
                <IconfontStyle />
                <ConfigProvider locale={zhCN}>
                    <Switch>
                        <Route exact path="/login" component={Login} />
                        <Route path="/" render={() =>
                            isLogin() ? <Frame /> : <Redirect to="/Login" />
                            //判断成功进入页面，不成功跳转登录
                        }
                        />

                    </Switch>
                </ConfigProvider>
            </Router>
        </div>
    );
}

export default App;

