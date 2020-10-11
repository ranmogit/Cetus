import React, {useEffect}  from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card } from 'antd';
import ChatListTab from './components/ChatListTab';
import DilogBox from './components/DialogBox'
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import style from './index.less'
const ChatPage: React.FC = () => {
	const host= "http://192.168.1.170:9413/hbyfIm";
	const token =window.localStorage.getItem('token')||''
	function setConnected(connected) {
		console.log('conneted')
	}
	function connectCount (){
		let  socket = new SockJS(host+`/unReadMsgCount?token=${token}`);
		let stompClient = Stomp.over(socket);
		stompClient.connect({}, function(frame) {
			setConnected(true);
			console.log('Connected:' + frame);
			//监听的路径以及回调
			stompClient.subscribe('/broker/queue/unReadMsgCount', function(response) {
				console.log('res:' + response.body);
				showResponse(response.body,'未读消息');
			});
		});
	};
	const showResponse = (data,type) =>(
		console.log(type,data)
	)
	function connectList (){
		let  socket = new SockJS(host+`/unReadMsgCount?token=${token}`);
		let stompClient = Stomp.over(socket);
		stompClient.connect({}, function(frame) {
			setConnected(true);
			console.log('Connected:' + frame);
			//监听的路径以及回调
			stompClient.subscribe('/broker/queue/customerList', function(response) {
				console.log('联系人' , response.body);
			});
		});
	};

	useEffect(()=>{
		connectCount()
		connectList()
	},[])
	return (
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
	)
};

export default ChatPage;
