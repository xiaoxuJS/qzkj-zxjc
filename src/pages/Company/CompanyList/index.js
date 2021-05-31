import React, { useEffect, useRef, useCallback, useState } from 'react';
import {
    useHistory
} from 'react-router-dom'
import { Map, APILoader, Marker } from '@uiw/react-amap';
import {
    getcpCompanyFindGeographical,
    postcpCompanyListCompany,
    postcpCompanyDeleteCompany
} from '../../../api/companyUrl';
import CompanyAddModal from './components/CompanyAddModal';
import CompanyChangeModal from './components/CompanyChangeModal';
import {
    CompanyAll,
    CompanyMap,
    CompanyListTitle
} from './style';
import {
    message,
    Table,
    Button,
    Space,
    Typography,
    Row,
    Col,
    Form,
    Input,
    Modal
} from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons';
const { Title } = Typography;
const { confirm } = Modal;


const Company = () => {
    const listHeight = useRef();
    const history = new useHistory();
    const [form] = Form.useForm();
    const { resetFields } = form;
    const [biaojiList, setBiaojiList] = useState([]);
    const [companyList, setCompanyList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1); //当前页
    const [pageSize, setPageSize] = useState(3); //每页条数
    const [companyListTotal, setCompanyListTotal] = useState(0); // 总条数
    const [companyListSelect, setCompanyListSelect] = useState({});
    const [companyAddModalShow, setCompanyAddModalShow] = useState(false); //添加弹窗
    const [companyChangeModalShow, setCompanyChangeModalShow] = useState(false); //修改弹窗
    const [clickData, setClickData] = useState(null);
    const mapData = useCallback(
        () => {
            ; (async () => {
                const { code, msg, data } = await getcpCompanyFindGeographical();
                if (code === '20000') {
                    setBiaojiList(data)
                } else {
                    message.error(msg);
                }
            })();
        },
        [],
    )
    const companyListFun = useCallback(
        (parames = {
            currentPage: 1,
            pageSize: 10
        }) => {
            ; (async () => {
                const { code, msg, data } = await postcpCompanyListCompany(parames);
                if (code === '20000') {
                    setCurrentPage(parames.currentPage);
                    setPageSize(parames.pageSize);
                    setCompanyList(data.records);
                    setCompanyListTotal(data.total);
                } else {
                    message.error(msg);
                }
            })();
        },
        [],
    )
    useEffect(() => {
        const parames = {
            currentPage: 1,
            pageSize: 10
        }
        mapData();
        companyListFun(parames);
    }, [mapData, companyListFun])
    //显示企业添加弹框
    const handleCompanyAddModal = () => {
        setCompanyAddModalShow(true)
    }
    //form
    const onFinish = (values) => {
        console.log('Success:', values);
        const parames = {
            ...values,
            currentPage: 1,
            pageSize: 10
        }
        setCompanyListSelect(values)
        companyListFun(parames);
    };
    //改变每页条数
    const changePageSize = (pageSizeFun, current) => {
        console.log(pageSize)
        const parames = {
            companyCode: companyListSelect.companyCode || null,
            companyName: companyListSelect.companyName || null,
            currentPage: current,
            pageSize: pageSizeFun
        }
        setCurrentPage(current);
        setPageSize(pageSizeFun);
        companyListFun(parames);
    }
    //改变页数
    const changePage = (current) => {
        const parames = {
            companyCode: companyListSelect.companyCode || null,
            companyName: companyListSelect.companyName || null,
            currentPage: current,
            pageSize
        }
        setCurrentPage(current);
        companyListFun(parames);
    }
    //分页
    const pagination = {
        //是否可以改变pagesize//
        showSizeChanger: true,
        //是否可以快速跳转到某页
        showQuickJumper: true,
        //展示一共有多少条数据//
        showTotal: () => `共${companyListTotal}条`,
        //每页条数
        pageSize: pageSize,
        //当前页数
        current: currentPage,
        //数据总数
        total: companyListTotal,
        //pageSize 变化的回调
        onShowSizeChange: (current, pageSize) => changePageSize(pageSize, current),
        //页码改变的回调，参数是改变后的页码及每页条数
        onChange: (current) => changePage(current),
    }
    //重置
    const handleResetFields = () => {
        const parames = {
            currentPage: 1,
            pageSize: 10
        }
        setCurrentPage(1);
        setPageSize(3);
        setCompanyListSelect({});
        companyListFun(parames);
        resetFields();
    }
    //修改企业信息
    const handleChangeCompany = (id) => {
        setClickData(id);
        setCompanyChangeModalShow(true)
    }
    //删除公司
    const handleDeleteCompany = (id, name) => {
        confirm({
            title: '确定要删除当前企业吗?',
            icon: <ExclamationCircleOutlined />,
            onOk() {
                const parames = {
                    companyId: id,
                    companyName: name
                }
                ;(async () => {
                    const {code , msg } = await postcpCompanyDeleteCompany(parames);
                    if(code === '20000'){
                        companyListFun();
                    }else{
                        message.error(msg);
                    }
                })()
            },
            onCancel() {
            },
          });
    };
    //进入公司详情
    const handleEnterDetails = id => {
        history.push({pathname:'/company/details', state:{id}})
    }

    const columns = [
        {
            title: '编号',
            width: 60,
            render: (text, recode, index) => <span>{index + 1}</span>,
        },
        {
            title: '企业名称',
            dataIndex: 'companyName',
            render: (text, recode) => <Button type='link' onClick = {() => handleEnterDetails(recode.id)}>{text}</Button>,
        },
        {
            title: '企业代码',
            dataIndex: 'companyCode'
        },
        {
            title: '报备人员',
            dataIndex: 'personnel'
        },
        {
            title: '所在地区',
            dataIndex: 'site'
        },
        {
            title: '报备时间',
            dataIndex: 'time'
        },
        {
            title: '操作',
            render: (text, recode) => <>
                <Space>
                    <Button type="primary" onClick={() => handleChangeCompany(recode.id)}>操作</Button>
                    <Button type="primary" danger onClick = {() => handleDeleteCompany(recode.id, recode.companyName)}>删除</Button>
                </Space>
            </>
        },
    ];

    return <CompanyAll>
        <CompanyMap>
            <div className='company-map'>
                <APILoader akay="3b63cb7203de531a7f542a9307b470c7">
                    <Map zoom={4}>
                        {
                            biaojiList && biaojiList.map(item => {
                                return <Marker title={item.city + ":" + item.amount}
                                    position={[item.latitude, item.longitude]}
                                    key={item.latitude + item.longitude}
                                />
                            })
                        }
                    </Map>
                </APILoader>
            </div>
            <div className='company-list' ref={listHeight}>
                <CompanyListTitle>
                    <Row>
                        <Col span={1}></Col>
                        <Col span={2}><Title level={2}>企业</Title></Col>
                        <Col span={16}>

                            <Form
                                {...layout}
                                name="basic"
                                initialValues={{
                                    remember: true,
                                }}
                                onFinish={onFinish}
                                form={form}
                            >
                                <Row>
                                    <Col span={8}>      <Form.Item
                                        label="公司代码"
                                        name="companyCode"
                                    >
                                        <Input />
                                    </Form.Item></Col>
                                    <Col span={8}>      <Form.Item
                                        label="公司名称"
                                        name="companyName"
                                    >
                                        <Input />
                                    </Form.Item></Col>
                                    <Col span={8}>
                                        <Form.Item>
                                            <Button type="primary" htmlType="submit">
                                                搜索
                                            </Button>
                                            <Button onClick={() => handleResetFields()}>重置</Button>
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Form>
                        </Col>
                        <Col span={3}><Button type="primary" onClick={() => handleCompanyAddModal()}>企业新增</Button></Col>
                        <Col span={2}></Col>
                    </Row>
                </CompanyListTitle>
                <Table
                    columns={columns}
                    dataSource={companyList}
                    rowKey='id'
                    size='small'
                    pagination={pagination}
                />
            </div>
        </CompanyMap>
        <CompanyAddModal companyAddModalShow={companyAddModalShow} setCompanyAddModalShow={setCompanyAddModalShow} companyListFun={companyListFun} />
        <CompanyChangeModal 
            companyChangeModalShow={companyChangeModalShow} 
            setCompanyChangeModalShow={setCompanyChangeModalShow} 
            companyListFun={companyListFun} 
            clickData={clickData} 
            setClickData = {setClickData}
        />
    </CompanyAll>
}
const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
export default Company;