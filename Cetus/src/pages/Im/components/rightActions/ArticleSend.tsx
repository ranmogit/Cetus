import { useEffect, useState } from "react"
import React from 'react'
import style from './rightActions.less'
import { CloseOutlined } from '@ant-design/icons'
import { Button, Modal, Input, message,Checkbox } from 'antd';
import InfiniteScroll from 'react-infinite-scroller';
import { getRightMsgList, editRightMsgList ,deleteRightMsgList} from '@/services/im'
const { TextArea } = Input;
const { confirm } = Modal;
const ArticleSend = ({ contentType }) => {
    const [list, setList] = useState([])
    const [pageNum, setPageNum] = useState(1)
    const [editVisible, setEditVisible] = useState(false)
    const [defaultValue, setDefaultValue] = useState('')
    const [contentValue, setContentValue] = useState('')
    const [selectedId, setSelectedId] = useState('')
    useEffect(() => {
        if (contentType == 2) {
            getListHandler()
        }
        console.log(2222)

    }, [contentType])
    const loadFunc = () => {
        console.log('scolll')
    }
    const getListHandler = () => {
        let params = {
            fields: { content_type: 2 },
            pageNum: 0,
            pageSize: 10
        }
        console.log(22222)
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
                        return <div className={style.columnsThree} key={index}>
                            <div className={style.edit} ><Checkbox /></div>
                            <div className={style.content}>{item.title} </div>
                            <div className={style.delete} onClick={() => {handelDelete(item.id)}}><CloseOutlined></CloseOutlined></div>
                        </div>
                    })
                    }
                </InfiniteScroll>

            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Button type="primary"> 新 增</Button>
            </div>
            <Modal
                title="编辑"
                visible={editVisible}
                onOk={handleEditOk}
                onCancel={() => { setEditVisible(false) }}
            >
                <TextArea rows={4} defaultValue={defaultValue} onChange={(e) => { setContentValue(e.target.value) }} />


            </Modal>
        </div>
    )
}
export default ArticleSend