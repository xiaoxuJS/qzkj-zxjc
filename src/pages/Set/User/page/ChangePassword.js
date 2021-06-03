import React, { useState, useEffect } from 'react';
import {
    useHistory
} from 'react-router-dom'
import {
    getSysGetCode
} from '../../../../api/userUrl';
import {
    postSysUserUpdPwd
} from '../../../../api/setUrl'
import { ChangePhoneAll, ChangePhoneForm } from '../style';
import {
    PageHeader,
    Form,
    Input,
    Button,
    Row,
    message,
    Col,
    Card
} from 'antd'

const ChangePassword = () => {
    const history = new useHistory();
    const [form] = Form.useForm();
    const { resetFields } = form;
    const [authCode, setAuthCode] = useState(true);
    const [timeValue, setTimeValue] = useState(2);
    const [mobile, setMobile] = useState(null) //电话号码
    const [identification, setIdentification] = useState(null); //验证码标识
    const [statusChange, setStatusChange] = useState(true); //true 密码 false 是手机号
    useEffect(() => {
        setMobile(sessionStorage.getItem('phone'));
    }, [])
    const onFinish = (values) => {
        if(values.newPwd !== values.newPwdOk) {
            message.error('新密码两次输入不一致！')
            return;
        }
        values.id = sessionStorage.getItem('userId');
        delete values.newPwdOk;
        if(!statusChange) {
            values.mark = identification;
            values.phone = mobile;
        }
        ; (async () => {
            const { code, msg } = await postSysUserUpdPwd(values);
            if (code === '20000') {
                resetFields();
                setAuthCode(true);
                message.success('修改成功!');
                localStorage.removeItem('token');
                history.push('/login');
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
    // 修改密码方式
    const handleStatusChange = () => {
        setStatusChange(!statusChange)
    }
    return <ChangePhoneAll>
        <PageHeader
            className="site-page-header"
            title="修改密码"
        ></PageHeader>
        <ChangePhoneForm>
            <Card title={statusChange ? "使用旧密码修改密码" : '使用手机号修改密码'} extra={<Button type='link' onClick = {()=> handleStatusChange()}>{ statusChange ? "忘记密码 ": "密码修改"}</Button>} style={{ width: 500 }}>
                {
                    statusChange ? <Form
                        {...layout}
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        form={form}
                    >
                        <Form.Item
                            label="旧密码"
                            name="oldPwd"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入旧密码',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="新密码"
                            name="newPwd"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入新密码!',
                                },
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>
                        <Form.Item
                            label="新密码确认"
                            name="newPwdOk"
                            rules={[
                                {
                                    required: true,
                                    message: '请确认新密码!',
                                },
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item {...tailLayout}>
                            <Button type="primary" htmlType="submit">
                                修改
                            </Button>
                        </Form.Item>
                    </Form> : <Form
                        {...layout}
                        name="basic"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        form={form}
                    >
                        <Form.Item
                            label="新手机号"
                        >
                            {mobile}
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
                        <Form.Item
                            label="新密码"
                            name="newPwd"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入新密码!',
                                },
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>
                        <Form.Item
                            label="确认新密码"
                            name="newPwdOk"
                            rules={[
                                {
                                    required: true,
                                    message: '请确认输入新密码!',
                                },
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item {...tailLayout}>
                            <Button type="primary" htmlType="submit">
                                修改
                    </Button>
                        </Form.Item>
                    </Form>
                }
            </Card>

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

export default ChangePassword;