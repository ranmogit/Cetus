import  React,  {useState} from "react";
import { Input } from 'antd';
import { connect } from 'umi';
const { TextArea } = Input;

const InputArea =({chat,dispatch,inputEvent})=>{
    const inputHandler = (msg:string)=>{
        let params = {
            content:msg,
            toUser: chat.targetUser.openId,
            msgType: 0,
            cusSource: chat.targetUser.originalId
        }
        if(chat.targetUser.openId){
            dispatch({
                type:'chat/setMsgDto',
                payload:params
            })
        }
        
    }
    return (
        <div style={{width:'100%', height:'175px'}}>
            <TextArea  style={{height:'100%'}} onChange={(e)=>inputHandler(e.target.value)}   id="chatInput"/>
        </div>
    )
}
const  mapStateToProps = ({chat})=>{
    return {chat}
}
export default connect(mapStateToProps)(InputArea)