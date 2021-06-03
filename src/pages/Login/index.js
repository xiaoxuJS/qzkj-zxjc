import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import {
    postSysUserlogin,
    getSysGetCode
} from '../../api/userUrl'
import {
    LoginAll,
    LoginBox
} from './style'
//antd
import { Button, Form, Input, Card, message, Row, Col } from 'antd';


const Login = () => {
    const history = new useHistory();
    const [loginType, setLoginType] = useState(true);
    const [authCode, setAuthCode] = useState(true);
    const [timeValue, setTimeValue] = useState(2);
    const [mobile, setMobile] = useState(null) //电话号码
    const [identification, setIdentification] = useState(null); //验证码标识
    useEffect(() => {
        setIdentification(null);
    }, [])
    const handleEnterPage = (values) => {
        localStorage.removeItem('token');
        if(identification) {
            values.mark = identification
        }
        ; (async () => {
            const { code, msg, data } = await postSysUserlogin(values);
            if (code === '20000') {
                localStorage.setItem('token', data.token);
                sessionStorage.setItem('companyId', data.companyId);
                sessionStorage.setItem('userId', data.userId);
                sessionStorage.setItem('phone', data.phone);
                sessionStorage.setItem('leftKey', JSON.stringify(['workbench']));
                sessionStorage.setItem('head', data.head);
                // let userString = decodeURIComponent(escape(window.atob(data.split('.')[1])))
                // let user = JSON.parse(userString);
                // sessionStorage.setItem('userInfo', JSON.stringify(user));
                // sessionStorage.setItem('token', data);
                // localStorage.setItem('token', data);
                history.push('/');
            } else {
                message.error(msg)
            }
        })();

    };
    //登录类型
    const handleLoginType = (type) => {
        setIdentification(null);
        setLoginType(!type);
    }
    //发送验证码
    const handleAuthCodeFun = () => {
        
        if(!mobile) {
            message.error('请输入手机号');
            return;
        }
        setAuthCode(false);
        ;(async () => {
            const {code , msg, data} = await getSysGetCode({mobile});
            if(code === '20000') {
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
            }else{
                message.error(msg);
            }
        })();

        
    }
    return (
        <LoginAll>
            <LoginBox>
                <Card title="智能装车"
                    extra={<Button type='link' onClick={() => handleLoginType(loginType)}> {
                        loginType ? '手机号登录' : '账号登录'
                    } </Button>}
                    style={{ width: 450 }}
                >
                    {
                        loginType
                            ?
                            <Form
                                {...layout}
                                name="basic"
                                initialValues={{
                                    remember: true,
                                }}
                                onFinish={handleEnterPage}
                            >
                                <Form.Item
                                    label="账号"
                                    name="username"
                                    rules={[
                                        {
                                            required: true,
                                            message: '请输入账号!',
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item
                                    label="密码"
                                    name="password"
                                    rules={[
                                        {
                                            required: true,
                                            message: '请输入密码!',
                                        },
                                    ]}
                                >
                                    <Input.Password />
                                </Form.Item>
                                <Form.Item {...tailLayout}>
                                    <Button type="primary" htmlType="submit">
                                        登录
                                </Button>
                                </Form.Item>
                            </Form>
                            :
                            <Form
                                {...layout}
                                name="basic"
                                initialValues={{
                                    remember: true,
                                }}
                                onFinish={handleEnterPage}
                            >
                                <Form.Item
                                    label="手机号"
                                    name="phone"
                                    rules={[
                                        {
                                            required: true,
                                            message: '请输入手机号!',
                                        },
                                    ]}
                                >
                                    <Input value = {mobile} onChange = {(e) => setMobile(e.target.value)} />
                                </Form.Item>

                                <Form.Item
                                    label="验证码"
                                    name="code"
                                    rules={[
                                        {
                                            required: true,
                                            message: '请输入验证码!',
                                        },
                                    ]}
                                >
                                    <Row>
                                        <Col span={12}><Input /></Col>
                                        <Col span={1}></Col>
                                        <Col span={11}>
                                            {
                                                authCode ? <Button style = {{width: '100%'}} type="primary" onClick={() => handleAuthCodeFun()}>
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
                                        登录
                                </Button>
                                </Form.Item>
                            </Form>
                    }

                </Card>

            </LoginBox>
        </LoginAll>
    )
};
const layout = {
    labelCol: {
        span: 6,
    },
    wrapperCol: {
        span: 16,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16,
    },
};
export default Login;