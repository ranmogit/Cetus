import { Subscription, Reducer, Effect } from 'umi';
import { queryCusList, httpTalkRecord, clearMsgCount, postMsg, httpQueryUncount, getUserInfo, connectChat } from '@/services/im';
import { message } from 'antd';
import { scollTo } from '../pages/Im/actions'
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
const host = 'http://cetus.jbx188.com:9443/hbyfIm'
const token = window.localStorage.getItem('token') || ''
export interface ChatListModelType {
    namespace: 'chat';
    state: {
        chatDto?: ChatDtotype
    };
    effects: Effect | {};
    reducers: Reducer | {};
    subscriptions: Subscription | {};
}
export interface ChatDtotype {
    content: string,
    toUser: string,
    msgType: number,
    cusSource: string
}

const ChatListModel: ChatListModelType = {
    namespace: 'chat',

    state: {
        chatList: [],
        historyChatList: [],
        targetUser: {},
        unreadCountToday: 0,
        unreadCountHistory: 0,
        unreadCountTotal: 0,
        tabType: 0,
        chatItems: [],
        chatDto: {
            content: '',
            toUser: '',
            msgType: 0,
            cusSource: ''
        },
        chatContent: '',
        chatPageParams: {
            pageNo: 1,
            pageSize: 10,
            hasNextPage: false
        },
        userInfo: {},
        isConnected: false,
        socket: null,
        stompClient:null
    },
    effects: {
        *getCusList({ payload }, { call, put }) {
            const response = yield call(queryCusList, payload);
            if (response) {
                yield put({
                    type: 'setCusList',
                    payload: response.data
                })
            }
        },
        *getHistoryList({ payload }, { call, put }) {
            const response = yield call(queryCusList, payload)
            if (response) {
                yield put({
                    type: 'setHistoryChatList',
                    payload: response.data
                })
            }
        },
        *getChatRecord({ payload }, { call, put }) {
            const response = yield call(httpTalkRecord, payload);
            if (response) {
                yield put({
                    type: 'setChatList',
                    payload: response.data
                })

            }
        },
        *clearCount({ payload }, { call, put }) {
            console.log(payload)
            const response = yield call(clearMsgCount, payload);
            if (response) {
                yield put({
                    type: "setUnreadNumbers",
                    payload: response.data
                })

            }
        },
        *postImMsg({ payload }, { call, put }) {
            const response = yield call(postMsg, payload)
            console.log(response)
            if (!response.isSuccess) {
                message.error(response.message);
            }
            else {
                // message.success('消息已发送')
            }
        },
        //获取未读总数
        *getTotalUncount({ payload }, { call, put }) {
            const response = yield call(httpQueryUncount, payload)
            yield put({
                type: "setUnreadNumbers",
                payload: response.data
            })
        },
        *notifyNewMsg({ payload }, { call, put }) {
            const response = payload
            yield put({
                type: 'pushChat',
                payload: { ...response }
            })
        },
        *getUserInfo({ payload }, { call, put }) {
            const response = yield call(getUserInfo, payload.id)
            console.log(response)
            yield put({
                type: 'setUserInfo',
                payload: response.data
            })
        },
        //socket
        
       
    },
    reducers: {
        //未读数
        setUnreadNumbers(state, { payload }) {
            return {
                ...state,
                unreadCountToday: payload.unreadCountToday,
                unreadCountHistory: payload.unreadCountHistory,
                unreadCountTotal: payload.unreadCountTotal
            };
        },
        setCusList(state, { payload }) {
            return {
                ...state,
                chatList: payload || []
            };
        },
        setTargetUser(state, { payload }) {
            return {
                ...state,
                targetUser: payload.targetUser
            }
        },
        setChatList(state, { payload }) {
            console.log(payload)
            return {
                ...state,
                chatItems: payload.wxTalkMsgVoList || [],
                chatPageParams: {
                    pageNo: payload.current,
                    hasNextPage: payload.hasNextPage
                }
            }
        },

        pushChat(state, { payload }) {
            let newData = state.chatItems

            if (payload.openId === state.targetUser.openId) {
                newData.push(payload)
                // let chatbox = document.getElementById('')
                scollTo()
            }
            return {
                ...state,
                chatItems: newData
            }
        },
        popChat(state, { payload }) {
            let newData = state.chatItems
            if (payload.openId === state.targetUser.openId) {
                newData.pop(payload)
            }
            return {
                ...state,
                chatItems: newData
            }
        },
        setMsgDto(state, { payload }) {
            return {
                ...state,
                chatDto: payload
            }
        },
        setTabType(state, { payload }) {
            return {
                ...state,
                tabType: payload
            }
        },
        //
        setHistoryChatList(state, { payload }) {
            return {
                ...state,
                historyChatList: payload
            }
        },
        // 用户侧边栏信息
        setUserInfo(state, { payload }) {
            return {
                ...state,
                userInfo: payload
            }
        },
        connectSocket(state,{payload}){
            let socket = new SockJS(host + `/imSocket?token=${token}`)
            let stompClient = Stomp.over(socket)
            stompClient.connect({},
                async function connectCallback(frame) {
                    await stompClient.subscribe('/broker/queue/imSocket', async function (response) {
                        console.log('res:' + response.body);
                        if (response) {
                        }
                    });
                },
            )
            return{
                ...state,
                socket:socket,
                stompClient:stompClient
            }
        },
        disconected(state, { payload}){
            state.stompClient.disconnect()
           return{
            ...state,
            stompClient:{
                ...state.stompClient,
                connected:false
            }
           }
        }


    },

    subscriptions: {
        setup({ dispatch, history }) {

            history.listen(({ pathname }) => {
                if (pathname === '/imCenter/chat') {
                    // 获取联系人列表socket
                    // connectChat()
                    dispatch({
                        type: 'connectSocket',
                        payload: {}
                    })
        
                }
            })
        }
    }
}

export default ChatListModel;