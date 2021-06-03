import React, {useState, useEffect, useCallback} from 'react';
import {
    getSysUserUserList
} from '../../../../api/setUrl';
import {
    postDmmDeviceBindDevUser
} from '../../../../api/equipmentUrl'
import {
    Modal,
    Select,
    Form,
    message
} from 'antd';
const { Option } = Select;

const AddModal = ({ addModalShow, setAddModalShow, deviceId, administratorFun }) => {
    const [form] = Form.useForm();
    const {validateFields, resetFields	} = form;
    const [selectList, setSelectList] = useState([]);
    const selectFun = useCallback(
        () => {
            ;(async () => {
                const {code , msg, data} = await getSysUserUserList();
                if(code === '20000') {
                    setSelectList(data)
                } else{
                    message.error(msg);
                }
            })();
        },
        [],
    )
    useEffect(() => {
        selectFun();
    }, [selectFun])
    const handleOk = () => {
        validateFields().then(values => {
            console.log(values)
            values.device = deviceId;
            ;(async () => {
                const {code, msg} = await postDmmDeviceBindDevUser(values);
                if(code === '20000') {
                    resetFields();
                    message.success('绑定成功');
                    administratorFun();
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
    return <Modal title="添加设备管理员" visible={addModalShow} onOk={handleOk} onCancel={handleCancel}>
        <Form
            {...layout}
            initialValues={{ remember: true }}
            form = {form}
        >
            <Form.Item
                label="管理员"
                name="userId"
                rules={[{ required: true, message: '请选择管理员!' }]}
            >
                <Select>
                    {
                        selectList.map(item => <Option value= {item.id}>{item.name}</Option>)
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

export default AddModal;