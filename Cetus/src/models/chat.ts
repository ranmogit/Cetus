import { Subscription, Reducer, Effect } from 'umi';
import { queryCusList } from '@/services/im';
export interface ChatListModelType {
    namespace: 'chat';
    state: {};
    effects: Effect | {};
    reducers: Reducer | {};
    subscriptions:Subscription | {};
}

const ChatListModel:ChatListModelType = {
    namespace: 'chat',
    
    state: {
        chatList: [
            {name:'荔枝荔枝', isNew:false, createTime:'23:23:20',content:'22222'},
            {name:'荔枝荔枝', isNew:false, createTime:'23:23:20',content:'22222'},
            {name:'荔枝荔枝', isNew:false, createTime:'23:23:20',content:'22222'},
            {name:'荔枝荔枝', isNew:false, createTime:'23:23:20',content:'22222'},
        ],
        unReadCount:100
    },
    effects:{
        *getCusList({payload},{call, put}){
            const response = yield call(queryCusList, payload);
            console.log(response)
        }
    },
    reducers: {

    },
    
    subscriptions:{}
}

export default ChatListModel;