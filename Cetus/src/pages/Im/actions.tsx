export const clearInputTxt = () =>{
    let inputChat= document.getElementById('chatInput')
    inputChat.value = ""
    return 
}

export const scollTo =()=>{
    let chatItemBox = document.getElementById('chatItemBox')
    let height = chatItemBox.scrollHeight + 120
    setTimeout(() => {
            chatItemBox.scrollTop = height
    }, 500);
}
export const scorllFunc =() =>{
   
}