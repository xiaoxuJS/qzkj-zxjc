import React, { useState, useEffect, useCallback } from 'react';
import {
    postSysDepartmentFindDepartment,
    getCpCompanyLikeCompany,
    getSysDepartmentDelDepartment
} from '../../../api/setUrl';
import AddModal from './components/AddModal';
import ChangeModal from './components/ChangeModal'
import {
    PostManagementAll
} from './style';
import {
    PageHeader,
    Button,
    message,
    Select,
    Table,
    Space,
    Modal
} from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const { confirm } = Modal;
const { Option } = Select;

const PostManagement = () => {
    const [listData, setListData] = useState([]);
    const [tabledata, setTabledata] = useState([]);
    const [clickId, setClickId] = useState(null);
    const [addModalShow, setAddModalShow] = useState(false);
    const [changeModalShow, setChangeModalShow] = useState(false);
    const [clickCode, setClickCode] = useState(null);

    //搜索
    const onChange = useCallback(
        (value) => {
            ; (async () => {
                const { code, msg, data } = await postSysDepartmentFindDepartment({ company: value, currentPage: 1, pageSize: 999 });
                if (code === '20000') {
                    setTabledata(data.records)
                    setClickId(value);
                } else {
                    message.error(msg);
                }
            })();
        },
        [],
    )
    const listFun = useCallback(
        () => {
            ; (async () => {
                const { code, msg, data } = await getCpCompanyLikeCompany();
                if (code === '20000') {
                    setListData(data)
                    onChange(data[0].id);
                } else {
                    message.error(msg)
                }
            })();
        },
        [onChange],
    )

    useEffect(() => {
        listFun();
    }, [listFun ])
    //显示添加
    const handleAddModalShow = () => {
        setAddModalShow(true);
    }
    //修改
    const handleChangeModal = (code) => {
        setChangeModalShow(true);
        setClickCode(code);
    }
    //删除
    const handleDelete = bianma => {
        confirm({
            title: '确定要删除当前岗位吗?',
            icon: <ExclamationCircleOutlined />,
            onOk() {
                ;(async () => {
                    const {code, msg} = await getSysDepartmentDelDepartment({code: bianma});
                    if(code === '20000') {
                        onChange(clickId);
                        message.success('删除成功!');
                    }else{
                        message.error(msg);
                    }
                })()
            }
        });
    }

    const columns = [
        {
            title: '部门编号',
            dataIndex: 'code'
        },
        {
            title: '部门主管',
            dataIndex: 'competentName'
        },
        {
            title: '部门说明',
            dataIndex: 'explain'
        },
        {
            title: '部门名称',
            dataIndex: 'name'
        },
        {
            title: '操作',
            render: (text, recode) => (
                <Space>
                    <Button type='primary' onClick={() => handleChangeModal(recode.code)}>编辑</Button>
                    <Button type='primary' danger onClick={() => handleDelete(recode.code)}>删除</Button>
                </Space>
            )
        },
    ];
    return <PostManagementAll>
        <PageHeader
            className="site-page-header"
            title="岗位管理"
            extra={[
                <Button
                    key="1"
                    type="primary"
                    onClick={() => handleAddModalShow()}
                >
                    添加岗位
                </Button>,
            ]}
        ></PageHeader>
        <Select
            showSearch
            value={clickId}
            style={{ width: 200 }}
            placeholder="请选择企业"
            optionFilterProp="children"
            onChange={onChange}
            filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
        >
            {
                listData.map(item => <Option value={item.id}>
                    {item.companyName}
                </Option>)
            }
        </Select>
        <Table columns={columns} dataSource={tabledata} />
        <AddModal
            setAddModalShow={setAddModalShow}
            addModalShow={addModalShow}
            clickId={clickId}
            onChange={onChange}
        />
        <ChangeModal
            setChangeModalShow={setChangeModalShow}
            changeModalShow={changeModalShow}
            clickId={clickId}
            clickCode={clickCode}
            setClickCode = {setClickCode}
            onChange = {onChange}
        />
    </PostManagementAll>
}

export default PostManagement;