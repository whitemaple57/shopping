import Mock from 'mockjs';
//引入json数据格式
//webpack默认对外暴露的：图片丶json数据格式
import banner from './banners.json';
import floor from './floors.json';
//2个参数，请求地址和请求数据
Mock.mock("/mock/banner",{code:200,data:banner})
Mock.mock("/mock/floor",{code:200,data:floor})