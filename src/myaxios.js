import axios from "axios";
import Vue from "vue";
// import myconf from "/public/front.conf.js"
// axios.defaults.baseURL= "http://localhost:8080";
// axios.defaults.withCredentials=true
axios.defaults.baseURL=myconf.passengerServer;
axios.gdKey=myconf.gdKey
axios.gdCode=myconf.gdCode

// axios.defaults.transformResponse=(data)=>{
//     return "this is a 测试"
// }

Vue.prototype.$axios = axios