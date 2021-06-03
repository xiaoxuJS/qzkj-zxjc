import React, { useState, useCallback, useEffect } from 'react';
import {
    getCpCompanyLikeCompany,
    getDmmModelFindDmmModel,
    getDmmParamFindParam,
    putDmmDeviceInsertDevice
} from '../../../../../api/equipmentUrl'
import {
    message,
    Modal,
    Form,
    Input,
    InputNumber,
    Select,
    DatePicker,
    Space,
    Button
} from 'antd';

import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

const AddEquipment = ({ addModal, setAddModal, listFun }) => {
    const [form] = Form.useForm();
    const { validateFields, resetFields } = form;
    const [companyList, setCompanyList] = useState([]); //企业下拉
    const [modelList, setModelList] = useState([]); // 型号下拉
    const [paramesList, setParamesList] = useState([]); //参数
    const companyFun = useCallback(
        () => {
            ; (async () => {
                const { code, msg, data } = await getCpCompanyLikeCompany();
                if (code === '20000') {
                    setCompanyList(data);
                } else {
                    message.error(msg);
                }
            })()
        },
        [],
    )
    const modelFun = useCallback(
        () => {
            ; (async () => {
                const { code, msg, data } = await getDmmModelFindDmmModel();
                if (code === '20000') {
                    setModelList(data);
                } else {
                    message.error(msg);
                }
            })()
        },
        [],
    )
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
        companyFun();
        modelFun();
        paramesFun();
    }, [companyFun, modelFun, paramesFun])
    const handleOk = () => {
        validateFields().then(values => {
            ;(async () => {
                const {code, msg} = await putDmmDeviceInsertDevice(values);
                if(code === '20000') {
                    if(listFun) {
                        listFun();
                    }
                    resetFields();
                    message.success('添加成功')
                    setAddModal(false);
                }else{
                    message.error(msg);
                }
            })();
        })

    };

    const handleCancel = () => {
        setAddModal(false);
    };
    return <Modal title="添加设备" visible={addModal} onOk={handleOk} onCancel={handleCancel} width='800px'>
        <Form
            {...layout}
            name="basic"
            initialValues={{ remember: true }}
            form={form}
        >
            <Form.Item
                label="企业"
                name="company"
                rules={[{ required: true, message: '请选择企业!' }]}
            >
                <Select>
                    {
                        companyList.map(item => {
                            return <Select.Option key={item.id} value={item.id}>{item.companyName}</Select.Option>
                        })
                    }

                </Select>
            </Form.Item>
            <Form.Item
                label="开通天数"
                name="days"
                rules={[{ required: true, message: '请输入开通天数!' }]}
            >
                <InputNumber />
            </Form.Item>
            <Form.Item
                label="设备编号"
                name="deviceCode"
                rules={[{ required: true, message: '请输入设备编号!' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="设备名称"
                name="deviceName"
                rules={[{ required: true, message: '请输入设备名称!' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="设备型号"
                name="model"
                rules={[{ required: true, message: '请输入设备名称!' }]}
            >
                <Select>
                    {
                        modelList.map(item => {
                            return <Select.Option key={item.id} value={item.id}>{item.model}</Select.Option>
                        })
                    }

                </Select>
            </Form.Item>
            <Form.Item
                label="出场日期"
                name="productionDate"
                rules={[{ required: true, message: '请选择出场日期!' }]}
            >
                <DatePicker />
            </Form.Item>
            <Form.List name="params">
                {(fields, { add, remove }) => (
                    <>
                        {fields.map(field => (
                            <Space key={field.key} align="baseline">
                                <Form.Item
                                    {...field}
                                    label="参数"
                                    name={[field.name, 'param']}
                                    fieldKey={[field.fieldKey, 'param']}
                                    rules={[{ required: true, message: '请选择参数!' }]}
                                >
                                    <Select style={{ width: 130 }}>
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

                                <MinusCircleOutlined onClick={() => remove(field.name)} />
                            </Space>
                        ))}

                        <Form.Item style={{ justifyContent: 'center' }}>
                            <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                添加参数
                            </Button>
                        </Form.Item>
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

export default AddEquipment;