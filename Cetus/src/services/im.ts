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
    // return request(`/wjcApi/talkMag/queryCusList?type=${type}`, {
    //   method: 'GET',
	// });
	return {
		data:[
			{msg:'1212',headImgUrl:'https://avatar-static.segmentfault.com/201/377/2013779927-5980a4bfd0dd7_big64'}
		]
	}
}

export async function httpQueryUncount() {
    return request('/wjcApi/msgUnread/queryUnReadMsgCount', {
      method: 'GET',
    });
}
  
export async function httpTalkRecord(params) {
    // return request('/wjcApi/talkMag/queryMsgList', {
	//   method: 'POST',
	//   data: params,
	// });
	return {
		data:[
			{talkType:0,msgType:'text',msg:'121212542444444444444444444121212542444444444444444444121212542444444444444444444121212542444444444444444444121212542444444444444444444121212542444444444444444444121212542444444444444444444121212542444444444444444444'},
			{talkType:1,msg:'1212',msgType:'text',},
			{talkType:1,msg:'1212',msgType:'image',},
		]
	}
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