import React ,{useState} from 'react'
import style from '../index.less'
import { SmileOutlined ,FolderOutlined ,AudioOutlined} from '@ant-design/icons';
import { Button ,Upload ,message,Modal} from 'antd';
import { connect } from 'umi';
import Recorder from 'js-audio-recorder';
const token:string = window.localStorage.getItem('token')||''
const baseUrl = process.env.NODE_ENV === "production"? '' :'192.168.'

let recorder:any = null;
let playTimer = null;
const ChatActions =({chat,dispatch})=>{
    const [modalVisible, setModalVisible] = useState(false);
    const [isRecording,setIsRecording] = useState(false);
    const [duration,setduration] = useState(0);
    const collectData =()=>{
        return {
            sampleBits: 16,
            sampleRate: 16000,
            numChannels: 1,
            compiling: false, 
        }
    }
    const submitHandler = ()=>{
        console.log(chat)
        let params = chat.chatDto
        dispatch({
            type:'chat/postImMsg',
            payload:params
        })
    }
    const clearHandler= ()=>{
        let inputChat= document.getElementById('chatInput')
        inputChat.value = ""
    }
    const upLoadConfig ={ 
        name: 'file',
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        headers: {
          token: token,
        },
        onChange(info) {
            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
              }
              if (info.file.status === 'done') {
                message.success(`${info.file.name} file uploaded successfully`);
              } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
              }
        },
        showUploadList:false,
        customRequest(){
            console.log(1111)
        }
    }
    const handleOk  =() =>{
        setModalVisible(false);
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
                // console.log(recorder.duration);
                // console.log(recorder.fileSize);

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
                >
                <p> <Button type="primary" onClick={startRecord}> 开始录音</Button>  <Button onClick={endRecord}>停止录音</Button></p>
                <p>录音时长{duration} s</p>
            </Modal>
        </div>
    )
}
const  mapStateToProps = ({chat})=>{
    return {chat}
}
export default connect(mapStateToProps) (ChatActions)