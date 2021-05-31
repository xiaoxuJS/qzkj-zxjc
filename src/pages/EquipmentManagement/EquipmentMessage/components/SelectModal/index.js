import React from 'react';
import {
    Form,
    Row,
    Col,
    Select,
    Input,
    Button,
    Space
} from 'antd';

const {Option} = Select

const SelectModal = ({listFun}) => {
    const [form] = Form.useForm();
    const { resetFields } = form;
    const onFinish = (values) => {
        values.currentPage = 1 ;
        values.pageSize = 10 ;
        listFun(values);
    };
    //设备状态数据
    // online在线，offline离线，maintain维护，stop停用
    const deviceStatusData = [
        {
            value: 'online',
            label: '在线'
        },
        {
            value: 'offline',
            label: '离线'
        },
        {
            value: 'maintain',
            label: '维护'
        },
        {
            value: 'stop',
            label: '停用'
        },
    ]
    //重置
    const handleReset = () => {
        resetFields();
        listFun();
    }
    return <Form
        {...layout}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        form={form}
    >
        <Row>
            <Col span={8}>
                <Form.Item name="deviceStatus" label="设备状态" hasFeedback>
                    <Select placeholder="设备状态">
                        {
                            deviceStatusData.map(item => {
                                return <Option key={item.value} value={item.value}>
                                    {item.label}
                                </Option>
                            })
                        }

                    </Select>
                </Form.Item>
            </Col>
            <Col span={8}>
                <Form.Item name="model" label="设备型号">
                    <Input />
                </Form.Item>
            </Col>
            <Col span={8}>
                <Form.Item name="company" label="所属企业">
                    <Input />
                </Form.Item>
            </Col>
            <Col span={18}>
            </Col>

            <Col span={6}>
                <Row>
                    <Col span={10}></Col>
                    <Col span={10}>
                        <Form.Item {...tailLayout}>
                            <Space>
                                <Button onClick={handleReset}>重置</Button>
                                <Button type="primary" htmlType="submit">
                                    确定
                            </Button>
                            </Space>

                        </Form.Item>
                    </Col>
                </Row>
            </Col>
        </Row>

    </Form>
}
const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

export default SelectModal;