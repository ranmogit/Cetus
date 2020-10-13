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

// 上传
export async function uploadFile(params) {
    return request('/wjcApi/wx/uploadMedia', {
	  method: 'POST',
	  data: params,
    });
}

//获取侧边栏
export async function getRightMsgList (params) {
  return request('/wjcApi/yfSideMsgInfo/list', {
  method: 'POST',
  data: params,
  });
}
//编辑
export async function editRightMsgList (params) {
  return request('/wjcApi/yfSideMsgInfo', {
  method: 'POST',
  data: params,
  });
}
//删除
export async function deleteRightMsgList (params) {
  return request(`/wjcApi/yfSideMsgInfo/${params}`, {
  method: 'Delete',
  });
}
//c查询咨询记录分页
export async function getConsultList (params) {
  return request('/wjcApi/consult/list',{
  method: 'POST',
  data: params,
  });
}