//回调函数存储
export const setToken = (token) =>{
    localStorage.setItem('TOKEN',token);
}
//获得存储
export const getToken =()=>{
    return localStorage.getItem('TOKEN');
}
//清除本地存储token
export const removeToken=()=>{
localStorage.removeItem("TOKEN");
}