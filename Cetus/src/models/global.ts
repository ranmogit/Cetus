import { Subscription, Reducer, Effect } from 'umi';
import { NoticeIconData } from '@/components/NoticeIcon';
export interface NoticeItem extends NoticeIconData {
  id: string;
  type: string;
  status: string;
}

export interface GlobalModelState {
  collapsed: boolean;
  notices: NoticeItem[];
  imCount: number;
}

export interface GlobalModelType {
  namespace: 'global';
  state: GlobalModelState;
  effects: {
    fetchNotices: Effect;
    clearNotices: Effect;
    changeNoticeReadState: Effect;
    getUncount: Effect;
  };
  reducers: {
    changeLayoutCollapsed: Reducer<GlobalModelState>;
    saveNotices: Reducer<GlobalModelState>;
    saveClearedNotices: Reducer<GlobalModelState>;
  };
  subscriptions: { setup: Subscription };
}

const GlobalModel: GlobalModelType = {
  namespace: 'global',

  state: {
    collapsed: false,
    notices: [],
    imCount: 0,
  },

  effects: {
    *getUncount({ payload }, { call, put }) {
      console.log('ssssssss', payload);
    },
  },

  reducers: {
    changeLayoutCollapsed(state = { notices: [], collapsed: true }, { payload }): GlobalModelState {
      return {
        ...state,
        collapsed: payload,
      };
    },
    saveImCount(state, { payload }): GlobalModelState {
      return {
        collapsed: false,
        ...state,
        imCount: payload.count,
      };
    },
  },

  subscriptions: {
    setup({ dispatch, history }): void {
      
      history.listen(({ pathname, search })=> {

        if (typeof window.ga !== 'undefined') {
          window.ga('send', 'pageview', pathname + search);
        }
      });
    },
  },
};

export default GlobalModel;
