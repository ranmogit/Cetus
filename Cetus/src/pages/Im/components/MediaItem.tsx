import React from "react"
import { PlayCircleOutlined } from '@ant-design/icons'
const host = 'http://192.168.1.160:9443/hbyfIm'
const MediaItem = ({ itemProps, originalId }) => {
    let dom = null
    const playHandler = () => {
        let audio = new Audio()
        audio.controls = true
        audio.src = itemProps.msg
        audio.style.visibility = "hidden"
        audio.id = "playAudio"
        // document.body.appendChild(audio)
        if (!document.getElementById('playAudio')) {
            document.body.appendChild(audio)
        }
        audio.play()
    }
    switch (itemProps.msgType) {
        case 'image':
            dom = <div>
                <img style={{ maxWidth: '350px', height: "auto" }} src={`${host}/wx/getMediaSource?mediaId=${itemProps.msg}&header=image&originalId=${originalId}`} alt="" />
            </div>
            break
        case 'voice':
            dom = <div onClick={() => playHandler()}>
                <audio src={itemProps.msg}  > </audio>
                <PlayCircleOutlined  style={{fontSize:'20px'}}/>
            </div>
            break
        case 'default':
            dom = <div>media message</div>
            break
    }
    return dom
}

export default MediaItem