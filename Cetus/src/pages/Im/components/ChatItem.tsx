
import React, { useEffect, useState } from "react"
import style from '../index.less'
import MediaItem from "./MediaItem";
import { connect, Dispatch } from 'umi';
import { httpTalkRecord } from '@/services/im';
interface ChatItemType {
    img: string;
    content: string
}

const ChatItem = ({ chat, dispatch }) => {
    const [hasMore, { setHasMore }] = useState(true)
    useEffect(() => {
    }, [chat])
    const pageHandler = () => {
        //    let 
        let current = chat.chatPageParams.pageNo
        current++
        let payload = {
            openId: chat.targetUser.openId,
            pageNo: current,
            pageSize: 10
        }
        let newList = chat.chatItems
        httpTalkRecord(payload).then(res => {

            newList.unshift(...res.data.wxTalkMsgVoList)
            let data = {
                current: res.data.current,
                wxTalkMsgVoList: newList,
                hasNextPage: res.data.hasNextPage
            }
            dispatch({
                type: 'chat/setChatList',
                payload: data
            })
        })

    }
    return (
        <div className={style.chatItemBox} id="chatItemBox">
            <div>
                {
                    chat.chatList && chat.chatPageParams.hasNextPage ? <div className={style.centerClick} onClick={pageHandler}>点击加载更多</div> : ''
                }
            </div>

            {
                chat.chatItems.map((item, index) => {
                    if (item.talkType === 0) {
                        return <div className={style.chatItem} key={index}>
                            <div className={style.coloum}>
                                <div className={style.chatItemAvatar}>
                                    <img src={chat.targetUser.headImgUrl} />
                                </div>
                                <div className={style['chat-item-content']}>
                                    {item.msgType === 'text' ?
                                        <span>{item.msg}</span>
                                        : <MediaItem itemProps={item} originalId={chat.targetUser.originalId} />
                                    }
                                </div>

                            </div>
                            <div><p>{item.createTime}</p></div>
                        </div>
                    } else {
                        return <div className={style.chatItem} key={index}>
                            <div className={style.rightcoloum}>
                                <div className={style['chat-item-content']}>
                                    {item.msgType === 'text' ?
                                        <span>{item.msg}</span>
                                        : <MediaItem itemProps={item} originalId={chat.targetUser.originalId} />
                                    }
                                </div>
                                <div className={style.chatItemAvatar}>
                                    <img src='https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png' />
                                </div>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'flex-end' }}><p>{item.createTime}</p></div>
                        </div>
                    }

                })

            }

        </div>
    )
}
const mapStateToProps = ({ chat }) => {
    return { chat }
}
export default connect(mapStateToProps)(ChatItem)