import { history, Reducer, Effect, Dispatch } from 'umi';
import { querySEM ,queryAllChannels,queryAllArticleIds,queryAllOfficialAccounts,getAllTemplate} from '@/services/sem';
import { notification } from 'antd';
import { resetKey } from '../utils/utils'
import Item from 'antd/lib/list/Item';


export interface StateType {
	status?: 'ok' | 'error';
	type?: string;
	currentAuthority?: 'user' | 'guest' | 'admin';
}

export interface SEMModelType {
	namespace: string;
	state: object;
	effects: {
		fetchData: Effect;
		fetchChanels:Effect;
	};
	reducers: {
	};
}

export interface TableListItem {
	id: number;
	url?: string;
	title?: string;
	articleId?: number;
	templateId?: number;
	domainUrl?: string;
	channelId?: number;
	subChannel?: string;
	category?: string;
	createTime?: Date;
}
export interface TableListPagination {
	total: number;
	pageSize: number;
	current: number;
}

export interface TableListData {
	list: TableListItem[];
	pagination: Partial<TableListPagination>;
}

export interface TableListDataRes {
	list?: TableListItem[]
}

export interface TableListParams {
	channelId?: string;
	nameSearch?: string;
	templateId?: string;
	pageNo?: number;
	pageSize?: number;
	createTime?: string
}

export interface responseParams {
	data: [];
	total: number;
	pageSize: number;
	current: number;
	success: boolean
}

export interface SEMLISTProps {
	dispatch: Dispatch;
}
export interface MaterialListParams {
	id: number;
	img: string;
	title: string;
	articleId: string;
	url: string
}
const Model: SEMModelType = {
	namespace: 'sem',
	state: {
		channels:[],
		articleIds:[],
		officialAccounts: [],
		templateIds:[]
	},
	effects: {
		*fetchData({ payload }, { call, put }) {
			const response = yield call(querySEM, resetKey(payload, 'current', 'pageNo'));
			if (response.code === 8200) {
				console.log(response)
				return {
					data: response.data,
					total: response.total,
					pageSize: response.pageSize,
					current: response.size,
					success: true
				}
			} else {
				notification.error({
					description: response.message,
					message: '发生错误',
				});
				return {
					data: [],
					total: 0,
					pageSize: payload.pageSize,
					current: payload.current,
					success: false
				}
			}
		},
		//获取所有渠道
		*fetchChanels({payload},{call,put}){
			const response= yield call(queryAllChannels,payload)
			if(response.code === 8200){
				const formatItems:array = []
				response.data.map( item =>{
					formatItems.push({
						value:item.id,
						label:item.name
					})
				})
				yield put({
					type:'setChanels',
					payload: formatItems
				})
			}
		},
		// 获取所有素材Id
		*fetchArticleIds({payload},{call,put}){
			const response= yield call(queryAllArticleIds, payload)	
			if(response.code === 8200){
				const formatItems:array = []
				response.data.map( item =>{
					formatItems.push({
						value:item,
						label:item
					})
				})
				yield put({
					type:'setArticleIds',
					payload: formatItems
				})
			}
		},
		// 获取所有公众号
		*fetchOfficialAccounts({payload},{call,put}){
			const response= yield call(queryAllOfficialAccounts, payload)	
			if(response.code === 8200){
				const formatItems:array = []
				response.data.map( item =>{
					formatItems.push({
						value:item.id,
						label:item.wx_account_name
					})
				})
				yield put({
					type:'setOfficialAccounts',
					payload: formatItems
				})
			}
		},
		//获取所有模板
		*fetchTemplate({payload},{call,put}){
			const response= yield call(getAllTemplate, payload)	
			if(response.code === 8200){
				const formatItems:array = []
				response.data.map( item =>{
					formatItems.push({
						value:item.id,
						label:item.name
					})
				})
				yield put({
					type:'setTemplateIds',
					payload: formatItems
				})
			}
		}
	},

	reducers: {
		setChanels(state,{payload}){
			return {
                ...state,
				channels: payload
            }
		},
		//set素材IDs
		setArticleIds(state,{payload}){
			return {
                ...state,
				articleIds: payload
            }
		},
		//set公众号
		setOfficialAccounts(state,{payload}){
			return {
                ...state,
				OfficialAccounts: payload
            }
		},
		//
		setTemplateIds(state,{payload}){
			return {
                ...state,
				templateIds: payload
            }
		},
	},
	subscriptions: {
        setup({ dispatch, history }) {
            history.listen(({ pathname }) => {
				//进入当前页sem时
				if (pathname === '/operation/sem' || '/operation/sem/add') {
					dispatch({
						type:'fetchChanels',
						payload:{}
					})
					dispatch({
						type:'fetchArticleIds',
						payload: {}
					})
					dispatch({
						type:'fetchOfficialAccounts',
						payload: {}
					})
					dispatch({
						type:'fetchTemplate',
						payload: {}
					})
					
				}
			})
		}
	}
};

export default Model;
