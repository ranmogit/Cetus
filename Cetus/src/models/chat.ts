import { Subscription, Reducer, Effect } from 'umi';
import { queryCusList ,httpTalkRecord,clearMsgCount,postMsg,httpQueryUncount} from '@/services/im';
import {  message} from 'antd';
const token =window.localStorage.getItem('token')||''
export interface ChatListModelType {
    namespace: 'chat';
    state: {
        chatDto?:  ChatDtotype
    };
    effects: Effect | {};
    reducers: Reducer | {};
    subscriptions:Subscription | {};
}
export interface ChatDtotype{
    content:string,
    toUser: string,
    msgType: number,
    cusSource: string
}

const ChatListModel:ChatListModelType = {
    namespace: 'chat',
    
    state: {
        chatList: [],
        targetUser: {},
        unreadCountToday: 0,
        unreadCountHistory: 0,
        unreadCountTotal: 0,
        tabType:0,
        chatItems:[],
        chatDto: {
            content:'',
            toUser: '',
            msgType: 0,
            cusSource: ''
        },
        chatContent:'',
        chatPageParams:{
            pageNo: 1,
            pageSize: 10,
            hasNextPage:false
        }
    },
    effects:{
        *getCusList({payload},{call, put}){
            const response = yield call(queryCusList, payload);
            if(response){
                console.log(response)
                yield put({
                    type:'setCusList',
                    payload: response.data
                })
            }
        },

        *getChatRecord({payload},{call, put}){
            const response = yield call(httpTalkRecord, payload);
            if(response){
                yield put({
                    type:'setChatList',
                    payload: response.data
                })

            }
        },
        *clearCount({payload},{call, put}){
            console.log(payload)
            const response = yield call(clearMsgCount, payload);
            if(response){
                yield put({
                    type:"setUnreadNumbers",
                    payload: response.data
                })
               
            }
        },
        *postImMsg({payload},{call,put}){
           const response = yield call( postMsg, payload)
           console.log(response)
           if(!response.isSuccess){
                message.error(response.message);
           }
           else {
            // message.success('消息已发送')
           }
        },
        //获取未读总数
        *getTotalUncount({payload},{call,put}){
            const response = yield call( httpQueryUncount, payload)
            console.log(response)
            yield put({
                type:"setUnreadNumbers",
                payload: response.data
            })
        }
    
    },
    reducers: {
        //未读数
        setUnreadNumbers(state,{payload}){
            return {
                ...state,
                unreadCountToday: payload.unreadCountToday,
                unreadCountHistory: payload.unreadCountHistory,
                unreadCountTotal: payload.unreadCountTotal
			};
        },
        setCusList(state,{payload}){
            return {
                ...state,
                chatList:payload || []
			};
        },
        setTargetUser(state,{payload}){
            return {
                ...state,
                targetUser:payload.targetUser
            }
        },
        setChatList(state,{payload}){
            console.log(payload)
            return {
                ...state,
                chatItems:payload.wxTalkMsgVoList || [],
                chatPageParams:{
                    pageNo: payload.current,
                    hasNextPage: payload.hasNextPage
                }
            }
        },
        
        pushChat(state,{payload}){
            let newData = state.chatItems
            if(payload.openId === state.targetUser.openId){
                newData.push(payload)
            }
            return {
                ...state,
                chatItems:newData
            }
        },
        popChat(state,{payload}){
            let newData = state.chatItems
            if(payload.openId === state.targetUser.openId){
                newData.pop(payload)
            }
            return {
                ...state,
                chatItems:newData
            }
        },
        setMsgDto(state,{payload}){
            return {
                ...state,
                chatDto:payload
            }
        },
        //清除发送内容
        

    },
    
    subscriptions:{
        setup({ dispatch, history }) {
           
            history.listen(({ pathname }) => {
                if (pathname === '/imCenter/chat') {
                    // 获取联系人列表socket
                    // connectChat()
                }
            })
        }
    }
}

export default ChatListModel;