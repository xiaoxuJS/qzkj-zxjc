import React,{ useState } from 'react';
import {
    getSysGetCode
} from '../../../../api/userUrl';
import {
    postSysUserUpdMobile
} from '../../../../api/setUrl'
import { ChangePhoneAll, ChangePhoneForm } from '../style';
import {
    PageHeader,
    Form,
    Input,
    Button,
    Row,
    message,
    Col
} from 'antd'

const ChangePhone = () => {
    const [form] = Form.useForm();
    const {resetFields} = form;
    const [authCode, setAuthCode] = useState(true);
    const [timeValue, setTimeValue] = useState(2);
    const [mobile, setMobile] = useState(null) //电话号码
    const [identification, setIdentification] = useState(null); //验证码标识
    const onFinish = (values) => {
        if(identification) {
            values.mark = identification
        }
        values.id = sessionStorage.getItem('userId');
        ; (async () => {
            const { code, msg } = await postSysUserUpdMobile(values);
            if (code === '20000') {
                resetFields();
                setAuthCode(true);
                message.success('修改成功!')
            } else {
                message.error(msg)
            }
        })();
    };
    //发送验证码
    const handleAuthCodeFun = () => {
        if (!mobile) {
            message.error('请输入手机号');
            return;
        }
        setAuthCode(false);
        ; (async () => {
            const { code, msg, data } = await getSysGetCode({ mobile });
            if (code === '20000') {
                setIdentification(data);
                let timer = setInterval(() => {
                    setTimeValue(timeValue => {
                        if (timeValue <= 0) {
                            clearInterval(timer);
                            setAuthCode(true);
                            setTimeValue(60);
                        } else {
                            return timeValue - 1
                        }

                    })
                }, 1000);
            } else {
                message.error(msg);
            }
        })();
    }
    return <ChangePhoneAll>
        <PageHeader
            className="site-page-header"
            title="修改手机"
        ></PageHeader>
        <ChangePhoneForm>
            <Form
                {...layout}
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                form = {form}
            >
                <Form.Item
                    label="新手机号"
                    name="phone"
                    rules={[
                        {
                            required: true,
                            message: '请输入新手机号!',
                        },
                    ]}
                >
                    <Input value={mobile} onChange={(e) => setMobile(e.target.value)} />
                </Form.Item>

                <Form.Item
                    label="验证码"
                    name="code"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                >
                    <Row>
                        <Col span={12}><Input /></Col>
                        <Col span={1}></Col>
                        <Col span={11}>
                            {
                                authCode ? <Button style={{ width: '100%' }} type="primary" onClick={() => handleAuthCodeFun()}>
                                    获取验证码
                                                    </Button> : <Button type="primary" disabled >
                                    {timeValue}s后重新发送
                                                    </Button>
                            }


                        </Col>
                    </Row>
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                        修改
                    </Button>
                </Form.Item>
            </Form>
        </ChangePhoneForm>

    </ChangePhoneAll>
}
const layout = {
    labelCol: {
        span: 6,
    },
    wrapperCol: {
        span: 18,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16,
    },
};

export default ChangePhone;