
import React from "react"
import style from '../index.less'
interface ChatItemType {
    img: string;
    content : string
}

const chatData:Array = [
    {img:'https://pic4.zhimg.com/da8e974dc_xs.jpg?source=1940ef5c',content:'123123123123'},
    {img:'https://pic4.zhimg.com/da8e974dc_xs.jpg?source=1940ef5c',content:'123123123123'},
    {img:'https://pic4.zhimg.com/da8e974dc_xs.jpg?source=1940ef5c',content:'123123123123'},
    {img:'https://pic4.zhimg.com/da8e974dc_xs.jpg?source=1940ef5c',content:'123123123123'},
    {img:'https://pic4.zhimg.com/da8e974dc_xs.jpg?source=1940ef5c',content:'123123123123'},
    {img:'https://pic4.zhimg.com/da8e974dc_xs.jpg?source=1940ef5c',content:'123123123123'},
    {img:'https://pic4.zhimg.com/da8e974dc_xs.jpg?source=1940ef5c',content:'123123123123'},
    {img:'https://pic4.zhimg.com/da8e974dc_xs.jpg?source=1940ef5c',content:'123123123123'},
    {img:'https://pic4.zhimg.com/da8e974dc_xs.jpg?source=1940ef5c',content:'123123123123'},
    {img:'https://pic4.zhimg.com/da8e974dc_xs.jpg?source=1940ef5c',content:'123123123123'},
    {img:'https://pic4.zhimg.com/da8e974dc_xs.jpg?source=1940ef5c',content:'123123123123'},
    {img:'https://pic4.zhimg.com/da8e974dc_xs.jpg?source=1940ef5c',content:'123123123123'},
    {img:'https://pic4.zhimg.com/da8e974dc_xs.jpg?source=1940ef5c',content:'123123123123'},
    {img:'https://pic4.zhimg.com/da8e974dc_xs.jpg?source=1940ef5c',content:'123123123123'},
    {img:'https://pic4.zhimg.com/da8e974dc_xs.jpg?source=1940ef5c',content:'123123123123'},
    {img:'https://pic4.zhimg.com/da8e974dc_xs.jpg?source=1940ef5c',content:'123123123123'}
]
const ChatItem =() =>(
    <div className={style.chatItemBox}>
        {
        chatData.map((item,index) => {
           return <div className={style.chatItem} key={index}>
                        <div className={style.chatItemAvatar}>
                            <img src={item.img}/>
                        </div>
                        <div className={style['chat-item-content']}>
                            {item.content}
                        </div>
                    </div>
        })
    }
    </div>
)
export default ChatItem