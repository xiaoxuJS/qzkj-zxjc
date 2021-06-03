import React, { useEffect, useCallback, useState } from 'react';
import {
    getcpCompanyFindCoordinate,
    putcpCompanyInsertCompany
} from '../../../../../api/companyUrl';
import {
    fileUrl
} from '../../../../../api/fileUrl'
import {
    message,
    Modal,
    Form,
    Input,
    Cascader,
    Upload
} from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

const CompanyAddModal = ({ companyAddModalShow, setCompanyAddModalShow, companyListFun }) => {
    const [form] = Form.useForm();
    const { validateFields, resetFields } = form;
    const [cityList, setCityList] = useState([]);
    const [imageUrl, setImageUrl] = useState(null);
    const [loading, setLoading] = useState(false);
    const cityListFun = useCallback(
        () => {
            ; (async () => {
                const { code, msg, data } = await getcpCompanyFindCoordinate();
                if (code === '20000') {
                    let cityData = [];
                    arrChange(data, cityData);
                    setCityList(cityData);
                } else {
                    message.error(msg);
                }
            })();
        },
        [],
    )
    useEffect(() => {
        cityListFun();
    }, [cityListFun]);
    //数据处理
    const arrChange = (data, cityData) => {
        //数据不支持递归
        // for (let index = 0; index < data.length; index++) {
        //     cityData[index] = {
        //         value:data[index].province,
        //         label:data[index].province
        //     }
        //     if(data[index].cityDTOS && data[index].cityDTOS.length > 0) {
        //         cityData[index].children = data[index].cityDTOS;
        //         arrChange(data[index].cityDTOS, cityData[index].children)
        //     }
        // }
        data.forEach((item, index) => {
            cityData[index] = {
                value: item.province,
                label: item.province,
                children: []
            }
            if (item.cityDTOS && item.cityDTOS.length > 0) {
                item.cityDTOS.forEach((element, key) => {
                    cityData[index].children[key] = {
                        value: element.id,
                        label: element.city
                    }
                });
            }
        });
    };
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
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, imageUrl => {
                setImageUrl(imageUrl)
                setLoading(false)
            }
            );
        }
    };
    //确定提交
    const handleOk = () => {
        validateFields().then((values) => {
            if(values.log) {
                values.log = values.log.file.response.data
            }
            values.coordinate = values.coordinate[values.coordinate.length - 1]
            ;(async () => {
                const {code , msg} = await putcpCompanyInsertCompany(values);
                if(code === '20000') {
                    setImageUrl(null);
                    if(companyListFun) {
                        companyListFun()
                    }
                    resetFields();
                    setCompanyAddModalShow(false);
                }else{
                    message.error(msg);
                }
            })()
        })
        // 
    };

    const handleCancel = () => {
        setImageUrl(null)
        resetFields();
        setCompanyAddModalShow(false);
    };
    return <Modal title="企业添加" visible={companyAddModalShow} onOk={handleOk} onCancel={handleCancel}>
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
                label="所在城市"
                name="coordinate"
                rules={[{ required: true, message: '请选择企业所在城市!' }]}
            >
                <Cascader options={cityList} placeholder="请选择城市！" />
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

export default CompanyAddModal;