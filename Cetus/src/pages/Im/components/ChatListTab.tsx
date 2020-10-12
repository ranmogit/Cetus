import React, { useEffect } from "react";
import { Tabs ,Badge} from 'antd';
import { connect, Dispatch } from 'umi';
const { TabPane } = Tabs;
import { queryCusList } from '@/services/im';
import style from "../index.less"
import TabItem from "./TabItem";


function callback(key) {
	console.log(key);
}

interface ChatListTabPropsType {
	type: number;
}
const ChatListTab: React.FC<ChatListTabPropsType> = ({ chat,dispatch }) => {
	useEffect(() => {
		
	}, [chat])
	return (
		<div className={style.chatListTabContainer}>
			<Tabs defaultActiveKey="1" onChange={callback} >
				<TabPane tab={
					<Badge count={chat.unreadCountToday}>
						<span>今日咨询</span>
					</Badge>
					} key="1" >
					{
						chat.chatList.map((item, index) => {
							return <TabItem ChatItem={item} key={index}></TabItem>
						})
					}
				</TabPane>
				<TabPane tab={
					<Badge count={chat.unreadCountHistory}>
						<span>历史咨询</span>
					</Badge>
					} key="2">
					Content of Tab Pane 2
				</TabPane>
			</Tabs>
		</div>
	)
};
const mapStateToProps = ({chat}) => {
	return { chat }
}
export default connect(mapStateToProps)(ChatListTab)