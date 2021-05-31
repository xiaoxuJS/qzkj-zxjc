import React, { useState, useCallback, useEffect } from 'react';
import {
    getDmmParamFindParam,
    getDmmDeviceEchoDevice,
    postDmmDeviceUpdateDevice
} from '../../../../../api/equipmentUrl';
import {
    message,
    Modal,
    Form,
    Input,
    Select,
    Space
} from 'antd';

const ChangeEquipment = ({ changeModal, setChangeModal, clickId, deviceCode, setDeviceCode }) => {
    const [form] = Form.useForm();
    const { validateFields, resetFields, setFieldsValue } = form;
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
    const deviceCodeFun = useCallback(
        () => {
            if(deviceCode) {
                ;(async () => {
                    const {code , msg, data} = await getDmmDeviceEchoDevice({deviceCode});
                    if(code === '20000') {
                        let arr = [];
                        data.params.forEach(item => {
                            arr.push({
                                id: item.id,
                                paramName: item.paramName
                            })
                            delete item.paramName;
                            delete item.paramCode;
                        });
                        setParamesList(arr);
                        
                        setFieldsValue(data)
                    }else{
                        message.error(msg);
                    }
                })();
            }
        },
        [deviceCode, setFieldsValue],
    )
    useEffect(() => {
        paramesFun();
        deviceCodeFun();
    }, [ paramesFun, deviceCodeFun])
    const handleOk = () => {
        validateFields().then(values => {
            console.log(values)
            values.id = clickId;
            ;(async () => {
                const {code, msg} = await postDmmDeviceUpdateDevice(values);
                if(code === '20000') {
                    resetFields();
                    setDeviceCode(null);
                    message.success('修改成功')
                    setChangeModal(false);
                }else{
                    message.error(msg);
                }
            })();
        })

    };

    const handleCancel = () => {
        setDeviceCode(null);
        setChangeModal(false);
    };
    return <Modal title="修改设备" visible={changeModal} onOk={handleOk} onCancel={handleCancel} width='800px'>
        <Form
            {...layout}
            name="basic"
            initialValues={{ remember: true }}
            form={form}
        >
            <Form.Item
                label="设备名称"
                name="deviceName"
                rules={[{ required: true, message: '请输入设备名称!' }]}
            >
                <Input />
            </Form.Item>
            <Form.List name="params">
                {(fields, { add, remove }) => (
                    <>
                        {fields.map(field => (
                            <Space key={field.key} align="baseline">
                                <Form.Item
                                    {...field}
                                    label="参数"
                                    name={[field.name, 'id']}
                                    fieldKey={[field.fieldKey, 'id']}
                                    rules={[{ required: true, message: '请选择参数!' }]}
                                >
                                    <Select style={{ width: 130 }}>
                                        {
                                            paramesList.map(item => (
                                                <Select.Option key={item.id} value={item.id} disabled>
                                                    {item.paramName}
                                                </Select.Option>
                                            ))
                                        }
                                    </Select>
                                </Form.Item>
                                <Form.Item
                                    {...field}
                                    label="上限"
                                    name={[field.name, 'upperLimit']}
                                    fieldKey={[field.fieldKey, 'upperLimit']}
                                    rules={[{ required: true, message: '请输入上限值!' }]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    {...field}
                                    label="下限"
                                    name={[field.name, 'lowerLimit']}
                                    fieldKey={[field.fieldKey, 'lowerLimit']}
                                    rules={[{ required: true, message: '请输入下限值!' }]}
                                >
                                    <Input />
                                </Form.Item>

                                {/* <MinusCircleOutlined onClick={() => remove(field.name)} /> */}
                            </Space>
                        ))}

                        {/* <Form.Item style={{ justifyContent: 'center' }}>
                            <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                添加参数
                            </Button>
                        </Form.Item> */}
                    </>
                )}
            </Form.List>
        </Form>
    </Modal>
}
const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
};

export default ChangeEquipment;