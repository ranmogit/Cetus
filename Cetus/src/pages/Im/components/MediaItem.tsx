import React from 'react';
import { PlayCircleOutlined } from '@ant-design/icons';
import basicUrl from '../../../../config/basicUrl';
const host = basicUrl();
const MediaItem = ({ itemProps, originalId }) => {
  let dom = null;
  const playHandler = () => {
    let audio = new Audio();
    audio.controls = true;
    audio.src = itemProps.msg;
    audio.style.visibility = 'hidden';
    audio.id = 'playAudio';
    // document.body.appendChild(audio)
    if (!document.getElementById('playAudio')) {
      document.body.appendChild(audio);
    }
    audio.play();
  };
  const locationHref = (url) => {
    window.open(url);
  };
  switch (itemProps.msgType) {
    case 'image':
      dom = (
        <div>
          <img
            style={{ maxWidth: '350px', height: 'auto' }}
            src={`${host}/wx/getMediaSource?mediaId=${itemProps.msg}&header=image&originalId=${originalId}`}
            alt=""
          />
        </div>
      );
      break;
    case 'voice':
      dom = (
        <div onClick={() => playHandler()}>
          <audio src={itemProps.msg}> </audio>
          <PlayCircleOutlined style={{ fontSize: '20px' }} />
        </div>
      );
      break;
    case 'news':
      let item = JSON.parse(itemProps.msg);
      dom = (
        <div>
          <a
            onClick={() => {
              locationHref(item.url);
            }}
          >
            {item.title}
          </a>
        </div>
      );
      break;
    case 'default':
      dom = <div>media message</div>;
      break;
  }
  return dom;
};

export default MediaItem;
