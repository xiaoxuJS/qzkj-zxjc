import React, { useEffect, useCallback } from 'react';
import {
    postSysPermissionUpdPermission,
    getSysPermissionDelPermission
} from '../../../../../api/setUrl'
import {
    Modal,
    Form,
    Input,
    PageHeader,
    Switch,
    Button,
    message
} from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons';

const { confirm } = Modal;

const ChangeModal = ({ setAddAndChange, setAddModalTop, clickData, selectedKeys, listFun }) => {
    const [formChange] = Form.useForm();
    const { setFieldsValue } = formChange;
    const clickDataFun = useCallback(
        () => {
            setFieldsValue(clickData);
        },
        [clickData, setFieldsValue],
    )
    useEffect(() => {
        clickDataFun();
    }, [clickDataFun])
    //确定修改菜单
    const onFinish = (values) => {
        values.status ? values.status = 0 : values.status = 1;
        values.id = selectedKeys;
        ; (async () => {
            const { code, msg } = await postSysPermissionUpdPermission(values);
            if (code === '20000') {
                listFun();
                message.success('修改成功');
            } else {
                message.error(msg);
            }
        })();
    };
    // 添加菜单
    const handleAddMenu = () => {
        confirm({
            title: '确定要在当前菜单下添加子菜单吗?',
            icon: <ExclamationCircleOutlined />,
            onOk() {
                setAddAndChange(true)
                setAddModalTop(false)
            }
        });

    };
    //删除
    const handleDeleteMenu = () => {
        confirm({
            title: '确定要删除当前菜单吗?',
            icon: <ExclamationCircleOutlined />,
            onOk() {
                ; (async () => {
                    const {code, msg} = await getSysPermissionDelPermission({id: selectedKeys});
                    if(code === '20000') {
                        setAddAndChange(true);
                        setAddModalTop(true);
                        listFun();
                        message.success('删除成功！');
                    }else{
                        message.error(msg);
                    }
                })();
            }
        });
    }
    return <>
        <PageHeader
            className="site-page-header"
            title="添加权限"
        />
        <Form
            {...layout}
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            form={formChange}
        >
            <Form.Item
                label="权限代码（服务）"
                name="codeUri"
                rules={[{ required: true, message: '请填写权限代码（服务）!' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="权限代码（视图）"
                name="enname"
                rules={[{ required: true, message: '请填写权限代码（视图）!' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="菜单名称"
                name="mainMenu"
                rules={[{ required: true, message: '请填写菜单名称!' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="状态"
                name="status"
                valuePropName="checked"
            >
                <Switch checkedChildren="正常" unCheckedChildren="停用" />
            </Form.Item>

            <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                    修改菜单
                </Button>
                <Button type="primary" onClick={() => handleAddMenu()}>
                    添加菜单
                </Button>
                <Button type="primary" danger onClick={() => handleDeleteMenu()}>
                    删除
                </Button>
            </Form.Item>
        </Form>
    </>
}

const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
};
const tailLayout = {
    wrapperCol: {
        offset: 6,
        span: 18,
    },
};

export default ChangeModal;