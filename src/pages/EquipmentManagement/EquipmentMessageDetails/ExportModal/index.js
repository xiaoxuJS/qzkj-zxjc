import React from 'react';
import {
    ip
} from '../../../../api/http'
import {
    Modal,
    Form,
    Select
} from 'antd';
const { Option } = Select;

const ExportModal = ({ exportModalShow, setExportModalShow, id }) => {
    const [form] = Form.useForm();
    const { validateFields, resetFields } = form;

    const handleOk = () => {
        validateFields().then(values => {
            let downloadElement = document.createElement("a");
            downloadElement.href = `${ip}dmmLog/list/export?deviceId=${id}`;
            
            if(values.isAlarm) {
                downloadElement.href += `&isAlarm=${values.isAlarm}`
            }
            if(values.scope) {
                downloadElement.href += `&scope=${values.scope}`
            }
            document.body.appendChild(downloadElement);
            downloadElement.click();
            document.body.removeChild(downloadElement);
            window.URL.revokeObjectURL(downloadElement);
            resetFields();
            setExportModalShow(false);
        })
       
    };

    const handleCancel = () => {
        resetFields();
        setExportModalShow(false);
    };
    return <Modal title="导出日志" visible={exportModalShow} onOk={handleOk} onCancel={handleCancel}>
        <Form
            {...layout}
            initialValues={{ remember: true }}
            form={form}
        >
            <Form.Item
                label="统筹"
                name="isAlarm"
            >
                <Select >
                <Option value='0'>正常日志</Option>
                <Option value='1'>报警日志</Option>
                </Select>
            </Form.Item>
            <Form.Item
                label="范围"
                name="scope"
            >
                <Select >
                <Option value='0'>当天</Option>
                <Option value='1'>本周</Option>
                <Option value='2'>本月</Option>
                </Select>
            </Form.Item>
        </Form>
    </Modal>
}
const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

export default ExportModal