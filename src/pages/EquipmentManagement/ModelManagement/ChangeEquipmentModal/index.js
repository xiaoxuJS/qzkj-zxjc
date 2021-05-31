import React, { useEffect, useCallback } from 'react';
import {
    postDmmModelUpdateDmmModel,
    getDmmModelFindEcho
} from '../../../../api/equipmentUrl'
import {
    Modal,
    Form,
    Input,
    message
} from 'antd';

const { TextArea } = Input;

const ChangeEquipmentModal = ({ changeModal, setChangeModal, listFun, clickID, setClickID }) => {
    const [form] = Form.useForm();
    const { validateFields, resetFields, setFieldsValue } = form;
    const handleOk = () => {
        validateFields().then(values => {
            values.id = clickID;
            ; (async () => {
                const { code, msg } = await postDmmModelUpdateDmmModel(values);
                if (code === '20000') {
                    resetFields();
                    listFun();
                    setClickID(null);
                    message.success('更新成功');
                    setChangeModal(false);
                } else {
                    message.error(msg);
                }
            })()

        })
    };
    const echoFun = useCallback(
        () => {
            if (clickID) {
                ; (async () => {
                    const { code, msg, data } = await getDmmModelFindEcho({ id: clickID });
                    if (code === '20000') {
                        setFieldsValue(data);
                    } else {
                        message.error(msg);
                    }
                })()
            }
        },
        [clickID, setFieldsValue],
    )
    useEffect(() => {
        echoFun()
    }, [echoFun])


    const handleCancel = () => {
        resetFields();
        setClickID(null);
        setChangeModal(false);
    };
    return <Modal title="修改型号" visible={changeModal} onOk={handleOk} onCancel={handleCancel}>
        <Form
            {...layout}
            name="basic"
            initialValues={{ remember: true }}
            form={form}
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

export default ChangeEquipmentModal;