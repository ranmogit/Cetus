import React from "react";
import { Tabs } from 'antd';
import UserInfoCard from "./userInfoCard";
import style from '../index.less'
const { TabPane } = Tabs;
const RightTab = () => {
    return (
        <div className={style.rightTabbox}>
            <Tabs defaultActiveKey="0"  >
                {/* <div>12312312</div> */}
                <TabPane tab="快捷回复" key="0">
                    <UserInfoCard></UserInfoCard>
                </TabPane>
                <TabPane tab="发送文章" key="1"></TabPane>
                <TabPane tab="发送产品" key="2" ></TabPane>
                <TabPane tab="发送图片" key="3"></TabPane>
            </Tabs>
        </div>
    )
}
export default RightTab