import request from '@/utils/request';
import { response } from 'express';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
const host= "http://114.55.43.36:9443/im";
const token =window.localStorage.getItem('token')||''
export interface ImQueryCusListParamsType {
    type: number;
  }

export async function queryCusList(data) {
	let type = data.type
    return request(`/wjcApi/talkMag/queryCusList?type=${type}`, {
      method: 'GET',
    });
}

export async function httpQueryUncount() {
    return request('/wjcApi/msgUnread/queryUnReadMsgCount', {
      method: 'GET',
    });
}
  
export async function httpTalkRecord(params) {
    return request('/wjcApi/talkMag/queryMsgList', {
	  method: 'POST',
	  data: params,
    });
}
  
//清楚未读数字
export async function clearMsgCount(params) {
    return request('/wjcApi/msgUnread/clearUnReadMsgCount', {
	  method: 'POst',
	  data: params,
    });
}
  
// 发送消息
export async function postMsg(params) {
    return request('/wjcApi/im/sendMsg', {
	  method: 'POST',
	  data: params,
    });
}

export async function  connectCount (){
	let  socket = new SockJS(host+`/unReadMsgCount?token=${token}`);
	let stompClient = Stomp.over(socket);
	let count = 0
	stompClient.connect({}, async function(frame) {
		console.log('Connected:' + frame);
		//监听的路径以及回调
		
		await httpQueryUncount().then(res=>{
			console.log(res)
			count = res.data
			stompClient.subscribe('/broker/queue/unReadMsgCount', function(response) {
				console.log('res:' + response.body);
			});
			
		})
	});
};