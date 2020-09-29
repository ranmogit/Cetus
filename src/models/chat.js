/*
 * @Descripttion: 
 * @version: 
 * @Author: Tom Dai
 * @Date: 2020-09-27 16:22:53
 * @LastEditors: Tom Dai
 * @LastEditTime: 2020-09-29 10:57:20
 */
interface chatModelState {
    chatList: array
}
const chatModel = {
    namespace: 'chat',
    state: chatModelState,z
    reducers: {},
    effects: {},
    subscriptions:{}
}
export default chatModel
