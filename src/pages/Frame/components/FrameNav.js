import React, { useEffect, Fragment, useState } from "react";

import {
    useHistory,
    useLocation
} from 'react-router-dom'
// antd
import { Menu } from "antd";
const { SubMenu } = Menu;

const FrameNav = ({ menuData }) => {
    const history = new useHistory();
    const location = new useLocation();
    const [leftKey, setLeftKey] = useState([undefined]);
    useEffect(() => {
        const sessionValue = JSON.parse(sessionStorage.getItem('leftKey'));
        if (sessionValue) {
            setLeftKey(sessionValue)
        }
    }, [location.pathname])
    const handleChangeEnterPage = (path) => {
        history.push(path);
    }
    const handleGetKey = ({ keyPath }) => {
        sessionStorage.setItem('leftKey', JSON.stringify(keyPath));
        setLeftKey(keyPath)
    }

    return (
        <Menu
            mode="inline"
            theme="dark"
            selectedKeys={leftKey}
            style={{ borderRight: 0 }}
            onClick={handleGetKey}
        >
            {menuData
                ? menuData.map((item) => {
                    return (
                        <Fragment key={item.page ? item.key : '1'}>
                            {
                                item.page ?
                                    <SubMenu
                                        key={item.key}
                                        icon={item.meta.icon}
                                        title={item.meta.title}
                                    >
                                        {item.page.map((data) =>
                                        (data.page
                                            ?
                                            <SubMenu key={data.key} title={data.meta.title}>
                                                {
                                                    data.page.map(val => <Menu.Item
                                                        key={val.key}
                                                        onClick={() => handleChangeEnterPage(val.path)}
                                                    >
                                                        {val.meta.title}
                                                    </Menu.Item>)
                                                }
                                            </SubMenu>
                                            :
                                            <Menu.Item
                                                key={data.key}
                                                onClick={() => handleChangeEnterPage(data.path)}
                                            >
                                                {data.meta.title}
                                            </Menu.Item>
                                        )
                                        )}
                                    </SubMenu>
                                    : <Menu.Item
                                        key={item.key}
                                        icon={item.meta.icon}
                                        onClick={() => handleChangeEnterPage(item.path)}
                                    >
                                        {item.meta.title}
                                    </Menu.Item>

                            }
                        </Fragment>
                    );
                })
                : null
            }
        </Menu>
    );
};

export default FrameNav;
