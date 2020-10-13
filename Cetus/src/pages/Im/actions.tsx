export const clearInputTxt = () =>{
    let inputChat= document.getElementById('chatInput')
    inputChat.value = ""
    return 
}

export const scollTo =()=>{
    let chatItemBox = document.getElementById('chatItemBox')
    let height = chatItemBox.offsetHeight
    chatItemBox.scrollTop = 2000
    // console.log(chatItemBox.scrollTop ,chatItemBox.offsetHeight)
}
export const scorllFunc =() =>{
   
}