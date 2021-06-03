import React, { useEffect, useCallback, useState } from 'react';
import {
    postSysDepartmentFindDepartment,
    getSysUserUserList,
    postSysDepartmentUpdateDepartment
} from '../../../../../api/setUrl'
import {
    Modal,
    Form,
    Input,
    message,
    Select
} from 'antd';

const { Option } = Select;

const ChangeModal = ({ setChangeModalShow, changeModalShow, clickId, onChange, clickCode, setClickCode }) => {
    const [form] = Form.useForm();
    const { validateFields, resetFields, setFieldsValue } = form;
    const [userList, setUserList] = useState([]);

    //用户列表
    const userListFun = useCallback(
        () => {
            ; (async () => {
                const { code, msg, data } = await getSysUserUserList();
                if (code === '20000') {
                    setUserList(data)
                } else {
                    message.error(msg);
                }
            })()
        },
        [],
    )
    const detailsFun = useCallback(
        () => {
            ; (async () => {
                if (clickCode) {
                    const parames = {
                        currentPage: 1,
                        pageSize: 10,
                        company: clickId,
                        key: clickCode
                    }
                    const { code, msg, data } = await postSysDepartmentFindDepartment(parames);
                    if (code === '20000') {
                        setFieldsValue(data.records[0]);
                    } else {
                        message.error(msg);
                    }
                }
            })()
        },
        [clickCode, clickId, setFieldsValue],
    )
    useEffect(() => {
        detailsFun();
        userListFun();
    }, [detailsFun, userListFun])

    const handleOk = () => {
        validateFields().then(values => {
            values.company = clickId;
            ; (async () => {
                const { code, msg } = await postSysDepartmentUpdateDepartment(values);
                if (code === '20000') {
                    message.success('修改成功！');
                    onChange(clickId);
                    resetFields();
                    setClickCode(null);
                    setChangeModalShow(false);
                } else {
                    message.error(msg);
                }
            })();
        })
    };

    const handleCancel = () => {
        resetFields();
        setClickCode(null);
        setChangeModalShow(false);
    };

    return <Modal title="添加岗位" visible={changeModalShow} onOk={handleOk} onCancel={handleCancel}>
        <Form
            {...layout}
            initialValues={{ remember: true }}
            form={form}
        >
            <Form.Item
                label="部门编号"
                name="code"
                rules={[{ required: true, message: '请输入部门编号!' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="部门名称"
                name="name"
                rules={[{ required: true, message: '请输入部门名称!' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="部门说明"
                name="explain"
                rules={[{ required: true, message: '请输入部门说明!' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="部门主管"
                name="competent"
            >
                <Select>
                    {
                        userList.map(item => <Option value={item.id}>{item.name}</Option>)
                    }
                </Select>
            </Form.Item>

        </Form>
    </Modal>
}
const layout = {
    labelCol: {
        span: 6,
    },
    wrapperCol: {
        span: 18,
    },
};

export default ChangeModal;