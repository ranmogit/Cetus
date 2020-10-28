import request from '@/utils/request';
import { TableListParams, TableListItem } from '../models/sem';

//获取sem分页
export async function querySEM(data: TableListParams) {
  return request('/ljhApi/sem/yfMaterialPublish/list', {
    method:'POST',
    data,
  });
}
// 获取查询全部渠道信息
export async function queryAllChannels(params:{}) {
  return request('/ljhApi/sem/yfMaterialChannel/selectAllChannel', {
    method:'POST',
    data:params,
  });
}
//获取全部素材ID
export async function queryAllArticleIds(params:{}) {
  return request('/ljhApi/sem/yfMaterialPublish/selectArticleId', {
    method:'POST',
    data:params,
  });
}

////查询全部公众号
export async function queryAllOfficialAccounts(params:{}) {
  return request('/ljhApi/sem/yfWxOfficialAccount/selectAllOfficialAccount', {
    method:'POST',
    data:params,
  });
}

// 查询素材分页信息
export async function queryAllArticleList(params:{}) {
  return request('/ljhApi/sem/yfMaterialArticle/list', {
    method:'POST',
    data:params,
  });
}

//通过id获取文章内容
export async function queryArticleContent(id) {
  return request(`/ljhApi/sem/yfMaterialArticle/${id}`, {
    method:'get'
  });
}

//通过渠道查询域名列表
export async function queryDominList(id) {
  return request(`/ljhApi/sem/yfMaterialDomain/selectDomainByChannelId/${id}`, {
    method:'get'
  });
}

//获取全部模板
export async function getAllTemplate(params) {
  return request(`/ljhApi/sem/yfMaterialTemplate/selectAllTemplate`, {
    method:'post',
    // data:params
  });
}

//新增sem
export async function addSEMitem(params) {
  return request(`/ljhApi/sem/yfMaterialPublish/saveMaterialPublish`, {
    method:'post',
    data:params
  });
}

//通过id获取sem详情
export async function getSEMDetail(id) {
  return request(`/ljhApi/sem/yfMaterialPublish/${id}`, {
    method:'get'
  });
}
//编辑
export async function editSEMitem(params) {
  return request(`/ljhApi/sem/yfMaterialPublish`, {
    method:'put',
    data:params
  });
}
// 删除
export async function deleteSEMItem(id) {
  return request(`/ljhApi/sem/yfMaterialPublish/${id}`, {
    method:'delete'
  });
}

export async function removeSEM(params: { key: number[] }) {
  return request('/api/rule', {
    method: 'POST',
    data: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addSEM(params: TableListItem) {
  return request('/api/rule', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateSEM(params: TableListParams) {
  return request('/api/rule', {
    method: 'POST',
    data: {
      ...params,
      method: 'update',
    },
  });
}
