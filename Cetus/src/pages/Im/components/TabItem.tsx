import React, { useState, useEffect } from 'react';
import style from '../index.less';
import { connect, Dispatch } from 'umi';
import { Badge } from 'antd';
import { scollTo } from '../actions';
import chatList from './chatList';
const TabItem = ({ ChatItem, dispatch, chat }) => {
    const [targetUser, setTargetUser] = useState({});
    const targetUserHandler = async (targetUser: object) => {
        let params = {
            openId: targetUser.openId,
            pageNo: 1,
            pageSize: 10,
        };
        let clearParams = {
            openId: targetUser.openId,
        };
        await dispatch({
            type: 'chat/setTargetUser',
            payload: {
                targetUser,
            },
        });
        await dispatch({
            type: 'chat/getUserInfo',
            payload:{
                id: targetUser.openId
            }
        });
        await dispatch({
            type: 'chat/getChatRecord',
            payload: params,
        });
        await dispatch({
            type: 'chat/clearCount',
            payload: clearParams,
        });
        await dispatch({
            type: 'chat/getCusList',
            payload: {
                type: chat.tabType,
            },
        });
        await scollTo();
    };
    return (
        <div className={style.TabItemBox} onClick={() => targetUserHandler(ChatItem)}>
            <div className={style.LeftAvatar}>
                <Badge count={ChatItem.unreadCount}>
                    <img src={ChatItem.headImgUrl} alt="" />
                </Badge>
            </div>
            <div className={style.RightContent}>
                <div className={style.colunm}>
                    <div className={style.nickName}>{ChatItem.nickName}</div>

                    {ChatItem.isNewCus ? <div className={style.newCustomer}>新客</div> : null}

                    <div className={style.createTime}>{ChatItem.createTime}</div>
                </div>
                <div className={style.msgContent}>{ChatItem.msg}</div>
            </div>
        </div>
    );
};
const mapStateToProps = ({ chat }) => {
    return { chat };
};
export default connect(mapStateToProps)(TabItem);
