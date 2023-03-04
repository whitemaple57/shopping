import { v4 as uuidv4 } from 'uuid';
//生成随机字符串，持久存储（不可变）
export const getUUID = () =>{
let uuid_token = localStorage.getItem('UUIDTOKEN');
if(!uuid_token){
    //生成临时游客身份
    uuid_token = uuidv4();
    localStorage.setItem('UUIDTOKEN',uuid_token);
}
return uuid_token;
}