import React, { useState, useCallback, useEffect } from 'react';
import {
    getDmmParamFindParam,
    postDmmDeviceAddParam
} from '../../../../../api/equipmentUrl'
import {
    Modal,
    message,
    Form,
    Input,
    Select
} from 'antd'

const AddParameter = ({ addParameterModal, setAddParameterModal, deviceCode, setDeviceCode }) => {
    const [form] = Form.useForm();
    const { validateFields, resetFields } = form;
    const [paramesList, setParamesList] = useState([]); //参数
    const paramesFun = useCallback(
        () => {
            ; (async () => {
                const { code, msg, data } = await getDmmParamFindParam();
                if (code === '20000') {
                    setParamesList(data);
                } else {
                    message.error(msg);
                }
            })()
        },
        [],
    )
    useEffect(() => {
        paramesFun();
    }, [paramesFun])
    const handleOk = () => {
        validateFields().then(values => {
            const parames = {
                deviceCode: deviceCode,
                params: [values]
            }
            ; (async () => {
                const { code, msg } = await postDmmDeviceAddParam(parames);
                if (code === '20000') {
                    message.success('添加参数成功！')
                    resetFields();
                    setDeviceCode(null);
                    setAddParameterModal(false);
                } else {
                    message.error(msg);
                }
            })()
        })

    };

    const handleCancel = () => {
        resetFields();
        setAddParameterModal(false);
    };
    return <Modal title="添加参数" visible={addParameterModal} onOk={handleOk} onCancel={handleCancel}>
        <Form
            {...layout}
            initialValues={{ remember: true }}
            form={form}
        >
            <Form.Item
                label="参数"
                name="param"
                rules={[{ required: true, message: '请选择参数!' }]}
            >
                <Select>
                    {
                        paramesList.map(item => (
                            <Select.Option key={item.id} value={item.id}>
                                {item.paramName}
                            </Select.Option>
                        ))
                    }
                </Select>
            </Form.Item>

            <Form.Item
                label="上限"
                name="upperLimit"
                rules={[{ required: true, message: '请输入上限值!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="下限"
                name="lowerLimit"
                rules={[{ required: true, message: '请输入下限值!' }]}
            >
                <Input />
            </Form.Item>
        </Form>
    </Modal>
}
const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
};

export default AddParameter;