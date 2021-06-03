import React, {useState, useCallback, useEffect} from 'react';
import {
    useLocation
} from 'react-router-dom';
import {
    getSysUserFindParticulars
} from '../../../api/setUrl'
import {
    UserDetailsAll,
    UserDetailsContent
} from './style';
import { message, PageHeader, Typography, Col , Row} from 'antd';
const { Title } = Typography;

const UserDetails = () => {
    const location = new useLocation();
    const [detailsData, setDetailsData] = useState({});
    const detailsFun = useCallback(
        () => {
            ;(async () => {
                const {code, msg, data} = await getSysUserFindParticulars({id: location.state.id});
                if(code === '20000') {
                    setDetailsData(data)
                }else{
                    message.error(msg);
                }
            })();
        },
        [location.state],
    )
    useEffect(() => {
        detailsFun()
    }, [detailsFun])
    return <UserDetailsAll>
        <PageHeader
            className="site-page-header"
            title="用户详情"
        ></PageHeader>
        <UserDetailsContent>
        <Title level={2}>基本信息</Title>
            <Row>
                <Col span={2}>头像：</Col>
                <Col span={22}> <img src ={detailsData.headImg} alt = '头像' /></Col>
                <Col span={2}>姓名：</Col>
                <Col span={22}>{detailsData.name}</Col>
                <Col span={2}>手机号：</Col>
                <Col span={22}>{detailsData.phone}</Col>
                <Col span={2}>注册时间：</Col>
                <Col span={22}>{detailsData.registerTime}</Col>
                <Col span={2}>用户名：</Col>
                <Col span={22}>{detailsData.username}</Col>
                <Col span={2}>年龄：</Col>
                <Col span={22}>{detailsData.age}</Col>
                <Col span={2}>性别：</Col>
                <Col span={22}>{detailsData.gender}</Col>
                <Col span={2}>是否开启通知：</Col>
                <Col span={22}>{detailsData.isInform}</Col>
            </Row>
        </UserDetailsContent>
    </UserDetailsAll>
}

export default UserDetails;