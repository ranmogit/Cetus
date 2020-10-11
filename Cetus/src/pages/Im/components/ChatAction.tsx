import React from 'react'
import style from '../index.less'
import { Button } from 'antd';
const ChatActions =()=>(
    <div  className={style.actions}>
        <div className={style.left}>
            <div>111</div>
            <div>22</div>
        </div>
        <div className={style.right}>
           <Button> 清空</Button>
           <Button type="primary"> 发送</Button>
        </div>
    </div>
)

export default ChatActions