import React, { useEffect, useCallback, useState } from 'react';
import {
    postSysLogFindLog,
    postDmmLogListDmmLog
} from '../../../../api/workbenchUrl';
import {
    FastAndOperationAll,
    FastAndOperationRight,
    FastAndOperationIcon
} from './style';
import kehu from '../../../../assets/image/home/添加客户.png';
import shebei from '../../../../assets/image/home/添加设备.png';
import yonghu from '../../../../assets/image/home/添加用户.png';
import {
    Card,
    message,
    Radio,
    Table
} from 'antd';

const FastAndOperation = () => {
    const [listData, setListData] = useState([]);
    const [listStatusData, setListStatusData] = useState([]);
    const listFun = useCallback(
        (parames) => {
            ; (async () => {
                const { code, msg, data } = await postSysLogFindLog(parames);
                if (code === '20000') {
                    setListData(data.records)
                } else {
                    message.error(msg);
                }
            })();
        },
        [],
    );
    //设备状态日志
    const listStatusFun = useCallback(
        () => {
            const parames = {
                // company: sessionStorage.getItem('companyId'),
                currentPage: 1,
                pageSize: 5
            }
            ;(async () => {
                const {code , msg, data} = await postDmmLogListDmmLog(parames);
                if(code === '20000') {
                    setListStatusData(data.records)
                    console.log(data);
                }else{
                    message.error(msg)
                }
            })()
        },
        [],
    )
    useEffect(() => {
        const parames = {
            currentPage: 1,
            pageSize: 10
        };
        listFun(parames);
        listStatusFun();
    }, [listFun, listStatusFun]);
    const onChange = (e) => {
        const parames = {
            currentPage: 1,
            pageSize: 10,
            bdt: e.target.value
        }
        listFun(parames);
    }
    const columns = [
        {
            title: '总耗时(毫秒)',
            dataIndex: 'elapsed',
        },
        {
            title: '操作内容',
            dataIndex: 'message',
        },
        {
            title: '失败原因',
            dataIndex: 'errMessage',
        },
        {
            title: '操作时间',
            dataIndex: 'operationTime',
        }
    ];
    const columnsStatus = [
        {
            title: '采集时间',
            dataIndex: 'collectDate',
        },
        {
            title: '设备名称',
            dataIndex: 'deviceName',
        },
        {
            title: '日志状态',
            dataIndex: 'isAlarm',
        },
        {
            title: '采集值',
            dataIndex: 'val',
        }
    ];

    return <FastAndOperationAll>
        <Card title="业务动态" extra={
            <Radio.Group onChange={onChange} defaultValue="0">
                <Radio.Button value="0">企业</Radio.Button>
                <Radio.Button value="1">设备</Radio.Button>
                <Radio.Button value="2">用户</Radio.Button>
                <Radio.Button value="3">系统</Radio.Button>
            </Radio.Group>
        } style={{ flex: 7, marginTop: '14px' }}>
            <Table columns={columns} dataSource={listData} rowKey='operationTime' size='small' />
        </Card>
        <FastAndOperationRight>
            <Card title="快捷应用"style={{ flex: 3, marginTop: '14px' }}>
                <FastAndOperationIcon>
                    <div className='addIcon'>
                        <img src={kehu} alt = '添加客户'/>
                        <p>
                            添加客户
                        </p>
                    </div>
                    <div className='addIcon'>
                        <img src={shebei} alt = '添加设备'/>
                        <p>
                            添加设备
                        </p>
                    </div>
                    <div className='addIcon'>
                        <img src={yonghu} alt = '添加用户'/>
                        <p>
                            添加用户
                        </p>
                    </div>

                </FastAndOperationIcon>
            </Card>
            <Card title="设备状态日志"  style={{ flex: 7, marginTop: '14px' }}>
                <Table columns={columnsStatus} dataSource={listStatusData} rowKey='collectDate' size='small' />
            </Card>
        </FastAndOperationRight>

    </FastAndOperationAll>
}

export default FastAndOperation;