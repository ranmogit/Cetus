import React ,{useState,useEffect,useRef} from 'react'
import E from 'wangeditor'

interface EditorParamsProps{
    value?:string | undefined;
    onChange:()=>void
}
interface ConfigProps{
    onchange:(param:string)=>void;
    uploadImgShowBase64:boolean;
}
interface TxtProps{
    html:()=>void
}
interface EditorConstructorProps{
    config:ConfigProps;
    create:()=>void;
    txt:TxtProps;
}
const Editor: React.FC<EditorParamsProps> = props=>{
    const { value, onChange} = props;
    const containerRef = useRef();

    useEffect(()=>{
        const editor:EditorConstructorProps = new E(containerRef.current);
        editor.config.onchange = (html) => {
            onChange(html)
        };
        editor.config.uploadImgShowBase64 = true; // 图片base64
        editor.create();
        // 设置初始内容
        editor.txt.html(value);
        // editor.txt.append(value)
        return ()=>{
            editor.destroy()
        }
    },[value])
    return <div ref={containerRef}></div>
}

export default Editor