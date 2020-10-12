
import React from "react"
import style from '../index.less'
import MediaItem from "./MediaItem";
import { connect, Dispatch } from 'umi';
interface ChatItemType {
    img: string;
    content: string
}

const ChatItem = ({ chat }) => (
    <div className={style.chatItemBox}>
        {
            chat.chatItems.map((item, index) => {
                if (item.talkType === 0) {
                    return <div className={style.chatItem} key={index}>
                        <div className={style.coloum}>
                            <div className={style.chatItemAvatar}>
                                <img src={chat.targetUser.headImgUrl} />
                            </div>
                            <div className={style['chat-item-content']}>
                                {item.msgType ==='text'?
                                        <span>{item.msg}</span>
                                        :<MediaItem itemProps={item}/>   
                                }
                            </div>

                        </div>
                        <div><p>{item.createTime}</p></div>
                    </div>
                }else{
                    return <div className={style.chatItem} key={index}>
                        <div className={style.rightcoloum}>
                            <div className={style['chat-item-content']}>
                                {item.msgType ==='text'?
                                        <span>{item.msg}</span>
                                        :<MediaItem itemProps={item}/>   
                                }
                            </div>
                            <div className={style.chatItemAvatar}>
                                <img src={chat.targetUser.headImgUrl} />
                            </div>
                        </div>
                        <div><p>{item.createTime}</p></div>
                    </div>
                }

            })
        }
    </div>
)
const mapStateToProps = ({ chat }) => {
    return { chat }
}
export default connect(mapStateToProps)(ChatItem)