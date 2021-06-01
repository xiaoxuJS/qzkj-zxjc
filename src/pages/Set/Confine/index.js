import React, { useState, useEffect, useCallback } from 'react';
import {
    getSysPermissionFindPermission,
    getSysPermissionEchoPermission
} from '../../../api/setUrl';
import AddModal from './components/AddModal';
import ChangeModal from './components/ChangeModal'
import {
    ConfineAll
} from './style';
import {
    PageHeader,
    Button,
    Row,
    Col,
    Tree,
    message,
} from 'antd'

const Confine = () => {
    const [listData, setListData] = useState(undefined);
    const [AddAndChange, setAddAndChange] = useState(true); // true 是添加 false 是修改
    const [addModalTop, setAddModalTop] = useState(true); // true 是顶层 false 不是顶层
    const [clickData, setClickData] = useState(null);
    const [selectedKeys, setSelectedKeys] = useState(null);
    //数据修改
    const arrChange = useCallback(
        (data) => {
            data.forEach(item => {
                item.title = item.mainMenu;
                item.key = item.id;
                if (item.tree.length > 0) {
                    item.children = item.tree;
                    arrChange(item.children)
                }
            });
        },
        [],
    )
    const listFun = useCallback(
        () => {
            ; (async () => {
                const { code, msg, data } = await getSysPermissionFindPermission();
                if (code === '20000') {

                    arrChange(data)
                    setListData(data)
                } else {
                    message.error(msg);
                }
            })()
        },
        [arrChange],
    )
    useEffect(() => {
        listFun();
    }, [listFun])
    const handleAddModalShow = () => {
        setAddAndChange(true);
        setAddModalTop(true);
    }
    //选中节点
    const handleSelectShu = (selectedKeys) => {
            ; (async () => {
                const { code, msg, data } = await getSysPermissionEchoPermission({ id: selectedKeys[0] });
                if (code === '20000') {
                    if (data.status) {
                        data.status = false;
                    } else {
                        data.status = true;
                    }
                    setClickData(data)
                } else {
                    message.error(msg);
                }
            })();
        setSelectedKeys(selectedKeys[0])
        setAddAndChange(false);
        setAddModalTop(false);
    }

    return <ConfineAll>
        <PageHeader
            className="site-page-header"
            title="权限管理"
            extra={[
                <Button
                    key="1"
                    type="primary"
                    onClick={() => handleAddModalShow()}
                >
                    添加权限
                </Button>,
            ]}
        ></PageHeader>
        <Row>
            <Col span={8}>
                {
                    listData ? <Tree
                        defaultExpandAll={true}
                        treeData={listData}
                        onSelect={handleSelectShu}
                    /> : null
                }

            </Col>
            <Col span={16}>
                <div className='border-div'>
                    {
                        AddAndChange
                            ?
                            <AddModal
                                addModalTop={addModalTop}
                                listFun={listFun}
                                selectedKeys={selectedKeys}
                            />
                            :
                            <ChangeModal
                                setAddAndChange={setAddAndChange}
                                setAddModalTop={setAddModalTop}
                                clickData={clickData}
                                selectedKeys={selectedKeys}
                                listFun={listFun}
                            />
                    }

                </div>

            </Col>
        </Row>
        {/* //Modal */}

    </ConfineAll>
}


export default Confine;