import React from 'react';
import {
    useHistory
} from 'react-router-dom'
import UserRoutes from '../../router';
import {
    menuRouter
} from '../../router/routes';
import FrameNav from './components/FrameNav';
import {
    FrameAll
} from './style.js';

import { Button, Layout } from 'antd';

const { Header, Content, Sider } = Layout;

const Frame = () => {
    const contentHeight = window.innerHeight - 64 - 24;
    const history = new useHistory();
    //退出登录
    const handleExitLogin = () => {
        sessionStorage.clear();
        history.push('/login')
    }
    return <FrameAll>
        <Layout>
            <Sider
                breakpoint="lg"
                collapsedWidth="0"
                // onBreakpoint={broken => {
                //     // console.log(broken);
                // }}
                onCollapse={(collapsed, type) => {
                    console.log(collapsed, type);
                }}
            >
                <div className="logo" />
                <FrameNav menuData={menuRouter} />
            </Sider>
            <Layout>
                <Header className="site-layout-sub-header-background" style={{ padding: 0 }}> 
                    {/* <span class="icon iconfont icon-user"></span> */}
                    <Button style = {{float: 'right',marginTop: '16px',marginRight: '16px'}} type = 'primary' onClick = {() => handleExitLogin()}> 退出登录</Button>
                </Header>
                <Content
                    className="site-layout-background"
                    style={{
                        margin: '24px 16px 0',
                        height: contentHeight,
                        overflow: "auto"
                    }}
                >
                    <UserRoutes />
                </Content>
                {/* <Content style={{ margin: '24px 16px 0' }}>
                    <div className="site-layout-background" style={{ padding: 24, height: contentHeight, }}>
                        content
                    </div>
                </Content> */}
            </Layout>
        </Layout>
    </FrameAll>



}

export default Frame;