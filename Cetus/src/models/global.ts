import { Subscription, Reducer, Effect } from 'umi';
import { NoticeIconData } from '@/components/NoticeIcon';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import  basicUrl  from '../../config/basicUrl'
// const host = window.location.host == 'localhost:8000' ? 'http://wxxtest.jbx188.com:9443/hbyfIm' : 'http://cetus.jbx188.com:9443/hbyfIm';
const host = 'http://cetus.jbx188.com:9443/hbyfIm'
const token = window.localStorage.getItem('token') || ''

// const RouterConfig = require('../../config/config').default.routes;
console.log(process.env.REACT_APP_URL)
export interface NoticeItem extends NoticeIconData {
	id: string;
	type: string;
	status: string;
}

export interface GlobalModelState {
	collapsed: boolean;
	notices: NoticeItem[];
	imCount: number
}

export interface GlobalModelType {
	namespace: 'global';
	state: GlobalModelState;
	effects: {
		fetchNotices: Effect;
		clearNotices: Effect;
		changeNoticeReadState: Effect;
		getUncount: Effect
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
		imCount: 0
	},

	effects: {
		*getUncount({ payload }, { call, put }) {
			console.log('ssssssss', payload)
		}
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
		}
	},

	subscriptions: {
		setup({ dispatch, history }): void {
			// Subscribe history(url) change, trigger `load` action if pathname is `/`
			dispatch({
				type: 'chat/setUnreadNumbers',
				payload: {},
			})
			
			function connectChat() {
				let socket = new SockJS(host + `/imSocket?token=${token}`);
				let stompClient = Stomp.over(socket);
				stompClient.connect({},
					async function connectCallback(frame) {
						await  dispatch({
							type: 'chat/getCusList',
							payload: {
								type: 0
							}
						})
						await stompClient.subscribe('/broker/queue/imSocket', async function (response) {
							console.log('res:' + response.body);
							if (response) {	
								await dispatch({
									type: 'chat/getCusList',
									payload: {
										type: 0
									}
								})
								await dispatch({
									type: 'chat/getTotalUncount',
									payload: {}
								})
								let chatData = (JSON.parse( response.body)).data
								await dispatch({
									type: 'chat/notifyNewMsg',
									payload: chatData
								})

							}
						});
					},
				)	
			}
			
			// connectChat()
			history.listen(({ pathname, search }): void => {
				console.log('global',window.location.host)
				
				if (typeof window.ga !== 'undefined') {
					window.ga('send', 'pageview', pathname + search);
				}
				dispatch({
					type: 'chat/getTotalUncount',
					payload: {}
				})
				
			});
		},
	},
};

export default GlobalModel;
