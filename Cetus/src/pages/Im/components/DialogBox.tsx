import React, { useEffect, useState } from 'react';
import { Card } from 'antd';
import DialogContent from './DialogContent';
import { connect } from 'umi';
const DialogBox = ({ chat,dispatch }) => {
  const [defaultTitle, setDefaultTile] = useState('欢迎进入心橙保咨询');
  useEffect(() => {
    if (chat && chat.targetUser && chat.targetUser.unionId) {
      setDefaultTile(chat.targetUser.nickName);
    }
    else{
      setDefaultTile('欢迎进入心橙保咨询');
    }
  }, [chat]);
  const clickAct = ()=>{
    console.log(chat)
    dispatch({
      type:'chat/disconected',
      payload:{}
    })
    }
    const clickAct2 = ()=>{
      console.log(chat)
      dispatch({
        type:'chat/connectSocket',
        payload:{}
      })
      }
  return (
    <Card title={defaultTitle} bordered>
      <button onClick={()=>{clickAct()}}>1111</button>
      <button onClick={()=>{clickAct2()}}>222</button>
      <DialogContent></DialogContent>
    </Card>
  );
};
const mapStateToProps = ({ chat }) => {
  return { chat };
};
export default connect(mapStateToProps)(DialogBox);
