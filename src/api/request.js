import axios from "axios";
// import { MessageBox, Message } from "element-ui";
// import store from "@/store";
// import { getToken } from "@/utils/auth";

let util = {};
const baseUrl = 'api'
// 1. 创建axios实例
// const service = axios.create({
//   // baseURL: process.env.VUE_APP_BASE_API, // url基础地址，解决不同数据源url变化问题
//   // withCredentials: true, // 跨域时若要发送cookies需设置该选项
//   timeout: 600000,// 超时
//   headers: {
//     'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
//   }

// });
util.axios = axios.create({
  // xsrfHeaderName: 'X-XSRF-TOKEN' + window.localStorage.XSRF_TOKEN,
  baseURL: baseUrl,
  timeout: 600000,
  withCredentials: true
});

// 2. 请求拦截
// service.interceptors.request.use(
//   config => {
//     // do something
//     // 把令牌添加到了请求头中
//     if (store.getters.token) {
//       // 设置令牌请求头
//       config.headers["X-Token"] = getToken();
//     }
//     return config;
//   },
//   error => {
//     // 请求错误预处理
//     //console.log(error) // for debug
//     return Promise.reject(error);
//   }
// );

// 3. 响应拦截
// service.interceptors.response.use(
//   // 通过自定义code判定响应状态，也可以通过HTTP状态码判定
//   response => {
//     // 仅返回数据部分
//     const res = response.data;
//     console.log(res)
//     console.log('res++++++++++++=')
//     // code不为1则判定为一个错误
//     if (res.code !== 1) {
//       Message({
//         message: res.message || "Error",
//         type: "error",
//         duration: 5 * 1000
//       });

//       // 假设：10008-非法令牌; 10012-其他客户端已登录; 10014-令牌过期;
  //     if (res.code === 10008 || res.code === 10012 || res.code === 10014) {
  //       // 重新登录
  //       MessageBox.confirm(
  //         "登录状态异常，请重新登录",
  //         "确认登录信息",
  //         {
  //           confirmButtonText: "重新登录",
  //           cancelButtonText: "取消",
  //           type: "warning"
  //         }
  //       ).then(() => {
  //         store.dispatch("user/resetToken").then(() => {
  //           location.reload();
  //         });
  //       });
  //     }
  //     return Promise.reject(new Error(res.message || "Error"));
  //   } else {
  //     return res;
  //   }
  // },
  // error => {
  //   //console.log("err" + error); // for debug
  //   Message({
  //     message: error.message,
  //     type: "error",
  //     duration: 5 * 1000
  //   });
  //   return Promise.reject(error);
  // }
// );

export default util;
