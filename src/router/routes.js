import React from "react";
//工作台
import Workbench from '../pages/Workbench';
//组织机构
import CompanyList from '../pages/Company/CompanyList';
//企业详情
import CompanyDetails from '../pages/Company/CompanyDetails';
//设备管理-设备信息
import EquipmentMessage from '../pages/EquipmentManagement/EquipmentMessage';
//设备管理-型号管理
import ModelManagement from '../pages/EquipmentManagement/ModelManagement';
//设备管理-设备详情
import EquipmentMessageDetails from '../pages/EquipmentManagement/EquipmentMessageDetails';
//设置 - 权限管理
import Confine from '../pages/Set/Confine';
//设置 - 岗位管理
import PostManagement from '../pages/Set/PostManagement';
//设置 - 用户管理-list
import User from '../pages/Set/User';
import ChangePhone from '../pages/Set/User/page/ChangePhone';
import ChangePassword from '../pages/Set/User/page/ChangePassword';
//设置 - 用户详情
import UserDetails from '../pages/Set/UserDetails';


//导航
const menuRouter = [
    {
        key: 'workbench',
        meta: {
            title: "工作台",
            icon: <span className="anticon anticon-appstore">
                <span className="icon iconfont icon-dingdan"></span>
            </span>,
        },
        path: "/",
        component: Workbench,
    },
    {
        key: 'Company-list',
        meta: {
            title: "组织机构",
            icon: <span className="anticon anticon-appstore">
                <span className="icon iconfont icon-dingdan"></span>
            </span>,
        },
        path: "/Company/list",
        component: CompanyList,
    },
    {
        key: 'equipment-Management',
        meta: {
            title: "设备管理",
            icon: <span className="anticon anticon-appstore">
                <span className="icon iconfont icon-dingdan"></span>
            </span>,
        },
        path: "/equipment/message",
        component: EquipmentMessage,
        page: [
            {
                key: 'equipment-message',
                meta: {
                    title: '设备信息'
                },
                path: "/equipment/message",
                component: EquipmentMessage,
            },
            {
                key: 'model-management',
                meta: {
                    title: '型号管理'
                },
                path: "/model/management",
                component: ModelManagement,
            }
        ]
    },
    {
        key: 'system-set',
        meta: {
            title: "系统设置",
            icon: <span className="anticon anticon-appstore">
                <span className="icon iconfont icon-dingdan"></span>
            </span>,
        },
        path: "/confine",
        component: Confine,
        page: [
            {
                key: 'confine',
                meta: {
                    title: '权限管理'
                },
                path: "/confine",
                component: Confine,
            },
            {
                key: 'post-management',
                meta: {
                    title: '岗位管理'
                },
                path: "/post/management",
                component: PostManagement,
            },
            {
                key: 'user',
                meta: {
                    title: '用户管理'
                },
                path: "/user/list",
                component: User,
                page: [
                    {
                        key: 'user-list',
                        meta: {
                            title: '用户列表'
                        },
                        path: "/user/list",
                        component: User,
                    },
                    {
                        key: 'change-phone',
                        meta: {
                            title: '修改手机'
                        },
                        path: "/change/phone",
                        component: ChangePhone,
                    },
                    {
                        key: 'change/password',
                        meta: {
                            title: '修改密码'
                        },
                        path: "/change/password",
                        component: ChangePassword,
                    },
                ]
            },
        ]
    },
    // {
    //     key: 'send-car',
    //     meta: {
    //         title: "派车单信息",
    //         icon: <span className="anticon anticon-appstore">
    //             <span className="icon iconfont icon-yipaiche"></span>
    //         </span>,
    //     },
    //     path: "/sendCar/await",
    //     component: SendCarAwait,
    //     page: [
    //         {
    //             key: 'send-car-await',
    //             meta: {
    //                 title: "待签到",
    //                 icon: <DatabaseOutlined />,
    //             },
    //             path: "/sendCar/await",
    //             component: SendCarAwait,
    //         },
    //         {
    //             key: 'send-car-await-loading',
    //             meta: {
    //                 title: "待装载",
    //                 icon: <DatabaseOutlined />,
    //             },
    //             path: "/sendCar/awaitLoading",
    //             component: SendCarAwaitLoading,
    //         },
    //         {
    //             key: 'send-car-loading',
    //             meta: {
    //                 title: "装载中",
    //                 icon: <DatabaseOutlined />,
    //             },
    //             path: "/sendCar/loading",
    //             component: SendCarLoading,
    //         },
    //         {
    //             key: 'send-car-over',
    //             meta: {
    //                 title: "装载完成",
    //                 icon: <DatabaseOutlined />,
    //             },
    //             path: "/sendCar/over",
    //             component: SendCarOver,
    //         }
    //     ],
    // },

];

//对导航栏进行数据处理
const dataDispose = (data, newArray) => {
    data.forEach((element) => {
        if (element.hasOwnProperty('page')) {
            dataDispose(element.page, newArray)
            // .forEach((item) => {
            //     dataV.push(item);
            // });
            // newArray = [...newArray, ...dataV];
        } else {
            newArray.push(element);
        }
    });
    return newArray;
};
let newArray = []
let menuRouterData = dataDispose(menuRouter, newArray);

const userRouter = [
    ...menuRouterData,
    {
        path: '/company/details',
        component: CompanyDetails
    },
    {
        path: '/equipmentMessage/details',
        component: EquipmentMessageDetails
    },
    {
        path: '/user/details',
        component: UserDetails
    }
];
export { menuRouter, userRouter, };
