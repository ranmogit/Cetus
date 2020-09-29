import React, { useState ,useEffect} from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card,Button} from 'antd';
import Stomp from "stompjs";
import SockJS from 'sockjs-client';
import ChatList from "./components/ChatList"
import { connect, Dispatch, Loading, UserState, chatModel } from 'umi';
const ImPage = () => {
	const [chatList ] = useState(()=>{
		return []
	});
	// const [setChatList] = useEffect()
	const setChatListHandler =()=>{
		console.log(chatList)
		// chatList =[{},{}]
	}
	return (
		<PageContainer>
			<ChatList ChatList={ChatList}></ChatList>
			<Button type="primay" onClick={setChatListHandler}>click</Button>
		</PageContainer>
	)
}
const mapStateToProps =({

})

export default connect(chat)(ImPage)