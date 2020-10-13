import React from "react";
import { Card } from 'antd';
import style  from '../index.less'
const UserInfoCard =()=>{
    return (
        <div>
            <Card>
                <div className={style.column}>
                    <div className={style.half}>用户来源：</div>
                    <div className={style.half}>关注时间：</div>
                </div>
                <div className={style.column}>
                    <div className={style.half}>用户昵称：</div>
                    <div className={style.half}>用户性别：</div>
                </div>
                <div className={style.column}>
                    <div className={style.half}>手机号：</div>
                    <div className={style.half}>用户年龄：</div>
                </div>
                <div className={style.column}>
                    <div className={style.half}>地址：</div>
    
                </div>
            </Card>
        </div>
    )
}
export default UserInfoCard