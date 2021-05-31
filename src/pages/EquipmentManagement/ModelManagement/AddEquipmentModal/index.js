import React from 'react';
import {
    putDmmModelInsertDmmModel
} from '../../../../api/equipmentUrl'
import {
    Modal,
    Form,
    Input,
    message
} from 'antd';

const { TextArea } = Input;

const AddEquipmentModal = ({ addModal, setAddModal, listFun }) => {
    const [form] = Form.useForm();
    const {validateFields, resetFields} = form;
    const handleOk = () => {
        validateFields().then(values => {
            ;(async () => {
                const {code, msg } = await putDmmModelInsertDmmModel(values);
                if(code === '20000') {
                    resetFields();
                    listFun();
                    setAddModal(false);
                }else{
                    message.error(msg);
                }
            })()
            
        })
    };

    const handleCancel = () => {
        resetFields();
        setAddModal(false);
    };
    return <Modal title="添加型号" visible={addModal} onOk={handleOk} onCancel={handleCancel}>
        <Form
            {...layout}
            name="basic"
            initialValues={{ remember: true }}
            form = {form}
        >
            <Form.Item
                label="型号名称"
                name="model"
                rules={[{ required: true, message: '请输入型号名称!' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="型号代码"
                name="modelCode"
                rules={[{ required: true, message: '请输入型号代码!' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="设备特点"
                name="features"
            >
                <TextArea rows={4} />
            </Form.Item>
        </Form>
    </Modal>
}
const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
  };

export default AddEquipmentModal;