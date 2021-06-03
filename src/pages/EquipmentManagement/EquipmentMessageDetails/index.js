import React, { useState, useEffect, useCallback } from 'react';
import {
    useLocation
} from 'react-router-dom';
import {
    getDmmDeviceFindDetailsDevice,
    getSysUserFindDevUser,
    getDmmDeviceRelieveBind,
    postDmmLogListDmmLog
} from '../../../api/equipmentUrl';
import AddModal from './AddModal';
import ExportModal from './ExportModal'
import {
    EquipmentMessageDetailsAll,
    EquipmentMessageDetailsContent
} from './style';
import {
    message,
    PageHeader,
    Row,
    Col,
    Typography,
    Table,
    Button,
    Modal
} from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons';

const { confirm } = Modal;
const { Title } = Typography;

const EquipmentMessageDetails = () => {
    const location = new useLocation();
    const [detailsData, setDetailsData] = useState({});
    const [administratorList, setAdministratorList] = useState([]);
    const [addModalShow, setAddModalShow] = useState(false);
    const [logList, setLogList] = useState([]);
    const [exportModalShow, setExportModalShow] = useState(false);
    //企业运行日志
    const logFun = useCallback(
        (parames = {
            currentPage: 1,
            pageSize: 10,
        }) => {
            parames.deviceId = location.state.deviceId;
            ; (async () => {
                const { code, msg, data } = await postDmmLogListDmmLog(parames);
                if (code === '20000') {
                    setLogList(data.records)
                } else {
                    message.error(msg);
                }
            })();
        },
        [location.state],
    )
    //获取管理员列表
    const administratorFun = useCallback(
        () => {
            ; (async () => {
                const { code, msg, data } = await getSysUserFindDevUser({ deviceId: location.state.deviceId });
                if (code === '20000') {
                    setAdministratorList(data)
                } else {
                    message.error(msg);
                }
            })();
        },
        [location.state],
    )
    const detailsFun = useCallback(
        () => {
            ; (async () => {
                const { code, msg, data } = await getDmmDeviceFindDetailsDevice({ deviceId: location.state.deviceId });
                if (code === '20000') {
                    setDetailsData(data)
                } else {
                    message.error(msg);
                }
            })();
        },
        [location.state],
    )

    useEffect(() => {
        detailsFun();
        administratorFun();
        logFun();
    }, [detailsFun, administratorFun, logFun])
    //添加管理员
    const handleAddModal = () => {
        setAddModalShow(true)
    };
    //删除
    const handleDelete = id => {
        confirm({
            title: '确定要删除当前管理员吗?',
            icon: <ExclamationCircleOutlined />,
            onOk() {
                ; (async () => {
                    const { code, msg } = await getDmmDeviceRelieveBind({ userId: id });
                    if (code === '20000') {
                        administratorFun();
                        message.success('删除成功');
                    } else {
                        message.error(msg);
                    }
                })()
            }
        });
    }
    //导出
    const handleExport = () => {
        setExportModalShow(true)
    }

    const columns = [
        {
            title: '参数编码',
            render: (text, recode) => <span>{recode.param.paramCode}</span>
        },
        {
            title: '参数英文单位',
            render: (text, recode) => <span>{recode.param.paramEnUnit}</span>
        },
        {
            title: '参数名称',
            render: (text, recode) => <span>{recode.param.paramName}</span>
        },
        {
            title: '参数中文单位',
            render: (text, recode) => <span>{recode.param.paramUnit}</span>
        },
        {
            title: '上限',
            dataIndex: 'upperLimit'
        },
        {
            title: '下限',
            dataIndex: 'lowerLimit'
        },
    ]
    const columnsA = [
        {
            title: '绑定时间',
            dataIndex: 'bindTime'
        },
        {
            title: '姓名',
            dataIndex: 'name'
        },
        {
            title: '操作人',
            dataIndex: 'operation'
        },
        {
            title: '操作',
            render: (text, recode) => <Button type='primary' danger onClick={() => handleDelete(recode.id)}>删除</Button>
        },
    ]
    const columnslog = [
        {
            title: '采集时间',
            dataIndex: 'collectDate'
        },
        {
            title: '设备代码',
            dataIndex: 'deviceCode'
        },
        {
            title: '设备名称',
            dataIndex: 'deviceName'
        },
        {
            title: '日志状态',
            dataIndex: 'isAlarm'
        },
        {
            title: '参数英文单位',
            dataIndex: 'paramEnUnit'
        },
        {
            title: '参数名称',
            dataIndex: 'paramName'
        },
        {
            title: '参数中文单位',
            dataIndex: 'paramUnit'
        },
        {
            title: '采集值',
            dataIndex: 'val'
        }
    ]
    return <EquipmentMessageDetailsAll>
        <PageHeader
            className="site-page-header"
            title="设备详情"
        ></PageHeader>
        <EquipmentMessageDetailsContent>
            <Title level={2}>基本信息</Title>
            <Row>
                <Col span={2}>剩余条数：</Col>
                <Col span={22}>{detailsData.day}</Col>
                <Col span={2}>设备编号：</Col>
                <Col span={22}>{detailsData.deviceCode}</Col>
                <Col span={2}>设备名称：</Col>
                <Col span={22}>{detailsData.deviceName}</Col>
                <Col span={2}>到期时间：</Col>
                <Col span={22}>{detailsData.expire}</Col>
                <Col span={2}>设备特点：</Col>
                <Col span={22}>{detailsData.features}</Col>
                <Col span={2}>设备型号：</Col>
                <Col span={22}>{detailsData.model}</Col>
                <Col span={2}>状态：</Col>
                <Col span={22}>{detailsData.status}</Col>
            </Row>
            <Title level={2}>设备管理员 <Button type='link' onClick={() => handleAddModal()}>添加管理员</Button></Title>
            <Table
                columns={columnsA}
                dataSource={administratorList}
                rowKey='id'
                size='small'
                pagination={false}
            />
            <Title level={2}>参数列表</Title>
            <Table
                columns={columns}
                dataSource={detailsData.peak}
                rowKey='id'
                size='small'
                pagination={false}
            />
            <Title level={2}>设备运行日志<Button type='link' onClick={() => handleExport()}>导出</Button></Title>
            <Table
                columns={columnslog}
                dataSource={logList}
                rowKey='id'
                size='small'
                pagination={false}
            />
        </EquipmentMessageDetailsContent>
        <AddModal
            addModalShow={addModalShow}
            setAddModalShow={setAddModalShow}
            deviceId={location.state.deviceId}
            administratorFun={administratorFun}
        />
        <ExportModal
            exportModalShow={exportModalShow}
            setExportModalShow={setExportModalShow}
            id={location.state.deviceId}
        />
    </EquipmentMessageDetailsAll>
}

export default EquipmentMessageDetails;