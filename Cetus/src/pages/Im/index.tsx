import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ChatList from "./components/chatList"
import {connect ,Loading} from "umi"

const ChatPage : React.FC<mapStateToProps> = ({
	chatList,
	loading
}) => (
	<PageContainer>
	<div>
		    {JSON.stringify(chatList)}
			<ChatList chatList={chatList}></ChatList>
	</div>
</PageContainer>
)
const mapStateToProps = ({
	chatList,
	loading,
  }: {
	chatList: [];
	loading: Loading;
  }) => {
	return {
	chatList,
	chatListLoading: loading.models.chatList,
	};
  };
  

export default connect(mapStateToProps)(ChatPage)