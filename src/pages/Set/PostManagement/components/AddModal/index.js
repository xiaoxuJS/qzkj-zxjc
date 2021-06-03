import React from 'react';
import {
    putSysDepartmentInsertDepartment
} from '../../../../../api/setUrl';
import {
    Modal,
    Form,
    Input,
    message
} from 'antd';


const AddModal = ({ setAddModalShow, addModalShow, clickId, onChange }) => {
    const [form] = Form.useForm();
    const { validateFields , resetFields } = form;
    const handleOk = () => {
        validateFields().then(values => {
            values.company = clickId;
            ;(async () => {
                const {code , msg} = await putSysDepartmentInsertDepartment(values);
                if(code === '20000') {
                    message.success('添加部门成功！');
                    onChange(clickId);
                    resetFields();
                    setAddModalShow(false);
                }else{
                    message.error(msg);
                }
            })();
        })
        
    };

    const handleCancel = () => {
        resetFields();
        setAddModalShow(false);
    };

    return <Modal title="添加岗位" visible={addModalShow} onOk={handleOk} onCancel={handleCancel}>
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

export default AddModal;