import { Subscription, Reducer, Effect } from 'umi';
import { queryCusList ,httpTalkRecord,clearMsgCount,postMsg,httpQueryUncount} from '@/services/im';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
const host= "http://192.168.1.160:9443/hbyfIm";
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
        chatContent:''
    },
    effects:{
        *getCusList({payload},{call, put}){
            console.log(payload)
            const response = yield call(queryCusList, payload);
            if(response){
                console.log(response)
                yield put({
                    type:'setCusList',
                    payload: response.data
                })
                yield put({
                    type:'setUnreadNumbers',
                    payload: response.data
                })
            }
        },

        *getChatRecord({payload},{call, put}){
            console.log(payload)
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
                chatList:payload
			};
        },
        setTargetUser(state,{payload}){
            return {
                ...state,
                targetUser:payload.targetUser
            }
        },
        setChatList(state,{payload}){
            return {
                ...state,
                chatItems:payload
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
        setMsgDto(state,{payload}){
            return {
                ...state,
                chatDto:payload
            }
        },
        clearInputTxt(){
            let inputChat= document.getElementById('chatInput')
            inputChat.value = ""
        }
    },
    
    subscriptions:{
        setup({ dispatch, history }) {
           
            history.listen(({ pathname }) => {
                if (pathname === '/imCenter/chat') {
                    // 获取联系人列表socket
                    function connectChat(){
                        let  socket =  new SockJS(host+`/imSocket?token=${token}`);
                        let stompClient = Stomp.over(socket);
                        let userListData = {}
                        stompClient.connect({},  
                            function connectCallback (frame){
                                dispatch({
                                    type:'getCusList',
                                    payload:{
                                        type:0
                                    }
                                })
                                dispatch({
                                    type:'getTotalUncount',
                                    payload:{}
                                })

                                stompClient.subscribe('/broker/queue/imSocket', function(response) {
                                    console.log('res:' +  response.body);
                                    userListData = (JSON.parse( response.body)).data

                                    if(response){
                                        dispatch({
                                            type:'getCusList',
                                            payload:{
                                                type:0
                                            }
                                        })
                                    }
                                    
                                });
                            },
                        )
                    }
                    // connectChat()
                }
            })
        }
    }
}

export default ChatListModel;