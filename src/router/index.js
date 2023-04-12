import Vue from 'vue'
import VueRouter from 'vue-router'
import {Tabbar, TabbarItem} from 'vant';
import LoginView from "@/views/LoginView";
import Verification from "@/views/Verification";
import registerView from "@/views/RegisterView";
import HomeView from "@/views/HomeView";
import personalView from "@/views/PersonalView";
import settingView from "@/views/SettingView";
import BindingPhoneView from "@/views/BindingPhoneView";
import AmendPwd from "@/views/AmendPwdView";
import AmendPwdView from "@/views/AmendPwdView";
import PosterView from "@/views/PosterView";

Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(VueRouter)

const routes = [

    {
        path: '/',
        name: 'posterView',
        component: PosterView
    },

    {
        path: '/login',
        name: 'login',
        component: LoginView
    },

    {
        path: '/verification',
        name: 'verification',
        component: Verification
    },

    {
        path: '/registerView',
        name: 'registerView',
        component: registerView
    },
    {
        path: '/home',
        name: 'home',
        component: HomeView
    },
    {//个人中心
        path: '/personal',
        name: 'personal',
        component: personalView
    },
    {//设置页面
        path: '/setting',
        name: 'setting',
        component: settingView
    },


    {//换绑手机页面
        path: '/bindingPhone',
        name: 'bindingPhone',
        component: BindingPhoneView
    },
    {//修改密码页面
        path: '/amendPwd',
        name: 'amendPwd',
        component: AmendPwdView
    },


]

const router = new VueRouter({
    routes
})

export default router
