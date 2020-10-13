import React, { useState } from "react";
import { Tabs } from 'antd';
import UserInfoCard from "./userInfoCard";
import style from '../index.less'
import FastReply from './rightActions/fastReply'
import ArticleSend from './rightActions/ArticleSend'
import ProductSend from './rightActions/ProductSend'
const { TabPane } = Tabs;
const RightTab = () => {
    const [contentType,setContentType]= useState(0)
    const tabHandler =(key)=>{
        setContentType(key)
    }
    return (
        <div className={style.rightTabbox}>
            <Tabs defaultActiveKey="0"   onChange={tabHandler}>
                {/* <div>12312312</div> */}
                <TabPane tab="快捷回复" key="0">
                    <UserInfoCard></UserInfoCard>
                    <FastReply contentType={contentType}></FastReply>
                </TabPane>
                <TabPane tab="发送文章" key="2">
                    <UserInfoCard></UserInfoCard>
                    <ArticleSend contentType={contentType}></ArticleSend>
                </TabPane>
                <TabPane tab="发送产品" key="1" >
                    <UserInfoCard></UserInfoCard>
                    <ProductSend contentType={contentType}></ProductSend>
                </TabPane>
                <TabPane tab="发送图片" key="3"></TabPane>
            </Tabs>
        </div>
    )
}
export default RightTab