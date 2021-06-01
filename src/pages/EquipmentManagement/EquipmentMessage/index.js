import React, { useState, useEffect, useCallback } from 'react';
import {
    postDmmDeviceFindDevice,
    getDmmDeviceDeleteDevice, //deviceId
} from '../../../api/equipmentUrl';
import SelectModal from './components/SelectModal';
import AddEquipment from './components/AddEquipment';
import ParameterSet from './components/ParameterSet';
import ChangeEquipment from './components/ChangeEquipment';
import AddParameter from './components/AddParameter';
import {
    EquipmentMessageAll
} from './style';
import {
    PageHeader,
    Button,
    message,
    Table,
    Space,
    Modal
} from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const { confirm } = Modal;


const EquipmentMessage = () => {
    const [listData, setListData] = useState([]);
    const [pageSize, setPageSize] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [addModal, setAddModal] = useState(false); //添加modal
    const [parameterSetModalShow, setParameterSetModalShow] = useState(false); //参数设置
    const [deviceCode, setDeviceCode] = useState(null); //点击获取的设备编号
    const [clickId, setClickId] = useState(null); // 点击获取id
    const [changeModal, setChangeModal] = useState(false); // 修改modal
    const [addParameterModal, setAddParameterModal] = useState(false); //添加参数Modal

    const listFun = useCallback(
        (parames = {
            currentPage: 1,
            pageSize: 10
        }) => {
            ; (async () => {
                const { code, msg, data } = await postDmmDeviceFindDevice(parames);
                if (code === '20000') {
                    setListData(data.records);
                    setTotal(data.total);
                    setCurrentPage(parames.currentPage);
                    setPageSize(parames.pageSize);
                } else {
                    message.error(msg);
                }
            })();
        },
        [],
    )
    useEffect(() => {
        listFun()
    }, [listFun])
    //分页
    const pagination = {
        //是否可以改变pagesize//
        showSizeChanger: true,
        //是否可以快速跳转到某页
        showQuickJumper: true,
        //展示一共有多少条数据//
        showTotal: () => `共${total}条`,
        //每页条数
        pageSize: pageSize,
        //当前页数
        current: currentPage,
        //数据总数
        total: total,
        //pageSize 变化的回调
        onShowSizeChange: (current, pageSize) => changePageSize(pageSize, current),
        //页码改变的回调，参数是改变后的页码及每页条数
        onChange: (current) => changePage(current),
    }
    //改变每页条数
    const changePageSize = (pageSize, current) => {
        const parames = {
            currentPage: current,
            pageSize: pageSize
        }
        listFun(parames);
    }
    //改变页数
    const changePage = (current) => {
        const parames = {
            currentPage: current,
            pageSize
        }
        listFun(parames);
    }
    //显示添加
    const handleAddModalShow = () => {
        setAddModal(true)
    }
    //参数删除
    const handleParameterSetModal = (deviceCode) => {
        setDeviceCode(deviceCode);
        setParameterSetModalShow(true);
    }
    //修改
    const handleChangeModalShow = (deviceCode, id) => {
        setClickId(id)
        setDeviceCode(deviceCode);
        setChangeModal(true);
    }
    //参数新增
    const handleAddParameterModal = (deviceCode) => {
        setDeviceCode(deviceCode);
        setAddParameterModal(true)
    }
    //删除  设备信息
    const handleDelete = id => {
        confirm({
            title: '确定要是删除当前设备信息吗?',
            icon: <ExclamationCircleOutlined />,
            onOk() {
                ; (async () => {
                    const { code, msg } = await getDmmDeviceDeleteDevice({ deviceId: id });
                    if (code === '20000') {
                        listFun();
                        message.success('删除成功！');
                    } else {
                        message.error(msg);
                    }
                })();
            }
        });
    }
    const columns = [
        {
            title: '设备编号',
            dataIndex: 'deviceCode'
        },
        {
            title: '设备名称',
            dataIndex: 'deviceName',
        },
        {
            title: '设备状态',
            dataIndex: 'deviceStatus',
        },
        {
            title: '型号',
            dataIndex: 'model',
        },
        {
            title: '出场日期',
            dataIndex: 'productionDate',
        },
        {
            title: '操作',
            render: (text, record) => (
                <Space size="middle">
                    <Button type='primary' onClick={() => handleChangeModalShow(record.deviceCode, record.id)}>编辑</Button>
                    <Button type='primary' danger onClick={() => handleDelete(record.id)}>删除</Button>
                    <Button type='primary' onClick={() => handleAddParameterModal(record.deviceCode)}>参数新增</Button>
                    <Button type='primary' onClick={() => handleParameterSetModal(record.deviceCode)} danger>参数删除</Button>
                </Space>
            )
        },
    ];
    return <EquipmentMessageAll>
        <PageHeader
            className="site-page-header"
            title="设备信息"
            extra={[
                <Button
                    key="1"
                    type="primary"
                    onClick={() => handleAddModalShow()}
                >
                    添加设备
                </Button>,
            ]}
        ></PageHeader>
        <SelectModal listFun={listFun} />
        <Table dataSource={listData} columns={columns} rowKey='id' pagination={pagination} />
        <AddEquipment setAddModal={setAddModal} addModal={addModal} listFun={listFun} />
        <ParameterSet parameterSetModalShow={parameterSetModalShow} setParameterSetModalShow={setParameterSetModalShow} deviceCode={deviceCode} />
        <ChangeEquipment
            deviceCode={deviceCode}
            changeModal={changeModal}
            setChangeModal={setChangeModal}
            listFun={listFun}
            clickId={clickId}
            setDeviceCode={setDeviceCode}
        />
        <AddParameter
            addParameterModal={addParameterModal}
            setAddParameterModal={setAddParameterModal}
            deviceCode={deviceCode}
            setDeviceCode={setDeviceCode}
        />
    </EquipmentMessageAll>
}

export default EquipmentMessage;