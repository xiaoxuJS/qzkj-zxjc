import React, { useState, useCallback, useEffect } from 'react';
import {
    useHistory
} from 'react-router-dom'
import {
    getSysDepartmentFindList,
    postSysUserFindPage,
    postSysUserUpdStatus
} from '../../../api/setUrl';
import AddModal from './components/AddMoadl';
import ChangeMoadl from './components/ChangeMoadl'
import {
    UserAll
} from './style';
import {
    PageHeader,
    Button,
    Col,
    Row,
    Menu,
    message,
    Table,
    Space,
    Modal
} from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const { confirm } = Modal;
const { SubMenu } = Menu;

const User = () => {
    const history = new useHistory();
    const [listData, setListData] = useState([]);
    const [clickId, setClickId] = useState();
    const [tableData, setTableData] = useState([]);
    const [addModalShow, setAddModalShow] = useState(false); //添加是否显示
    const [changeShow, setChangeShow] = useState(false); //修改显示
    const [clickChangeID, setClickChangeID] = useState(null);// 点击修改的用户id
    const listFun = useCallback(
        () => {
            ; (async () => {
                const { code, msg, data } = await getSysDepartmentFindList();
                if (code === '20000') {
                    setListData(data)
                } else {
                    message.error(msg);
                }
            })();
        },
        [],
    )
    useEffect(() => {
        listFun();
    }, [listFun])
    const handleClick = e => {
        setClickId(e.key)
        userList(e.key)
    };
    //获取用户列表
    const userList = (key) => {
        ; (async () => {
            const { code, msg, data } = await postSysUserFindPage({ department: key, currentPage: 1, pageSize: 999 });
            if (code === '20000') {
                setTableData(data.records)
            } else {
                message.error(msg);
            }
        })();
    }
    //添加用户
    const handleAddModalShow = () => {
        setAddModalShow(true);
    }
    //修改用户
    const handleChangeModal = id => {
        setChangeShow(true)
        setClickChangeID(id);
    }
    //账号状态更新
    const handleChangeType = (id, type) => {
        confirm({
            title: '确定要更新状态吗?',
            icon: <ExclamationCircleOutlined />,
            onOk() {
                const parames = {
                    id,
                    status: type
                }
                ; (async () => {
                    const {code, msg} = await postSysUserUpdStatus(parames);
                    if(code === '20000'){
                        userList(clickId)
                        message.success('更新成功！')
                    }else{
                        message.error(msg);
                    }
                })();
            }
        });
    }
    //进入用户详情
    const handleEnterDetails = id => {
        history.push({pathname: '/user/details', state: {
            id
        }})
    }
    const columns = [
        {
            title: '工号',
            dataIndex: 'jobNumber'
        },
        {
            title: '姓名',
            dataIndex: 'name',
            render: (text, recode) => <Button type='link' onClick = {() => handleEnterDetails(recode.id)}>{text}</Button>,
        },
        {
            title: '用户名',
            dataIndex: 'username',
        },
        {
            title: '邮箱',
            dataIndex: 'email'
        },
        {
            title: '最近登录时间',
            dataIndex: 'lastTime'
        },
        {
            title: '状态',
            dataIndex: 'status',
            // 0:正常,1:冻结,2:注销
            render: text => {
                switch (text) {
                    case 0:
                        return <span style={{ color: "#1890FF" }}>正常</span>
                    case 1:
                        return <span style={{ color: "#FF4D4F" }}>冻结</span>
                    case 2:
                        return <span style={{ color: "#A6AAAE" }}>注销</span>
                    default:
                        break;
                }
            }
        },
        {
            title: '操作',
            render: (text, record) => (
                <Space size="middle">
                    <Button type='primary' onClick={() => handleChangeModal(record.id)}>编辑</Button>
                    {record.status !== 0 ? <Button type='primary' onClick={() => handleChangeType(record.id, 0)}>恢复</Button> : null}
                    {record.status !== 1 ? <Button type='primary' danger onClick={() => handleChangeType(record.id, 1)}>冻结</Button> : null}
                    {record.status !== 2 ? <Button onClick={() => handleChangeType(record.id, 2)}>注销</Button> : null}
                </Space>
            ),
        },
    ];
    return <UserAll>
        <PageHeader
            className="site-page-header"
            title="用户管理"

        ></PageHeader>
        <Row>
            <Col span={8}>
                <Menu
                    onClick={handleClick}
                    style={{ width: '100%' }}
                    mode="inline"
                >
                    {
                        listData.map(item => {
                            return <SubMenu key={item.companyName} title={item.companyName}>
                                {
                                    item.depListTreeDTOS.map(element => {
                                        return <Menu.Item key={element.id}>{element.name}</Menu.Item>
                                    })
                                }
                            </SubMenu>
                        })
                    }
                </Menu>
            </Col>
            <Col span={16}>
                <div className='border-div'>
                    <PageHeader
                        className="site-page-header"
                        title="用户列表"
                        extra={[
                            <Button
                                key="1"
                                type="primary"
                                onClick={() => handleAddModalShow()}
                            >
                                添加用户
                            </Button>,
                        ]}
                    />
                    <Table columns={columns} dataSource={tableData} />
                </div>
            </Col>
        </Row>
        <AddModal
            addModalShow={addModalShow}
            clickId={clickId}
            userList={userList}
            setAddModalShow={setAddModalShow}
        />
        <ChangeMoadl
            setChangeShow={setChangeShow}
            changeShow={changeShow}
            clickId={clickId}
            userList={userList}
            clickChangeID={clickChangeID}
            setClickChangeID={setClickChangeID}
        />
    </UserAll>
}

export default User;