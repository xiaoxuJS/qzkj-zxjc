import React, { useEffect, useCallback, useState } from 'react';
import {
    getDmmPeakFindDmmPeak,
    getDmmDeviceDeleteParam
} from '../../../../../api/equipmentUrl';
import {
    Button,
    message,
    Modal,
    Table,
    Space
} from 'antd';

const ParameterSet = ({ parameterSetModalShow, setParameterSetModalShow, deviceCode }) => {
    const [listData, setListData] = useState([]);
    const listFun = useCallback(
        () => {
            if (deviceCode) {
                ; (async () => {
                    const { code, msg, data } = await getDmmPeakFindDmmPeak({ deviceCode });
                    if (code === '20000') {
                        setListData(data);
                    } else {
                        message.error(msg);
                    }
                })();
            }
        },
        [deviceCode],
    )
    useEffect(() => {
        listFun();
    }, [listFun])

    const handleOk = () => {
        setParameterSetModalShow(false);
    };

    const handleCancel = () => {
        setParameterSetModalShow(false);
    };
    //删除参数
    const handleDelete = id => {
        ;(async () => {
            const {code, msg} = await getDmmDeviceDeleteParam({id});
            if(code === '20000') {
                message.success('删除成功！');
                listFun();
            }else{
                message.error(msg);
            }
        })();
    }
    const columns = [
        {
            title: '参数名称',
            dataIndex: 'paramName'
        },
        {
            title: '上限',
            dataIndex: 'upperLimit'
        },
        {
            title: '下限',
            dataIndex: 'lowerLimit'
        },
        {
            title: '操作',
            render: (text, record) => (
                <Space size="middle">
                    <Button type = 'primary' size = 'small' danger onClick = {() => handleDelete(record.id)}>删除</Button>
                </Space>
            ),
        },
    ];
    return <Modal title="参数删除" visible={parameterSetModalShow} onOk={handleOk} onCancel={handleCancel}>
        <Table columns={columns} dataSource={listData} rowKey = 'id' size = 'small' bordered />
    </Modal>
}

export default ParameterSet;