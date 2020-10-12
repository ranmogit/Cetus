import React, { useState,useEffect } from "react";
import style from '../index.less'
import { connect, Dispatch } from 'umi';
const TabItem = ({ ChatItem, dispatch }) => {

    const [targetUser, setTargetUser] = useState({});
    const targetUserHandler = (targetUser: object) => {
        dispatch({
            type: 'chat/setTargetUser',
            payload: {
                targetUser
            },
        });
        let params = {
            openId: targetUser.openId,
            pageNo: 1,
            pageSize: 10
        }
        let clearParams = {
            openId: targetUser.openId
        }

        dispatch({
            type: 'chat/getChatRecord',
            payload: params
        });
        dispatch({
            type: 'chat/clearCount',
            payload: clearParams
        });
    };
    return (
        <div className={style.TabItemBox} onClick={() => targetUserHandler(ChatItem)}>
            <div className={style.LeftAvatar}>
                <img src={ChatItem.headImgUrl} alt="" />
            </div>
            <div className={style.RightContent}>
                <div className={style.colunm}>
                    <div>{ChatItem.nickName}</div>
                    <div>新客</div>
                    <div>{ChatItem.createTime}</div>
                </div>
                <div>{ChatItem.msg}</div>
            </div>

        </div>
    )
}
const mapStateToProps = ({ chat }) => {
    return { chat }
}
export default connect(mapStateToProps)(TabItem)