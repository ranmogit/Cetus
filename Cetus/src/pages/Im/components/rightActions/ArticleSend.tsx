import { useEffect, useState } from 'react';
import React from 'react';
import style from './rightActions.less';
import { CloseOutlined } from '@ant-design/icons';
import { Button, Modal, Input, message, Checkbox, Form, Table } from 'antd';
import InfiniteScroll from 'react-infinite-scroller';
import { getRightMsgList, editRightMsgList, deleteRightMsgList } from '@/services/im';
import { connect } from 'umi';
import ArticleList from'./articleList'
import { scollTo } from '../../actions';
const { confirm } = Modal;
const ArticleSend = ({ contentType, chat, dispatch }) => {
    const [list, setList] = useState([]);
    const [PageList, setPageList] = useState([]);
    const [pageNum, setPageNum] = useState(1);
    const [editVisible, setEditVisible] = useState(false);
    const [defaultValue, setDefaultValue] = useState([]);
    const [contentValue, setContentValue] = useState('');
    const [selectedId, setSelectedId] = useState([]);
    const [news, setNews] = useState([]);

    
  

    useEffect(() => {
        if (contentType == 2) {
            getListHandler();
        }
    }, [contentType]);
    

    // 选择
    
    const loadFunc = () => {
    };
    const getListHandler = () => {
        let params = {
            fields: { content_type: 2 },
            pageNum: 1,
            pageSize: 100,
        };
        getRightMsgList(params).then((res) => {
            console.log(res);
            if (res.isSuccess) {
                setList(res.data);
            }
        });
    };
    const handleEditOk = () => {
        let params = {
            content_type: 0,
            content: contentValue,
            // id: selectedId,
        };
        editRightMsgList(params).then((res) => {
            console.log(res);
        });
    };

    const handelDelete = (id) => {
        confirm({
            content: '确定要删除这条记录吗',
            onOk() {
                deleteRightMsgList(id).then((res) => {
                    if (res.isSuccess) {
                        message.success('删除成功');
                        getListHandler();
                    }
                });
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };
    const handleSubmit = () => {

        let params = {
            toUser: chat.targetUser.openId,
            msgType: 5,
            cusSource: chat.targetUser.originalId,
            newsList: news,
        };
        let chatParams = {
            openId: chat.targetUser.openId,
            pageNo: 1,
            pageSize: 10,
        };
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
                url: item.articleUrl,
                title: item.title,
                picurl: item.picPath,
                description: item.description,
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
                            return (
                                <div className={style.columnsThree} key={index}>
                                    <div className={style.edit}>
                                        <Checkbox value={item} />
                                    </div>
                                    <div
                                        className={style.content}
                                    >
                                        {item.title}
                                    </div>
                                    <div
                                        className={style.delete}
                                        onClick={() => {
                                            handelDelete(item.id);
                                        }}
                                    >
                                        <CloseOutlined></CloseOutlined>
                                    </div>
                                </div>
                            );
                        })}
                    </Checkbox.Group>
                </InfiniteScroll>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Button type="primary" onClick={() => handleSubmit()}>
                    发送文章
                 </Button>
                <Button style={{ marginLeft: '20px' }} onClick={() => { setEditVisible(true); }}> 新 增</Button>
            </div>
            <ArticleList 
                editVisible={editVisible}
                closeHandler={()=>setEditVisible(false)}

             ></ArticleList>
        </div>
    );
};
const mapStateToProps = ({ chat }) => {
    return { chat };
};
export default connect(mapStateToProps)(ArticleSend);
