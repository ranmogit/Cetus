import request from '@/utils/request';

// const proxyHost= process.env == 'produciton' ? '/im' : '/wjcApi'

const  proxyHost = window.location.host == 'localhost:8000' ? '/wjcApi' : '/im'
const token =window.localStorage.getItem('token')||''
export interface ImQueryCusListParamsType {
    type: number;
  }

export async function queryCusList(data) {
	let type = data.type
    return request(`${proxyHost}/talkMag/queryCusList?type=${type}`, {
      method: 'GET',
	});
}

export async function httpQueryUncount() {
    return request(`${proxyHost}/msgUnread/queryUnReadMsgCount`, {
      method: 'GET',
    });
}
  
export async function httpTalkRecord(params) {
    return request(`${proxyHost}/talkMag/queryMsgList`, {
	  method: 'POST',
	  data: params,
	});
	
}
  
//清楚未读数字
export async function clearMsgCount(params) {
    return request(`${proxyHost}/msgUnread/clearUnReadMsgCount`, {
	  method: 'POst',
	  data: params,
    });
}

  
// 发送消息
export async function postMsg(params) {
    return request(`${proxyHost}/im/sendMsg`, {
	  method: 'POST',
	  data: params,
    });
}

// 上传
export async function uploadFile(params) {
    return request(`${proxyHost}/wx/uploadMedia`, {
	  method: 'POST',
	  data: params,
    });
}

//获取侧边栏
export async function getRightMsgList (params) {
  return request(`${proxyHost}/yfSideMsgInfo/list`, {
  method: 'POST',
  data: params,
  });
}
//新增
export async function addRightMsgList (params) {
  return request(`${proxyHost}/yfSideMsgInfo`, {
  method: 'POST',
  data: params,
  });
}
//编辑
export async function editRightMsgList (params) {
  return request(`${proxyHost}/yfSideMsgInfo`, {
  method: 'PUT',
  data: params,
  });
}
//删除
export async function deleteRightMsgList (params) {
  return request(`${proxyHost}/yfSideMsgInfo/${params}`, {
  method: 'Delete',
  });
}
//c查询咨询记录分页
export async function getConsultList (params) {
  return request(`${proxyHost}/consult/list`,{
  method: 'POST',
  data: params,
  });
}
// 获取用户信息
export async function getUserInfo(id) {
  return request(`${proxyHost}/yfSideMsgInfo/getSideCusInfo?openId=${id}`, {
    method: 'GET',
  });
}

//获取文章列表
export async function getArticleList (params) {
  return request(`hbyfApi/material/article/list`,{
  method: 'POST',
  data: params,
  });
}
//获取产品url
export async function getproductUrl (params) {
  return request(`hbyfApi/hbyfProductMain/generateProductPromotionLinks`,{
  method: 'POST',
  data: params,
  });
}

//获取产品列表
export async function getproductPageList (params) {
  return request(`hbyfApi/hbyfProductMain/findHbyfProductMainList`,{
  method: 'POST',
  data: params,
  });
}

export function connectChat() {
  let timer = null
  timer = setInterval(()=>{
    // console.log('xxxx')
    return 'conneted'
  },1000)
}