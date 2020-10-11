import React from "react"
import {Badge} from 'antd'
import {CustomerServiceOutlined} from '@ant-design/icons';
import { Link } from 'umi';
import { connect } from 'umi';
interface  unReadCountType {
    unReadCount:number
}
const ChatNotice = ({chat})=>{
    // const {unReadCount, setunReadCount} = use
    return (
        <div>
            <Link to="/imCenter/chat">
                <Badge count={chat.unReadCount}>
                <CustomerServiceOutlined />
                    <span>咨询   </span>
                </Badge>
            </Link>
        </div>
    )
}
const  mapStateToProps = ({chat})=>{
    // console.log(chat)
    return {chat}
}
export default connect(mapStateToProps) (ChatNotice)

