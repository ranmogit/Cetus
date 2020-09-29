import { Subscription, Reducer, Effect } from 'umi';

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
    reducers: {
    },
    effects:{},
    subscriptions:{}
}

export default ChatListModel;