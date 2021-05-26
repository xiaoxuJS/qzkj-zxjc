
import React from 'react';
import {
    useHistory
} from 'react-router-dom'
import {
    Page404All
} from './style';
import { Button } from 'antd';

const Page404 = () => {
    const history = useHistory();
    const handleGoBack = () => {
        history.go(-1);
    }
    return <Page404All>

        <div className="head404"></div>

        <div className="txtbg404">

            <div className="txtbox">

                <p>对不起，您请求的页面不存在、或已被删除、或暂时不可用</p>

                <p className="paddingbox">请点击以下链接继续浏览网页</p>

                <p>》<Button type = "link" onClick = {handleGoBack}>返回上一页面</Button></p>

            </div>

        </div>
    </Page404All>

}

export default Page404;