import { history, connect } from 'umi';
import { PlusOutlined } from '@ant-design/icons';
import React, { useState, useRef, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Table, Form, Row, Col, Input, Button, Card, Alert } from 'antd';
import { TableListItem, responseParams, SEMLISTProps } from '../../models/sem';
import { querySEM } from '@/services/sem';
import { getColumns, getFields } from './config'
import moment from 'moment';
import IFooter from './components/Footer'
import Detail from './components/Detail'
import './less/list.less'



const SEMLIST: React.FC<SEMLISTProps> = ({ sem }, props) => {
	const [form] = Form.useForm();
	const [selectedRowsState, setSelectedRows] = useState<TableListItem[]>([]);
	const [isDetailShow, setIsDetailShow] = useState<boolean>(false);
	const [listData, setListData] = useState([])
	const [pageTotal, setPageTotal] = useState(null)
	const [selectedRowKeys, setSelectedRowKeys] = useState([])
	const [pageParams, setPageParams] = useState({
		pageNum: 1,
		pageSize: 10,
		fields: null
	})
	// 拉取数据
	const getList = (params: any) => {
		querySEM(params).then(res => {
			if (res.code === 8200) {
				setListData(res.data)
				setPageTotal(res.total)
				
			}
		})
	}
	useEffect(() => {
		getList(pageParams)
	}, [pageParams])
	// 跳转
	const navigateTo = (path: string) => {
		history.push(path)
	}
	const onFinish = (values) => {
		console.log(values)
		let params = { ...values }
		//选择时间后的逻辑处理
		if (values.date) {
			let newDate = {
				start_create_time: moment(values.date[0]).format('YYYY-MM-DD HH:mm'),
				end_create_time: moment(values.date[1]).format('YYYY-MM-DD HH:mm')
			}
			delete params.date
			params = {
				...params,
				...newDate
			}
		}
		setPageParams({
			...pageParams,
			fields: { ...params }
		})
	}
	//分页操作
	const onPageChange = (page, pageSize) => {
		console.log(page, pageSize)
		setPageParams({...pageParams,
			pageNum:page,
			pageSize:pageSize
		})
	}

	//选择项
	const onSelectChange = selectedRowKeys => {
		setSelectedRowKeys(selectedRowKeys)
	}
	const rowSelection = {
		selectedRowKeys,
		onChange: keys => onSelectChange(keys),
	}

	const channels = sem.channels
	const articleIds = sem.articleIds
	const accountIds = sem.OfficialAccounts
	const pagination = {
		total: pageTotal,
		showSizeChanger:true,
		onChange: (page, pageSize) => onPageChange(page, pageSize),
		// onShowSizeChange:(val)=> onPageChange(val)
	}
	return (
		<PageContainer>
			<Card>
				<Form
					form={form}
					name="advanced_search"
					className="ant-advanced-search-form"
					onFinish={onFinish}
				>
					<Row gutter={24}>{getFields(channels, articleIds, accountIds)}</Row>
					<Row>
						<Col span={10}>
							<Button type="primary" onClick={()=> navigateTo('/operation/sem/add')}>
								新增
							</Button>
						</Col>
						<Col span={14} style={{ textAlign: 'right' }}>
							<Button type="primary" htmlType="submit">
								搜 索
							</Button>
							<Button
								style={{ margin: '0 8px' }}
								onClick={() => {
									form.resetFields();
									setPageParams({
										pageNum: 1,
										pageSize: 10,
										fields: null
									})
								}}
							>
								重 置
							</Button>
						</Col>
					</Row>
				</Form>
				<Row style={{ marginTop: '20px' }}>
					<Col>
							总共搜索到了{pageTotal}条数据
					</Col>
					<Col span="24">

						{
							selectedRowKeys.length ? (
								<Alert message={`已选择了${selectedRowKeys.length}条数据`} type="info" showIcon />
							)
							 :''
						 }
					</Col>
				</Row>
			</Card>

			<Table
				rowKey="id"
				columns={getColumns()}
				dataSource={listData}
				rowSelection={rowSelection}
				pagination={pagination}>
			</Table>

		</PageContainer>
	);
};

const mapStateToProps = ({ sem }) => {
	return { sem };
};

export default connect(mapStateToProps)(SEMLIST)