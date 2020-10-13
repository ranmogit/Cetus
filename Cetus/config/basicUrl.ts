 const basicUrl = ()=>{
    let host= ''
    if( process.env == 'produciton'){
        host = '/'
    }else {
        host = 'http://wxxtest.jbx188.com/im'
    }
    return host
}
export default basicUrl