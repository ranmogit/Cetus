import React, { useState } from "react";
import { Input } from 'antd';
import { connect } from 'umi';
const { TextArea } = Input;

const InputArea = ({ chat, dispatch, inputEvent }) => {
    const inputHandler = (msg: string) => {
        let params = {
            content: msg,
            toUser: chat.targetUser.openId,
            msgType: 0,
            cusSource: chat.targetUser.originalId
        }
        if (chat.targetUser.openId) {
            dispatch({
                type: 'chat/setMsgDto',
                payload: params
            })
        }
    }
    const pressEnter = (e) => {
        let params = {
            content: chat.chatDto.content,
            toUser: chat.targetUser.openId,
            msgType: 0,
            cusSource: chat.targetUser.originalId
        }
        let chatParams = {
            openId: chat.targetUser.openId,
            pageNo: 1,
            pageSize: 10
        }
        if (chat.targetUser.openId) {

            dispatch({
                type: 'chat/postImMsg',
                payload: params
            })
            let msgParams = {
                content: '',
                toUser: chat.targetUser.openId,
                msgType: 0,
                cusSource: chat.targetUser.originalId
            }
            dispatch({
                type: 'chat/setMsgDto',
                payload: msgParams
            })
            setTimeout(() => {
                dispatch({
                    type: 'chat/getChatRecord',
                    payload: chatParams
                })
            }, 500)


        }

        e.preventDefault()
    }
    return (
        <div style={{ width: '100%', height: '175px' }}>
            <TextArea style={{ height: '100%' }} onChange={(e) => inputHandler(e.target.value)} value={chat.chatDto.content} id="chatInput" onPressEnter={(e) => pressEnter(e)} />
        </div>
    )
}
const mapStateToProps = ({ chat }) => {
    return { chat }
}
export default connect(mapStateToProps)(InputArea)