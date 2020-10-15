 const basicUrl = ()=>{
    let host= ''
    if( window.location.host == 'localhost:8000'){
        host = 'http://wxxtest.jbx188.com/im'
    }else {
        host = '/'
    }
    return host
}
export default basicUrl