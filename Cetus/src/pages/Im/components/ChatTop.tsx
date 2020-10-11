import React from 'react'
import style from '../index.less'
import ChatAction from './ChatAction'
import InputArea from "./InputArea";
const ChatTop = () =>(
    <div className={style.chatTop}>
        <ChatAction></ChatAction>
        <InputArea></InputArea>
    </div>
)
export default ChatTop