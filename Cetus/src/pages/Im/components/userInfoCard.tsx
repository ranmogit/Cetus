import React from "react";
import { Card } from 'antd';
import style  from '../index.less'
import { connect } from "umi";
const UserInfoCard =({chat})=>{
    return (
        <div>
            <Card>
                <div className={style.column}>
                    <div className={style.half}>用户来源：{chat.userInfo.source}</div>
                    <div className={style.half}>关注时间：{chat.userInfo.subDate}</div>
                </div>
                <div className={style.column}>
                    <div className={style.half}>用户昵称：{chat.userInfo.nickName}</div>
                    <div className={style.half}>用户性别：{chat.userInfo.sex}</div>
                </div>
                <div className={style.column}>
                    <div className={style.half}>手机号：{chat.userInfo.phone}</div>
                    <div className={style.half}>用户年龄：{chat.userInfo.age}</div>
                </div>
                <div className={style.column}>
                    <div className={style.half}>地址：{chat.userInfo.address}</div>
    
                </div>
            </Card>
        </div>
    )
}
const mapStateToProps = ({ chat }) => {
    return { chat };
  };
export default connect(mapStateToProps)(UserInfoCard)