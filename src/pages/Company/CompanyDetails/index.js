import React, { useEffect, useCallback, useState } from 'react';
import {
    useHistory,
    useLocation
} from 'react-router-dom';
import {
    getcpCompanyFindCompany,
    postDmmDeviceFindDevice
} from '../../../api/companyUrl';
import {
    CompanyDetailsAll,
    CompanyDetailsContent
} from './style';
import {
    message,
    Table,
    PageHeader,
    Typography,
    Row,
    Col
} from 'antd';
const { Title } = Typography;


const Company = () => {
    const history = new useHistory();
    const location = new useLocation();
    const [companyDetailsData, setCompanyDetailsData] = useState([]);
    const [equipmentList, setEquipmentList] = useState([]); // 设备列表
    const [equipmentListTotal, setEquipmentListTotal] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const companyDetailsFun = useCallback(
        () => {
            ; (async () => {
                const { code, msg, data } = await getcpCompanyFindCompany({ companyId: location.state.id });
                if (code === '20000') {
                    setCompanyDetailsData(data);
                } else {
                    message.error(msg);
                }
            })();
        },
        [location.state],
    )
    const equipmentListFun = useCallback(
        (parames = {
            currentPage: currentPage,
            pageSize: pageSize,
            companyId: location.state.id
        }) => {
            ; (async () => {
                const { code, msg, data } = await postDmmDeviceFindDevice(parames);
                if (code === '20000') {
                    setCurrentPage(parames.currentPage);
                    setPageSize(parames.pageSize);
                    setEquipmentList(data.records);
                    setEquipmentListTotal(data.total);
                } else {
                    message.error(msg);
                }
            })();
        },
        [location.state, pageSize, currentPage],
    )
    useEffect(() => {
        companyDetailsFun();
        equipmentListFun();
    }, [companyDetailsFun, equipmentListFun])
    const changePageSize = () => {

    }
    const changePage = () => {

    }
    //分页
    const pagination = {
        //是否可以改变pagesize//
        showSizeChanger: true,
        //是否可以快速跳转到某页
        showQuickJumper: true,
        //展示一共有多少条数据//
        showTotal: () => `共${equipmentListTotal}条`,
        //每页条数
        pageSize: pageSize,
        //当前页数
        current: currentPage,
        //数据总数
        total: equipmentListTotal,
        //pageSize 变化的回调
        onShowSizeChange: (current, pageSize) => changePageSize(pageSize, current),
        //页码改变的回调，参数是改变后的页码及每页条数
        onChange: (current) => changePage(current),
    }
    const columns = [
        {
            title: '编号',
            width: 60,
            render: (text, recode, index) => <span>{index + 1}</span>,
        },
        {
            title: '设备编号',
            dataIndex: 'deviceCode'
        },
        {
            title: '设备名称',
            dataIndex: 'deviceName'
        },
        {
            title: '设备状态',
            dataIndex: 'deviceStatus'
        },
        {
            title: '设备型号',
            dataIndex: 'model'
        },
        {
            title: '出场日期',
            dataIndex: 'productionDate'
        },


    ];

    return <CompanyDetailsAll>
        <PageHeader
            className="site-page-header"
            title="停车信息-车辆详情"
            onBack={() => history.go("-1")}
        ></PageHeader>
        <CompanyDetailsContent>
            <Title level={2}>基本信息</Title>
            <Row>
                <Col span={2}>企业log：</Col>
                <Col span={22}><img src={companyDetailsData.log} alt='企业log' /></Col>
                <Col span={2}>企业代码：</Col>
                <Col span={22}>{companyDetailsData.companyCode}</Col>
                <Col span={2}>企业名称：</Col>
                <Col span={22}>{companyDetailsData.companyName}</Col>
                <Col span={2}>经营范围：</Col>
                <Col span={22}>{companyDetailsData.manageScope}</Col>
                <Col span={2}>详细地址：</Col>
                <Col span={22}>{companyDetailsData.site}</Col>
                <Col span={2}>企业简介：</Col>
                <Col span={22}>{companyDetailsData.synopsis}</Col>
            </Row>
            <Title level={2}>设备列表</Title>
            <Table
                columns={columns}
                dataSource={equipmentList}
                rowKey='id'
                size='small'
                pagination={pagination}
            />
        </CompanyDetailsContent>
    </CompanyDetailsAll>
}

export default Company;