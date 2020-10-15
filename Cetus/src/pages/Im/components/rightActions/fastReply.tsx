import { useEffect, useState } from 'react';
import React from 'react';
import style from './rightActions.less';
import { CloseOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Modal, Input, message } from 'antd';
import InfiniteScroll from 'react-infinite-scroller';
import {
  getRightMsgList,
  editRightMsgList,
  deleteRightMsgList,
  addRightMsgList,
} from '@/services/im';
import { connect } from 'umi';
import { scollTo } from '../../actions';
const { TextArea } = Input;
const { confirm } = Modal;
const FastReply = ({ contentType, chat, dispatch }) => {
  const [list, setList] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  const [editVisible, setEditVisible] = useState(false);
  const [defaultValue, setDefaultValue] = useState('');
  const [contentValue, setContentValue] = useState('');
  const [selectedId, setSelectedId] = useState('');
  const [title, setTitle] = useState('新增');
  useEffect(() => {
    console.log('mouted', contentType);
    if (contentType == 0) {
      getListHandler();
    }
  }, [contentType]);
  const loadFunc = () => {
    console.log('scolll');
  };
  const getListHandler = () => {
    let params = {
      fields: { content_type: 0 },
      pageNum: 0,
      pageSize: 10,
    };
    getRightMsgList(params).then((res) => {
      if (res.isSuccess) {
        setList(res.data);
      }
    });
  };
  const handleEditOk = () => {
    let params = {
      content_type: 0,
      content: contentValue,
      id: title == '编辑' ? selectedId : '',
    };
    if(!contentValue.length){
        message.error('请填写内容后提交')
        return
    }
    if(contentValue.length>600){
        message.error('填写内容不得超过600')
        return
    }
    if (title == '编辑') {
      editRightMsgList(params).then((res) => {
        if (res.isSuccess) {
          message.success('编辑成功');
          setEditVisible(false);
          setDefaultValue('');
          getListHandler();
        }
      });
    } else {
      addRightMsgList(params).then((res) => {
        if (res.isSuccess) {
          message.success('新增成功');
          setEditVisible(false);
          setDefaultValue('');
          getListHandler();
        }
      });
    }
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
        console.log('已取消');
      },
    });
  };
  const handleSubmit = (item) => {
    console.log(chat);
    let params = {
      content: item.content,
      toUser: chat.targetUser.openId,
      msgType: 0,
      cusSource: chat.targetUser.originalId,
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
      },
      onCancel() {
        console.log('已取消');
      },
    });
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
          {list.map((item, index) => {
            return (
              <div className={style.columnsThree} key={index}>
                <div
                  className={style.edit}
                  onClick={() => {
                    setTitle('编辑');
                    setEditVisible(true);
                    setDefaultValue(item.content);
                    setSelectedId(item.id);
                  }}
                >
                  <EditOutlined />
                </div>
                <div
                  className={style.content}
                  onClick={() => {
                    handleSubmit(item);
                  }}
                >
                  {item.content}{' '}
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
        </InfiniteScroll>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Button
          type="primary"
          onClick={() => {
            setEditVisible(true);
            setDefaultValue('');
          }}
        >
          {' '}
          新 增
        </Button>
      </div>
      <Modal
        title={title}
        visible={editVisible}
        onOk={handleEditOk}
        onCancel={() => {
          setEditVisible(false);
        }}
        okText="确定"
        cancelText="取消"
      >
        <TextArea
          rows={4}
          value={defaultValue}
          onChange={(e) => {
            setContentValue(e.target.value);
            setDefaultValue(e.target.value);
          }}
        />
      </Modal>
    </div>
  );
};
const mapStateToProps = ({ chat }) => {
  return { chat };
};
export default connect(mapStateToProps)(FastReply);
