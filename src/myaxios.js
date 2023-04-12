import axios from "axios";
import Vue from "vue";
// import myconfig from "../public/front.conf"
axios.defaults.baseURL= "http://localhost:8080";
axios.defaults.withCredentials=true
// axios.defaults.baseURL=myconfig.apiServer

// axios.defaults.transformResponse=(data)=>{
//     return "this is a 测试"
// }



Vue.prototype.$axios = axios