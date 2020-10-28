import { connect } from 'umi';
import React, { useState, useRef, useEffect } from 'react'
import { Table, Form, Row, Col, Input, Button, Card, Alert, Modal } from 'antd';
import { MaterialColums } from '../config'
import { MaterialListParams, responseParams } from '../../../models/sem'
import { queryAllArticleList } from "@/services/sem"
import '../less/material.less'

interface MaerialProps {
    isShow: boolean;
    onCancel: () => void
}

const Material: React.FC<MaerialProps> = props => {
    const [form] = Form.useForm();
    const { isShow, onCancel ,onSelceted} = props;
    const [listData, setListData] = useState([])
    const [pageTotal, setPageTotal] = useState(null)
	const [selectedRowKeys, setSelectedRowKeys] = useState([])
    const [pageParams, setPageParams] = useState({
        pageNum: 1,
        pageSize: 10,
        fields: {}
    })


    // 拉取数据
    const getList = (params: any) => {
        queryAllArticleList(params).then(res => {
            console.log(res)
            if (res.code === 8200) {
                setListData(res.data)
                setPageTotal(res.total)
            }
        })
    }
    useEffect(() => {
        getList(pageParams)
    }, [pageParams])
    const onFinish = (values) => {

        setPageParams({
			...pageParams,
			fields: { ...values }
		})
    }
    //分页操作
	const onPageChange = (page, pageSize) => {
		setPageParams({...pageParams,
			pageNum:page,
			pageSize:pageSize
		})
	}
    const pagination = {
		total: pageTotal,
		showSizeChanger:true,
		onChange: (page, pageSize) => onPageChange(page, pageSize),
		// onShowSizeChange:(val)=> onPageChange(val)
    }
    //选择项
	const onSelectChange = selectedRowKeys => {
        console.log(selectedRowKeys)
		setSelectedRowKeys(selectedRowKeys)
	}
    const rowSelection = {
        selectedRowKeys,
        type:'radio',
		onChange: keys => onSelectChange(keys),
	}
    return (
        <Modal destroyOnClose footer={null} visible={isShow} onCancel={() => onCancel()} className="iModal" width={1200}>
            <Row style={{ marginTop: '30px' }}></Row>
            <Form
                form={form}
                name="advanced_search"
                className="ant-advanced-search-form"
                onFinish={onFinish}
            >
                <Row>
                    <Col span={10} key='title'>
                        <Form.Item
                            name='title'
                            label='推广名称'
                        >
                            <Input placeholder="请输入" />
                        </Form.Item>
                    </Col>
                    <Col span={14} style={{ textAlign: 'right' }}>
                        <Button  htmlType="submit">
                            搜 索
							</Button>
                        <Button
                            type="primary"
                            style={{ margin: '0 8px' }}
                            disabled={selectedRowKeys.length? undefined : true  }
                            onClick={() => {
                                onSelceted(selectedRowKeys)
                                onCancel()
                            }}
                        >
                            确定
						</Button>
                    </Col>
                </Row>

            </Form>
            <Table
                columns={MaterialColums}
                dataSource={listData}
                rowKey="id"
                rowSelection={rowSelection}
				pagination={pagination}>
            >
            </Table>
        </Modal>
    )
}


export default connect()(Material)