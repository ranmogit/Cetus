import React ,{useState} from 'react'
import style from '../index.less'
import { SmileOutlined ,FolderOutlined ,AudioOutlined} from '@ant-design/icons';
import { Button ,Upload ,message,Modal} from 'antd';
import { connect } from 'umi';
import Recorder from 'js-audio-recorder';
import {clearInputTxt ,scollTo} from '../actions'
const token:string = window.localStorage.getItem('token')||''
import {uploadFile} from '@/services/im'
import  basicUrl  from '../../../../config/basicUrl'
const host = window.location.host == 'localhost:8000' ? '/wjcApi' :'http://cetus.jbx188.com/im';
const uploadUrl = window.location.host == 'localhost:8000' ? '/wjcApi' :'/im'

let  lamejs = require("lamejs");
let recorder:any = null;
let playTimer = null;
const ChatActions =({chat,dispatch})=>{
    const [modalVisible, setModalVisible] = useState(false);
    const [duration,setduration] = useState(0);
    const [imgVisible,setImgVisible] = useState(false)
    const [mediaId,setmediaId] = useState('')
    const collectData =()=>{
        return {
            sampleBits: 16,
            sampleRate: 48000,
            numChannels: 1,
            compiling: false, 
        }
    }
    const submitHandler = async ()=>{
        let params = chat.chatDto
        let chatParams = {
            openId: chat.targetUser.openId,
            pageNo: 1,
            pageSize: 10
        }
        await dispatch({
            type:'chat/postImMsg',
            payload:params
        })
        
        await dispatch({
            type:'chat/getChatRecord',
            payload:chatParams
        })
        clearHandler()
        scollTo()
    }
    const clearHandler= ()=>{
        let inputChat= document.getElementById('chatInput')
        inputChat.value = ""
        let params = {
            content:'',
            toUser: chat.targetUser.openId,
            msgType: 0,
            cusSource: chat.targetUser.originalId
        }
        if(chat.targetUser.openId){
            dispatch({
                type:'chat/setMsgDto',
                payload:params
            })
        }
    }
    const upLoadConfig ={ 
        name: 'file',
        action: `${uploadUrl}/wx/uploadMedia`,
        headers: {
          token: token,
        },
        data: {
            originalId: chat.targetUser.originalId,
            mediaType: 'image',
        },
        beforeUpload:(file)=>{
            console.log(file)
            const typeMap = {
                'image/png':true,
                'image/jpeg': true,
                'image/jpg': true
            }
            if(file.size>9200000){
                message.error('文件大小限制在5m')
                return false
            }
            else if(!typeMap[file.type]){
                message.error('文件类型不合法')
                return false
            }
        },
        onChange(info) {
            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
              }
              if (info.file.status === 'done') {
                message.success(`${info.file.name} file uploaded successfully`);
                if(info.file.response && info.file.response.data.media_id){
                    setmediaId(info.file.response.data.media_id)
                    setImgVisible(true)
                    console.log(mediaId)
                }
                
                
                // setMediaObj = 
              } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
              }
        },
        showUploadList:false,
    }
    const handleSendImg = () =>{
        let params = {
            content: mediaId,
            toUser: chat.targetUser.openId,
            msgType: 1,
            cusSource: chat.targetUser.originalId
        }
        dispatch({
            type:'chat/postImMsg',
            payload: params
        })
        setImgVisible(false)

    }
    const handleOk  =() =>{
        // if(recorder)
        if(recorder.duration < 1 || recorder.duration >60){
            message.error('语音不能太短或者太长哦')
            return
        }
        let blob = convertToMp3(recorder)
        console.log(blob)
        const formData = new FormData()
        const files = new window.File([blob], '录音.mp3', { type: 'audio/mp3' })
        formData.append('upfile', blob, 'recorder.mp3')
        formData.append('file', files)
        formData.append('originalId',chat.targetUser.originalId)
        formData.append('mediaType', 'voice')
        uploadFile(formData).then(res=>{
            console.log(res)
            if(res.isSuccess) {
                setmediaId(res.data.media_id)
                let params = {
                    content: res.data.media_id,
                    toUser: chat.targetUser.openId,
                    msgType: 2,
                    cusSource: chat.targetUser.originalId
                }
                dispatch({
                    type:'chat/postImMsg',
                    payload: params
                })
                setModalVisible(false)
                destroyRecord()
            }
        })
        setModalVisible(false);
    }

    function convertToMp3(wavDataView) {
        // 获取wav头信息
    // 此处其实可以不用去读wav头信息，毕竟有对应的config配置
    
        const mp3enc = new lamejs.Mp3Encoder(1,48000, 128);
        // 获取左右通道数据
        const result = recorder.getChannelData()
        const buffer = [];
    
        const leftData = result.left && new Int16Array(result.left.buffer, 0, result.left.byteLength / 2);
        const rightData = result.right && new Int16Array(result.right.buffer, 0, result.right.byteLength / 2);
        const remaining = leftData.length + (rightData ? rightData.length : 0);
    
        const maxSamples = 1152;
        for (let i = 0; i < remaining; i += maxSamples) {
            const left = leftData.subarray(i, i + maxSamples);
            let right = null;
            let mp3buf = null;
            mp3buf = mp3enc.encodeBuffer(left, right);
            if (mp3buf.length > 0) {
                buffer.push(mp3buf);
            }
        }
    
        const enc = mp3enc.flush();
    
        if (enc.length > 0) {
            buffer.push(enc);
        }
        return new Blob(buffer, { type: 'audio/mp3' });
    }
    const hanleOpenModel =() =>{
        setModalVisible(true);
    }
    const startRecord=()=>{
        clearPlay()
        const config = collectData();
        if (!recorder) {
            console.log("sss")
            recorder = new Recorder(config);
            recorder.onprogress = (params) => {
                setduration(params.duration.toFixed(5))
                // 此处控制数据的收集频率
                if (config.compiling) {
                    console.log('音频总数据：', params.data);
                }
            }
            // 定时获取录音的数据并播放
            config.compiling && (playTimer = setInterval(() => {
                if (!recorder) {
                    return;
                }

                let newData = recorder.getNextData();
                if (!newData.length) {
                    return;
                }
                let byteLength = newData[0].byteLength
                let buffer = new ArrayBuffer(newData.length * byteLength)
                let dataView = new DataView(buffer)

                    // 数据合并
                for (let i = 0, iLen = newData.length; i < iLen; ++i) {
                    for (let j = 0, jLen = newData[i].byteLength; j < jLen; ++j) {
                        dataView.setInt8(i * byteLength + j, newData[i].getInt8(j))
                    }
                }

                // 将录音数据转成WAV格式，并播放
                let a = encodeWAV(dataView, config.sampleRate, config.sampleRate, config.numChannels, config.sampleBits)
                let blob: any = new Blob([ a ], { type: 'audio/wav' });

                blob.arrayBuffer().then((arraybuffer) => {
                    //音频数据流
                });
            }, 3000))

        }else{
            recorder.stop();
        }
        recorder.start().then(() => {
            console.log('开始录音');
        }, (error) => {
            console.log(`异常了,${error.name}:${error.message}`);
        });

    }
    const clearPlay=()=>{
        if (playTimer) {
            clearInterval(playTimer);
            playTimer = null;
        }
    }
    const endRecord = () => {
        recorder && recorder.stop();
        console.log('结束录音');
    }
    const destroyRecord = () => {
        clearPlay();
        if (recorder) {
            recorder.destroy().then(() => {
                console.log('销毁实例');
                recorder = null;
                setduration(0)
            });
        }
    }
    // const 
    return (
        <div  className={style.actions}>
            <div className={style.left}>
                <div className={style.actionItem}>
                    <SmileOutlined className={style.icon}></SmileOutlined>
                </div>
                <div className={style.actionItem}>
                   <Upload {...upLoadConfig}> <FolderOutlined className={style.icon} /> </Upload>
                </div> 
                <div className={style.actionItem}><AudioOutlined className={style.icon}  onClick={hanleOpenModel}/></div>
            </div>
            <div className={style.right}>
            <Button onClick={()=>clearHandler()}> 清空</Button>
            <Button type="primary" onClick={()=>submitHandler()}> 发送</Button>
            </div>
            <Modal
                title="录音操作"
                visible={modalVisible}
                onOk={handleOk}
                onCancel={()=>{setModalVisible(false);destroyRecord()}}
                okText='发送'
                cancelText="取消"
                >
                <p> <Button type="primary" onClick={startRecord}> 开始录音</Button>  <Button onClick={endRecord}>停止录音</Button></p>
                <p>录音时长{duration} s</p>
            </Modal>
            <Modal
             title="上传图片"
             visible={imgVisible}
             onOk={handleSendImg}
             onCancel={()=>{setImgVisible(false)}}
             >
                 <img src={`${host}/wx/getMediaSource?mediaId=${mediaId}&header=image&originalId=${chat.targetUser.originalId}`} style={{width:'450px',height:'auto'}} alt=""/>
            </Modal>
        </div>
    )
}
const  mapStateToProps = ({chat})=>{
    return {chat}
}
export default connect(mapStateToProps) (ChatActions)