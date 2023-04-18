import axios from "axios";
import Vue from "vue";
axios.defaults.baseURL= myconf.passengerServer;
// axios.defaults.withCredentials=true
// axios.defaults.baseURL=myconf.passengerServer;
axios.gdKey=myconf.gdKey
axios.gdCode=myconf.gdCode

// axios.defaults.transformResponse=(data)=>{
//     return "this is a 测试"
// }

Vue.prototype.$axios = axios