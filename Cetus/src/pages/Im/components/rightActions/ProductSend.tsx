import { useEffect, useState } from "react"
import React from 'react'
import style from './rightActions.less'
import { CloseOutlined, EditOutlined } from '@ant-design/icons'
import { Button, Modal, Input, message,Checkbox } from 'antd';
import InfiniteScroll from 'react-infinite-scroller';
import { getRightMsgList, editRightMsgList ,deleteRightMsgList,getproductUrl} from '@/services/im'
import { connect } from 'umi';
import { scollTo } from '../../actions';
import ProdutList from'./productList'
const { TextArea } = Input;
const { confirm } = Modal;
const FastReply = ({ contentType,chat,dispatch }) => {
    const [list, setList] = useState([])
    const [editVisible, setEditVisible] = useState(false)
    const [defaultValue, setDefaultValue] = useState('')
    const [contentValue, setContentValue] = useState('')
    const [selectedId, setSelectedId] = useState('')
    const [news, setNews] = useState([]);
    useEffect(() => {
        if (contentType ==1) {
            getListHandler()
        }
    }, [contentType])
    const loadFunc = () => {
        console.log('scolll')
    }
    const getListHandler = () => {
        let params = {
            fields: { content_type: 1 },
            pageNum: 0,
            pageSize: 10
        }
        getRightMsgList(params).then(res => {
            console.log(res)
            if (res.isSuccess) {
                setList(res.data)
            }

        })
    }
    const handleEditOk = () => {
        let params = {
            content_type: 0,
            content: contentValue,
            id: selectedId
        }
        editRightMsgList(params).then(res => {
            console.log(res)
        })
    }
    const handelDelete = (id) => {
        confirm({
            content: '确定要删除这条记录吗',
            onOk() {
                deleteRightMsgList(id).then(res=>{
                    if(res.isSuccess){
                        message.success('删除成功')
                        getListHandler()
                    }
                })
            },
            onCancel() {
                console.log('Cancel');
            },
        })

    }
    const handleSubmit = () => {
        let newList = []
        news.map((item,index)=>{

            getproductUrl({
                channelCode: item.channelCode,
                productId:item.productId,
                userCode: window.localStorage.getItem('userCode')
            }).then(res=>{
                newList.push({...item,url:res.data})
            })
        })
        let params = {
            toUser: chat.targetUser.openId,
            msgType: 5,
            cusSource: chat.targetUser.originalId,
            newsList: newList,
        };
        let chatParams = {
            openId: chat.targetUser.openId,
            pageNo: 1,
            pageSize: 10,
        };
        console.log(params)
        
        confirm({
            content: '确定发送该条消息吗',
            onOk() {
                dispatch({
                    type: 'chat/postImMsg',
                    payload: params,
                });
                setTimeout(() => {
                    dispatch({
                        type: 'chat/getChatRecord',
                        payload: chatParams,
                    });
                    scollTo();

                }, 500);
                setDefaultValue([])
            },
            onCancel() {
                console.log('已取消');
            },
           
        });
    };
    const onChange = (items) => {
        setDefaultValue(items)
        let newList: array = [];
        items.map((item) => {
            let obj = {
                url: '',
                title: item.productName,
                picurl: item.bannerImg,
                description: item.productName,
                channelCode: item.channelCode,
                productId:item.productId
            };
            newList.push(obj);
        });
        setNews(newList);
    };
    return (
        <div>
            <div style={{ height: '445px', overflow: 'auto' }}>
                <InfiniteScroll
                    pageStart={0}
                    loadMore={loadFunc}
                    hasMore={true}
                    initialLoad={false}
                    // loader={<div className="loader" key={0}>Loading ...</div>}
                    useWindow={false}
                >
                <Checkbox.Group onChange={onChange} value={defaultValue}>
                    {list.map((item, index) => {
                        return <div className={style.columnsThree} key={index}>
                            <div className={style.edit} > <Checkbox value={item} /></div>
                            <div className={style.content}>{item.productName} </div>
                            <div className={style.delete} onClick={() => {handelDelete(item.id)}}><CloseOutlined></CloseOutlined></div>
                        </div>
                    })
                    
                    }
                    </Checkbox.Group>
                </InfiniteScroll>

            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                 <Button type="primary" onClick={() => handleSubmit()}>
                    发送产品
                 </Button>
                <Button style={{ marginLeft: '20px' }}  type="primary" onClick={() => { setEditVisible(true); }}> 新 增</Button>
            </div>
                <ProdutList
                 editVisible={editVisible}
                 closeHandler={()=>setEditVisible(false)}
                ></ProdutList>
        </div>
    )
}
const mapStateToProps = ({ chat }) => {
    return { chat };
};
export default connect(mapStateToProps)(FastReply)