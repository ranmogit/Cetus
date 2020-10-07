import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card } from 'antd';
import ChatListTab from './components/ChatListTab';
import DilogBox from './components/DialogBox'
import style from './index.less'
const ChatPage: React.FC = () => (
	<PageContainer>
		<Card bordered>
			<div className={style.chaContainer}>
				<div className={style.chatTabContaner}>
					<Card bordered>
						<ChatListTab></ChatListTab>
					</Card>
				</div>
				<div>
					<DilogBox></DilogBox>
				</div>
			</div>
		</Card>
	</PageContainer>
);

export default ChatPage;
