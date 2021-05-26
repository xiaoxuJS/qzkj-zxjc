import React, { useState, useCallback, useEffect } from 'react';
import {
    getDmmDeviceWorkbenchOverview
} from '../../api/workbenchUrl';
import FastAndOperation from './components/FastAndOperation'
import {
    WorkbenchAll,
    WorkbenchAllData,
    WorkbenchAllDataDiv,
    WorkbenchAllDataDivTow
} from './style';
import {
    Card,
    message,
    Radio,
    Input
} from 'antd';

const { Search } = Input;


const Workbench = () => {
    const [equipment, setEquipment] = useState({});
    const [selectType, setSelectType] = useState('0');
    const overviewFun = useCallback(
        () => {
            const parames = {
                company: sessionStorage.getItem('companyId')
            }
                ; (async () => {
                    const { code, msg, data } = await getDmmDeviceWorkbenchOverview(parames);
                    if (code === '20000') {
                        setEquipment(data)
                    } else {
                        message.error(msg)
                    }
                })();
        },
        [],
    )
    useEffect(() => {
        overviewFun()
    }, [overviewFun])
    //搜索类型
    const onChangeSearchType = (e) => {
        setSelectType(e.target.value)
    }
    //搜索
    const onSearch = (value) => {
        console.log(selectType)
        console.log(value)
    }
    return <WorkbenchAll>
        <WorkbenchAllData>
            <WorkbenchAllDataDiv>
                <Card title="报警设备数" bordered={false} style={{ width: '100%' }}>
                    <p>{equipment.alarmsAmount}</p>
                </Card>
            </WorkbenchAllDataDiv>
            <WorkbenchAllDataDiv>
                <Card title="设备总数" bordered={false} style={{ width: '100%' }}>
                    <p>{equipment.amount}</p>
                </Card>
            </WorkbenchAllDataDiv>
            <WorkbenchAllDataDiv>
                <Card title="离线数" bordered={false} style={{ width: '100%' }}>
                    <p>{equipment.maintainAmount}</p>
                </Card>
            </WorkbenchAllDataDiv>
            <WorkbenchAllDataDiv>
                <Card title="离线数" bordered={false} style={{ width: '100%' }}>
                    <p>{equipment.offlineAmount}</p>
                </Card>
            </WorkbenchAllDataDiv>
            <WorkbenchAllDataDiv>
                <Card title="在线数" bordered={false} style={{ width: '100%' }}>
                    <p>{equipment.onlineAmount}</p>
                </Card>
            </WorkbenchAllDataDiv>
            <WorkbenchAllDataDiv>
                <Card title="停用设备数" bordered={false} style={{ width: '100%' }}>
                    <p>{equipment.stopAmount}</p>
                </Card>
            </WorkbenchAllDataDiv>
            <WorkbenchAllDataDivTow>
                <Card title="搜索" extra={
                    <Radio.Group onChange={onChangeSearchType} defaultValue="0" size = 'small'>
                        <Radio.Button value="0">企业</Radio.Button>
                        <Radio.Button value="1">设备</Radio.Button>
                        <Radio.Button value="2">用户</Radio.Button>
                    </Radio.Group>
                }>
                    <Search
                        placeholder="请输入搜索内容"
                        allowClear
                        enterButton="搜索"
                        size='small'
                        onSearch={onSearch}
                    />
                </Card>
            </WorkbenchAllDataDivTow>
        </WorkbenchAllData>
        <FastAndOperation />
    </WorkbenchAll>
}

export default Workbench;