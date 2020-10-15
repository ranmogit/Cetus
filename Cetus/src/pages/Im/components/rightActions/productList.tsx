import React, { useEffect, useState } from 'react'
import { message, Modal, Table, Form, Row, Col, Input, Button } from 'antd'
import { getproductPageList, addRightMsgList,getproductUrl } from '@/services/im';
const ProductList = (props, { dispatch }) => {
    const {
        editVisible,
        closeHandler
    } = props
    
    const [form] = Form.useForm();
    const [PageList, setPageList] = useState([])
    const [pageParams, setPageParams] = useState({
        pageNo: 1,
        pageSize: 10,
        managerUserUCode: window.localStorage.getItem('userCode')
    })
    const [pageTotal, setPageTotal] = useState(null);
    const [selectedIds, setSelectedIds] = useState([])
    useEffect(() => {
        if (editVisible === true ) {
            setSelectedIds([])
            getPageList()
        }
    }, [editVisible,pageParams])
    const previewHref =(record)=>{
        console.log(record)
        getproductUrl({
            channelCode: record.channelCode,
            productId:record.productId,
            userCode: window.localStorage.getItem('userCode')
        }).then(res=>{
            console.log(res)
            // window.open(res.data)
        })

    }
    const columns = [
        {
            title: '产品ID',
            dataIndex: 'productId',
            key: 'productId',
        },
        {
            title: '产品名称',
            dataIndex: 'productName',
            key: 'productName',
        },
        {
            title: '标签',
            dataIndex: 'tags',
            key: 'tags',
        },
        {
            title: '操作',
            dataIndex: 'ac',
            key: 'ac',
            render:(text,record)=>{
                return (<a onClick={() => previewHref(record)}>查看</a>)
            }
        },
    ]
    const getPageList = () => {
        let params = pageParams
        getproductPageList(params).then(res => {
            if (res.code === '0000') {

                setPageList(res.data)
                setPageTotal(res.totalCount)
            }
        })
    }

    const rowSelection = {
        selectedRowKeys: selectedIds,
        onChange: (selectedRowKeys: array, selectedRows: object) => {
            setSelectedIds(selectedRowKeys)
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);

        }
    }
    const savevHandler = () => {
        console.log(selectedIds)
        let params = {
            content_type: 1,
            content: selectedIds.join()
        }
        addRightMsgList(params).then(res => {
            console.log(res)
            if (res.isSuccess) {
                message.success('新增成功')
                closeHandler()
            }
        })
    }
    const onFinish = values => {
        console.log('Received values of form: ', values);
        setPageParams({...pageParams,...values,
        pageNo:1
        })
    };
    const onPageChange =(val)=>{
        setPageParams({...pageParams,
            pageNo:val
        })
    }
    const onShowSizeChange =(current, pageSize)=>{
        setPageParams({...pageParams,
            pageNo:1,
            pageSize:pageSize
        })
    }
    const pagination = {
        total:pageTotal,
        onChange: (val)=> onPageChange(val),
        onShowSizeChange:(current, pageSize)=> onShowSizeChange(current, pageSize)
    }
    return (
        <Modal
            title="新增快捷回复文章"
            visible={editVisible}
            width={1000}
            onOk={savevHandler}
            onCancel={closeHandler}
        >

            <Form
                form={form}
                name="advanced_search"
                className="ant-advanced-search-form"
                onFinish={onFinish}
            >
                <Row gutter={24}>
                    <Form.Item
                        name='productName'
                        label='产品名称'
                    >
                        <Input placeholder="请输入" />
                    </Form.Item>
                </Row>
                <Row>
                    <Button type="primary" htmlType="submit">
                        搜索
                    </Button>
                    <Button
                        style={{ margin: '0 8px' }}
                        onClick={() => {
                            form.resetFields()
                        }}
                    >
                        清空
                    </Button>
                </Row>
            </Form>
                <Table
                    columns={columns}
                    rowKey="productId"
                    dataSource={PageList}
                    rowSelection={rowSelection}
                    pagination={pagination}
                ></Table>
        </Modal>
    )
}
export default ProductList