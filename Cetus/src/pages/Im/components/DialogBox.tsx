import React, { useEffect, useState } from 'react';
import { Card } from 'antd';
import DialogContent from './DialogContent';
import { connect } from 'umi';
const DialogBox = ({ chat }) => {
  const [defaultTitle, setDefaultTile] = useState('欢迎进入心橙保咨询');
  useEffect(() => {
    if (chat && chat.targetUser && chat.targetUser.unionId) {
      setDefaultTile(chat.targetUser.nickName);
    }
    else{
      setDefaultTile('欢迎进入心橙保咨询');
    }
  }, [chat]);
  return (
    <Card title={defaultTitle} bordered>
      <DialogContent></DialogContent>
    </Card>
  );
};
const mapStateToProps = ({ chat }) => {
  return { chat };
};
export default connect(mapStateToProps)(DialogBox);
