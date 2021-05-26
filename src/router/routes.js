import React from "react";
//工作台
import Workbench from '../pages/Workbench';
//组织机构
import Company from '../pages/Company'


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
        key: 'company',
        meta: {
            title: "组织机构",
            icon: <span className="anticon anticon-appstore">
                <span className="icon iconfont icon-dingdan"></span>
            </span>,
        },
        path: "/company",
        component: Company,
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
const dataDispose = (data) => {
    let newArray = [];
    data.forEach((element) => {
        let dataV = [];
        if (element.hasOwnProperty('page')) {
            element.page.forEach((item) => {
                dataV.push(item);
            });
            newArray = [...newArray, ...dataV];
        } else {
            newArray.push(element);
        }
    });
    return newArray;
};

let menuRouterData = dataDispose(menuRouter);

const userRouter = [
    ...menuRouterData,
    // {
    //     path: '/stock/bin/details',
    //     component: StockBinDetails
    // }
];
export { menuRouter, userRouter, };
