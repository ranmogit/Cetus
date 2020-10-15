import React, { useEffect, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Table, Tag, Space } from 'antd';
import { getConsultList } from '@/services/im'
import { Row, Col, Divider, Card, Form, Input } from 'antd';
import { history } from 'umi';
export default (): React.ReactNode => {
	const [pageParams, setPageParams] = useState({})
	const [listData, setListData] = useState([])
	useEffect(() => {
		getList()
	})
	const gotoHref =()=>{
		history.push('/imCenter/history/detail')
		
	}
	const columns = [
		{
			title: '用户ID',
			dataIndex: 'id',
			key: 'id',
		},
		{
			title: '用户昵称',
			dataIndex: 'nickName',
			key: 'nickName',
		},
		{
			title: '用户来源',
			dataIndex: 'channelName',
			key: 'channelName',
		},
		{
			title: '首次咨询时间',
			dataIndex: 'fristTime',
			key: 'fristTime',
		},
		{
			title: '所属顾问',
			dataIndex: 'brokerName',
			key: 'brokerName',
		},
		{
			title: '操作',
			dataIndex: 'operation',
			render: (text, record) =>
				<a onClick={()=>{gotoHref()}}>查看</a>
		},
	]
	
	const getList = () => {
		let pam = {
			pageNum: 1,
			pageSize: 10
		}
		getConsultList(pam).then(res => {
			console.log(res)
			if (res.isSuccess) {
				setListData(res.data)
				console.log(listData)
			}
		})
	}
	const rowSelection = {
		onChange: (selectedRowKeys, selectedRows) => {
			console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
		},
	};
	return (
		<PageContainer>

			<div>
				<Card>
					<Row gutter={16}>
						<Col className="gutter-row" span={6}>
							<div >
								<Form.Item name={['user', 'name']} label="Name" >
									<Input />
								</Form.Item>
							</div>
						</Col>
						<Col className="gutter-row" span={6}>
							<div ><Form.Item name={['user', 'name']} label="Name" >
								<Input />
							</Form.Item></div>
						</Col>
						<Col className="gutter-row" span={6}>
							<div ><Form.Item name={['user', 'name']} label="Name" >
								<Input />
							</Form.Item></div>
						</Col>

					</Row>
				</Card>
				<div>
					<Table
						rowSelection={{
							type: 'checkbox',
							...rowSelection,
						}}
						columns={columns}
						dataSource={listData}
					></Table>
				</div>
			</div>
		</PageContainer>
	)
};
