import React from 'react';
import { Modal ,Form,Select,Input} from 'antd';

interface CreateFormProps {
	modalVisible: boolean;
	onCancel: () => void;
}

const BatchForm: React.FC<CreateFormProps> = (props) => {
	const { modalVisible, onCancel } = props;
	const layout = {
		labelCol: { span: 4 },
		wrapperCol: { span: 12 },
	  };
	const onFinishForm = values=>{
		console.log(values)
	}
	return (
		<Modal
			destroyOnClose
			title="批量修改"
			visible={modalVisible}
			onCancel={() => onCancel()}

			onOk={()=>onFinishForm()}
			width={'800px'}
		>
			<Form
				 onFinish={onFinishForm}
				 {...layout}
			>
				<Form.Item
				label="模板"
				name="templateId"
				rules={[{ required: true, message: '请输入!' }]}
				>
					<Select ></Select>
				</Form.Item>
				<Form.Item
				label="渠道"
				name="channelId"
				rules={[{ required: true, message: '请输入!' }]}
				>
					<Select ></Select>
				</Form.Item>
				<Form.Item
				label="子渠道"
				name="subChannel"
				
				>
					<Input />
				</Form.Item>
				<Form.Item
				label="域名"
				name="domainId"
				rules={[{ required: true, message: '请输入!' }]}
				>
					<Select ></Select>
				</Form.Item>
				<Form.Item
				label="对接公众号"
				name="officialAccountId"
				rules={[{ required: true, message: '请输入!' }]}
				>
					<Select ></Select>
				</Form.Item>

			</Form>
		</Modal>
	);
};

export default BatchForm;
