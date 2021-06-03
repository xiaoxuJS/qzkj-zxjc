import React, { useEffect, useState } from 'react';
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

import { Button, Layout, Menu, Dropdown } from 'antd';

const { Header, Content, Sider } = Layout;

const Frame = () => {
    const contentHeight = window.innerHeight - 64 - 24;
    const history = new useHistory();
    const [imageSrc, setImageSrc] = useState(null);
    useEffect(() => {
        setImageSrc(sessionStorage.getItem('head'));
    }, [])
    //退出登录
    const handleExitLogin = () => {
        sessionStorage.clear();
        history.push('/login')
    }

    const menu = (
        <Menu>
            <Menu.Item>
                <Button type = "link" onClick = {() => handleExitLogin()}>退出登录</Button>
            </Menu.Item>

        </Menu>
    );
    return <FrameAll>
        <Layout>
            <Sider
                breakpoint="lg"
                collapsedWidth="0"
                onCollapse={(collapsed, type) => {
                    console.log(collapsed, type);
                }}
            >
                <div className="logo">
                    在线检测系统
                </div>
                <FrameNav menuData={menuRouter} />
            </Sider>
            <Layout>
                <Header className="site-layout-sub-header-background" style={{ padding: 0 }}>
                    {/* <span class="icon iconfont icon-user"></span> */}
                    <div style={{ float: 'right', marginRight: '16px' }}>
                        <Dropdown overlay={menu} placement="bottomRight">
                            {imageSrc ? <img src={imageSrc} alt = '企业图片' style = {{width: '40px', height: '40px',marginTop: '10px', borderRadius: '50%'}} /> : <></>}
                            {/* <img  */}
                        </Dropdown>
                    </div>
                    {/* <Button  type = 'primary' onClick = {() => handleExitLogin()}> 退出登录</Button> */}
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
            </Layout>
        </Layout>
    </FrameAll>



}

export default Frame;