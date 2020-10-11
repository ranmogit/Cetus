import  React  from "react";
import style from '../index.less'
const TabItem =({ChatItem})=>{
    console.log(ChatItem)
    return (
        <div className={style.TabItemBox}>
            <div className={style.LeftAvatar}>
                <img src="https://pic4.zhimg.com/da8e974dc_xs.jpg?source=1940ef5c" alt=""/>
            </div>
            <div className={style.RightContent}>
                <div className={style.colunm}>
                    <div>{ChatItem.name}</div>
                    <div>新客</div>
                    <div>{ChatItem.createTime}</div>
                </div>
                <div>{ChatItem.content}</div>
            </div>
            
        </div>
    )
}
export default TabItem