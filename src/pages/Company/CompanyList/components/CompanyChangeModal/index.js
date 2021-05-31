import React, { useEffect, useCallback, useState } from 'react';
import {
    getcpCompanyFindCompany,
    postcpCompanyUpdateCompany
} from '../../../../../api/companyUrl';
import {
    fileUrl
} from '../../../../../api/fileUrl'
import {
    message,
    Modal,
    Form,
    Input,
    Upload
} from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

const CompanyChangeModal = ({ companyChangeModalShow, setCompanyChangeModalShow, companyListFun, clickData, setClickData }) => {
    const [form] = Form.useForm();
    const { validateFields, resetFields, setFieldsValue } = form;
    const [imageUrl, setImageUrl] = useState(null);
    const [loading, setLoading] = useState(false);
    const companyDetailsFun = useCallback(
        () => {
            if(clickData) {
                ;(async () => {
                    const {code, msg, data} = await getcpCompanyFindCompany({companyId:clickData });
                    if(code === '20000') {
                        console.log(data);
                        const logUrl = data.log;
                        delete data.log;
                        console.log(data)
                        setFieldsValue(data);
                        setImageUrl(logUrl);
                    }else{
                        message.error(msg);
                    }
                })();
            }

        },
        [clickData, setFieldsValue],
    )
    useEffect(() => {
        companyDetailsFun();
    }, [companyDetailsFun]);
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
    const getBase64  = (img, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
      }
    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );
    const handleChange = info => {
        if (info.file.status === 'uploading') {
            setLoading(true)
            return;
        }
        if (info.file.status === 'done') {
            console.log(info.file)
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, () => {
                setImageUrl(info.file.response.data)
                setLoading(false)
            }
            );
        }
    };
    //信息更新确认
    const handleOk = () => {
        validateFields().then((values) => {
            console.log(values)
            if(values.log) {
                values.log = imageUrl
            }
            values.id = clickData;
            console.log(values)
            ;(async () => {
                const {code , msg} = await postcpCompanyUpdateCompany(values);
                if(code === '20000') {
                    setImageUrl(null);
                    companyListFun();
                    resetFields();
                    setClickData(null);
                    setCompanyChangeModalShow(false);
                }else{
                    message.error(msg);
                }
            })()
        })
    };

    const handleCancel = () => {
        setImageUrl(null)
        resetFields();
        setCompanyChangeModalShow(false);
    };
    return <Modal title="企业信息修改" visible={companyChangeModalShow} onOk={handleOk} onCancel={handleCancel}>
        <Form
            {...layout}
            name="basic"
            initialValues={{ remember: true }}
            form={form}
        >
            <Form.Item
                label="log"
                name="log"
            >
                <Upload
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    action={fileUrl()}
                    beforeUpload={beforeUpload}
                    headers = {
                        {authentication:localStorage.getItem("token")}
                    }
                    onChange={handleChange}
                    data={{ folder: '/head' }}
                >
                    {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                </Upload>
            </Form.Item>
            <Form.Item
                label="企业代码"
                name="companyCode"
                rules={[{ required: true, message: '请输入企业代码!' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="企业名称"
                name="companyName"
                rules={[{ required: true, message: '请输入企业名称!' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="企业详细地址"
                name="site"
                rules={[{ required: true, message: '请输入企业详细地址' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="企业经营范围"
                name="manageScope"
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="企业简介"
                name="synopsis"
            >
                <Input />
            </Form.Item>
        </Form>
    </Modal>
}

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};

export default CompanyChangeModal;