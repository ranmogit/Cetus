import React from "react"
import style from '../index.less'
const ChatItem =() =>(
    <div className={style.chatItem}>
        <div className={style.chatItemAvatar}>
            <img src="https://pic4.zhimg.com/da8e974dc_xs.jpg?source=1940ef5c"/>
        </div>
        <div className={style['chat-item-content']}>
            111111
        </div>
    </div>
)
export default ChatItem