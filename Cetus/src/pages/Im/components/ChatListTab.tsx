import React,{useEffect} from "react";
import { Tabs } from 'antd';
import { connect, Dispatch } from 'umi';
const { TabPane } = Tabs;
import { queryCusList } from '@/services/im';
import style from "../index.less"
function callback(key) {
	console.log(key);
}

interface ChatListTabPropsType{
	type:number;
}
const ChatListTab: React.FC<ChatListTabPropsType> = (props) => {
	const {type=1 } = props
	useEffect(() => {
		const type = 1
		queryCusList(type).then(xx=>{
			console.log(xx)
		})
		
	},[])
	return (
			<div className={style.chatListTabContainer}>
				<Tabs defaultActiveKey="1" onChange={callback} >
					<TabPane tab="今日咨询" key="1">
						
					</TabPane>
					<TabPane tab="历史咨询" key="2">
						Content of Tab Pane 2
				</TabPane>
				</Tabs>
			</div>
	)
};
const mapStateToProps =(state)=>{
	return {type: state.type}
}
export default connect(mapStateToProps)(ChatListTab)