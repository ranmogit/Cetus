import { ProColumns } from '@ant-design/pro-table';
import { Form, Row, Col, Input, Button, Popconfirm, Select ,DatePicker} from 'antd';
import { TableListItem, MaterialListParams } from '../../../models/sem';
import React from 'react';

const channelIdMap = {
	1: '百度',
	2: 'UC',
	3: '360',
	4: '搜狗'
}
const officialAccountUIdMap ={
	1: '心橙保服务号,',
	2: '橙意说保',
	3: '小橙选保',
	4: '青橙管家',
	5:'大鱼柚子保'
}
// 获取列 属性
export const getColumns = () => {
	const columns: ProColumns<TableListItem>[] = [
		{
			title: '推广ID',
			dataIndex: 'id',
			ellipsis: true,
			width: '6%',
		},
		{
			title: '发布时间',
			dataIndex: 'create_time',
			valueType: 'dateTime',
			ellipsis: true,
		},
		{
			title: '推广名称',
			dataIndex: 'title',
			ellipsis: true
		},
		{
			title: '素材ID',
			dataIndex: 'article_id',
			width: '6%',
			ellipsis: true,
			key: 'article_id',
		},
		{
			title: '推广地址',
			dataIndex: 'url',
			valueType: 'text',
			ellipsis: true,
			search: false,
			render: (_, recode) => (<a href={recode.url} target="_blank">{recode.url}</a>)
		},
		{
			title: '推广渠道',
			dataIndex: 'channel_id',
			ellipsis: true,
			render:(_,record)=>(
				<span>{channelIdMap[record['channel_id']]}</span>
			)
		},
		{
			title: '对接公众号',
			dataIndex: 'domainUrl',
			ellipsis: true,
			render:(_,record)=>(
				<span>{officialAccountUIdMap[record['official_account_id']]}</span>
			)
		},
		{
			title: '统计事件名称',
			dataIndex: 'category',
			ellipsis: true,
			valueType: 'text'
		},
		{
			title: '操作',
			dataIndex: 'option',
			valueType: 'option',
			width: '15%',
			render: (_, record) => (
				<>
					<a  > 详情 </a>
					<a  > 编辑 </a>
					<a > 复制 </a>
					{/* <Popconfirm title="确定要删除吗?" onConfirm={del.bind(this, record)} okText="确定" cancelText="取消">
						<a> 删除 </a>
					</Popconfirm> */}
				</>
			),
		},
	];

	return columns
}

const { RangePicker } = DatePicker;
export const getFields = (channels, articleIds, accountIds) => {

	return (
		<>
			<Col span={6} key='title'>
				<Form.Item
					name='title'
					label='推广名称'
				>
					<Input placeholder="请输入" />
				</Form.Item>
			</Col>
			<Col span={6} key='article_id'>
				<Form.Item
					name='article_id'
					label='素材ID'
				>
					<Select>
						{
							articleIds.map((item, index) => {
								return (
									<Select.Option value={item.value} key={index}>{item.label}</Select.Option>
								)
							})
						}

					</Select>
				</Form.Item>
			</Col>
			<Col span={6} key='channel_id'>
				<Form.Item
					name='channel_id'
					label='推广渠道'
				>
					<Select>
						{
							channels.map((item, index) => {
								return (
									<Select.Option value={item.value} key={index}>{item.label}</Select.Option>
								)
							})
						}

					</Select>
				</Form.Item>
			</Col>
			<Col span={6}></Col>
			<Col span={6} key='official_account_id'>
				<Form.Item
					name='official_account_id'
					label='对接公众号'
				>
					<Select>
						{
							accountIds.map((item, index) => {
								return (
									<Select.Option value={item.value} key={index}>{item.label}</Select.Option>
								)
							})
						}

					</Select>
				</Form.Item>
			</Col>
			<Col span={6} key='category'>
				<Form.Item
					name='category'
					label='统计事件名称'
				>
					<Input placeholder="请输入" />
				</Form.Item>

			</Col>
			<Col span={6} key='date'>
				<Form.Item
					name='date'
					label='发布时间'
				>
					<RangePicker showTime />
				</Form.Item>

			</Col>
		</>
	)
}

export const MaterialColums: ProColumns<MaterialListParams>[] = [
	{
		title: '素材ID',
		dataIndex: 'id',
		ellipsis: true,
		search: false
	},
	{
		title: '头图',
		dataIndex: 'pic_path',
		valueType: 'avatar',
		search: false,
		render:(_,record)=>(
			<img src={record['pic_path']} style={{width:'100%',height:'120px'}}></img>
		)
	},
	{
		title: '标题',
		dataIndex: 'title',
		ellipsis: true
	},
	{
		title: '简介',
		dataIndex: 'description',
		ellipsis: true,
		search: false
	},
	{
		title: '标签',
		dataIndex: 'tags',
		valueType: 'text',
		ellipsis: true,
		search: false
	}
];
