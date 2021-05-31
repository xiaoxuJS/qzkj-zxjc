import React, { useState, useEffect, useCallback } from 'react';
import {
    postDmmModelFindModePage,
    getDmmModelDeleteDmmModel
} from '../../../api/equipmentUrl';
import AddEquipmentModal from './AddEquipmentModal';
import ChangeEquipmentModal from './ChangeEquipmentModal'
import {
    ModelManagementAll
} from './style';
import {
    Button,
    message,
    PageHeader,
    Space,
    Table,
    Modal
} from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const {confirm} = Modal;

const ModelManagement = () => {
    const [listData, setListData] = useState([]); //列表数据
    const [total, setTotal] = useState(0); // 总条数
    const [addModal, setAddModal] = useState(false); // 添加modal 
    const [changeModal, setChangeModal] = useState(false); // 修改
    const [pageSize, setPageSize] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [clickID, setClickID] = useState(null); //点击id
    const listFun = useCallback(
        (parames = {
            currentPage: 1,
            pageSize: 10
        }) => {
            ; (async () => {
                const { code, msg, data } = await postDmmModelFindModePage(parames);
                if (code === '20000') {
                    setListData(data.records);
                    setTotal(data.total);
                    setPageSize(parames.pageSize)
                    setCurrentPage(parames.currentPage)
                } else {
                    message.error(msg);
                }
            })()
        },
        [],
    )
    useEffect(() => {
        listFun();
    }, [listFun]);
    const handleAddModalShow = () => {
        setAddModal(true);
    }
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
    const changePageSize = (pageSizeFun, current) => {
        const parames = {
            currentPage: current,
            pageSize: pageSizeFun
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
    //删除
    const handleDelete = id => {
        confirm({
            title: '确定要删除当前型号吗?',
            icon: <ExclamationCircleOutlined />,
            onOk() {
                ;(async () => {
                    const {code , msg } = await getDmmModelDeleteDmmModel({modelId: id});
                    if(code === '20000'){
                        message.success('删除成功！')
                        listFun();
                    }else{
                        message.error(msg);
                    }
                })()
            },
            onCancel() {
            },
          });
    }
    //修改
    const handleChangeModal = (id, data) => {
        setClickID(id);
        setChangeModal(true)
    }
    const columns = [
        {
            title: '型号代码',
            dataIndex: 'modelCode',
            key: 'modelCode',
        },
        {
            title: '型号名称',
            dataIndex: 'model',
            key: 'model',
        },

        {
            title: '录入人',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '录入时间',
            dataIndex: 'createTime',
            key: 'createTime',
        },
        {
            title: '操作',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <Button type='primary' onClick = {() => handleChangeModal(record.id, record)} >编辑</Button>
                    <Button type='primary' danger onClick = {() => handleDelete(record.id)}>删除</Button>
                </Space>
            ),
        },
    ];
    return <ModelManagementAll>
        <PageHeader
            className="site-page-header"
            title="型号管理"
            extra={[
                <Button key="1" type="primary" onClick = {() => handleAddModalShow()}>
                    添加型号
                </Button>,
            ]}
        ></PageHeader>
        <Table columns={columns} dataSource={listData} pagination={pagination} rowKey='id' />
        <AddEquipmentModal setAddModal={setAddModal} addModal={addModal} listFun = {listFun} />
        <ChangeEquipmentModal 
            setChangeModal={setChangeModal} 
            changeModal={changeModal} 
            listFun = {listFun} 
            clickID = {clickID} 
            setClickID = {setClickID}
        />

    </ModelManagementAll>
}

export default ModelManagement;