import React from 'react'
import style from '../index.less'
import ChatAction from './ChatAction'
import InputArea from "./InputArea";
const ChatTop = () => {
    const getChild =(val)=>{
        console.log(val)
    }
    return(<div className={style.chatTop}>
        <ChatAction></ChatAction>
        <InputArea  inputEvent = {getChild} ></InputArea>
    </div >)

}
export default ChatTop