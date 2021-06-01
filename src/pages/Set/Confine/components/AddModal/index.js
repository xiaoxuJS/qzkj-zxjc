import React from 'react';
import {
    putSysPermissionInsertPermission
} from '../../../../../api/setUrl'
import {
    Form,
    Input,
    PageHeader,
    Switch,
    Button,
    message
} from 'antd'

const AddModal = ({ addModalTop, listFun, selectedKeys }) => {
    const [form] = Form.useForm();
    const { resetFields } = form;
    const onFinish = (values) => {
        if (addModalTop) {
            if (typeof values.status === 'undefined' || values.status) {
                values.status = 0;
            } else {
                values.status = 1;
            }
            ; (async () => {
                const { code, msg } = await putSysPermissionInsertPermission(values);
                if (code === '20000') {
                    resetFields();
                    listFun();
                    message.success('创建成功！');
                } else {
                    message.error(msg);
                }
            })();
        } else {
            if (typeof values.status === 'undefined' || values.status) {
                values.status = 0;
            } else {
                values.status = 1;
            }
            values.parentId = selectedKeys

                ; (async () => {
                    const { code, msg } = await putSysPermissionInsertPermission(values);
                    if (code === '20000') {
                        resetFields();
                        listFun();
                        message.success('创建成功！');
                    } else {
                        message.error(msg);
                    }
                })();
        }

    };
    return <>
        <PageHeader
            className="site-page-header"
            title={addModalTop ? "添加权限(顶层)" : '添加权限'}
        />
        <Form
            {...layout}
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            form={form}
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
            >
                <Switch checkedChildren="正常" unCheckedChildren="停用" defaultChecked />
            </Form.Item>

            <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                    添加菜单
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

export default AddModal;