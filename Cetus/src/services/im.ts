import request from '@/utils/request';

export interface ImQueryCusListParamsType {
    type: number;
  }

  export async function queryCusList(type: number) {
    return request(`/wjcApi/talkMag/queryCusList?type=${type}`, {
      method: 'GET',
    });
  }
  