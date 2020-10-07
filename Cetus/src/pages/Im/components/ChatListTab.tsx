import React from "react";
import { Tabs } from 'antd';
const { TabPane } = Tabs;
import style from "../index.less"
function callback(key) {
	console.log(key);
}

const ChatListTab = () => (
	<div className={style.chatListTabContainer}>
		<Tabs defaultActiveKey="1" onChange={callback} >
			<TabPane tab="今日咨询" key="1">

			</TabPane>
			<TabPane tab="历史咨询" key="2">
				Content of Tab Pane 2
		</TabPane>
		</Tabs>
	</div>
);

export default ChatListTab