import React ,{useState} from 'react'
import style from '../index.less'
import { SmileOutlined ,FolderOutlined ,AudioOutlined} from '@ant-design/icons';
import { Button ,Upload ,message,Modal} from 'antd';
import { connect } from 'umi';
import Recorder from 'js-audio-recorder';
const token:string = window.localStorage.getItem('token')||''
const baseUrl = process.env.NODE_ENV === "production"? '' :'192.168.'
const ChatActions =({chat,dispatch})=>{
    let recorder = new Recorder();
    const [modalVisible, setModalVisible] = useState(false);
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
    // const 
    return (
        <div  className={style.actions}>
            <div className={style.left}>
                <div className={style.actionItem}>
                    <SmileOutlined className={style.icon}></SmileOutlined>
                </div>
                <div className={style.actionItem}>
                   <Upload> <FolderOutlined className={style.icon} /> </Upload>
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
                onCancel={()=>{setModalVisible(false)}}
                >
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Modal>
        </div>
    )
}
const  mapStateToProps = ({chat})=>{
    return {chat}
}
export default connect(mapStateToProps) (ChatActions)