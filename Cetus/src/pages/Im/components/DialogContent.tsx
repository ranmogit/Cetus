import React from "react";
import style from '../index.less'
import ChatItem from "./ChatItem"
import ChatTop from "./ChatTop"
const DilogContent =() =>(
    <div  className={style.dialogContent} >
        <ChatItem></ChatItem>
        <ChatTop></ChatTop>
    </div>
)
export default DilogContent