import React, { useState, useEffect, useCallback } from 'react';
import {
    fileUrl
} from '../../../../../api/fileUrl';
import {
    getSysUserUpdMaterial,
    postSysUserUpdMaterial
} from '../../../../../api/setUrl';
import {
    Input,
    Form,
    Upload,
    Modal,
    message,
    Radio,
} from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

const ChangeMoadl = ({ changeShow, clickId, userList, setChangeShow, clickChangeID, setClickChangeID }) => {
    const [form] = Form.useForm();
    const { validateFields, resetFields, setFieldsValue } = form;
    const [imageUrl, setImageUrl] = useState(null);
    const [loading, setLoading] = useState(false);
    const userDataFun = useCallback(
        () => {
            if(clickChangeID) {
                ;(async () => {
                    const {code, msg, data} = await getSysUserUpdMaterial({id: clickChangeID});
                    if(code === '20000') {
                        setImageUrl(data.headImg);
                        setFieldsValue(data);
                    }else{  
                        message.error(msg);
                    }
                })();
            }

        },
        [setFieldsValue, clickChangeID],
    )
    useEffect(() => {
        userDataFun();
    }, [userDataFun])
    const handleChange = info => {
        if (info.file.status === 'uploading') {
            setLoading(true)
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, imageUrl => {
                setImageUrl(imageUrl)
                setLoading(false)
            }
            );
        }
    };
    const getBase64 = (img, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }
    //上传处理
    const beforeUpload = (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }
        return isJpgOrPng && isLt2M;
    }
    //确定提交
    const handleOk = () => {
        validateFields().then(values => {
            if (values.headImg) {
                values.headImg = imageUrl
            }
            values.id = clickChangeID;
            values.department = clickId;
            ; (async () => {
                const { code, msg } = await postSysUserUpdMaterial(values);
                if (code === '20000') {
                    message.success('修改成功！')
                    resetFields();
                    userList(clickId);
                    setClickChangeID(null);
                    setChangeShow(false);
                } else {
                    message.error(msg);
                }
            })();
        })
    };
    const handleCancel = () => {
        resetFields();
        setClickChangeID(null);
        setChangeShow(false);
    };

    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );
    return <Modal title="用户修改" visible={changeShow} onOk={handleOk} onCancel={handleCancel}>
        <Form
            {...layout}
            name="basic"
            initialValues={{ remember: true }}
            form={form}
        >
            <Form.Item
                label="头像"
                name="headImg"
            >
                <Upload
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    action={fileUrl()}
                    beforeUpload={beforeUpload}
                    headers={
                        { authentication: localStorage.getItem("token") }
                    }
                    onChange={handleChange}
                    data={{ folder: '/head' }}
                >
                    {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                </Upload>
            </Form.Item>
            <Form.Item
                label="用户名"
                name="username"
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="工号"
                name="jobNumber"
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="姓名"
                name="name"
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="邮箱"
                name="email"
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="性别"
                name="gender"
            >
                <Radio.Group>
                    <Radio value={0}>女</Radio>
                    <Radio value={1}>男</Radio>
                </Radio.Group>
            </Form.Item>
            <Form.Item
                label="年龄"
                name="age"
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="是否开启通知"
                name="isInform"
            >
                <Radio.Group>
                    <Radio value={0}>开启</Radio>
                    <Radio value={1}>关闭</Radio>
                </Radio.Group>
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

export default ChangeMoadl;