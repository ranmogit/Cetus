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
        chatList: [{xx:1111}]
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