import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueI18n from 'vue-i18n'
import CKEditor from 'ckeditor4-vue';
import FilterList from '@/utils/filters'
import $lib from '@/lib/vue-prototype'
import store from './store'
import './lib/ant-design'
import './lib/prototype'
import zh_CN from 'ant-design-vue/lib/locale-provider/zh_CN';
import en_GB from 'ant-design-vue/lib/locale-provider/en_GB';
import th_TH from 'ant-design-vue/lib/locale-provider/th_TH';
import zh from "@/i18n/zh";
import en from "@/i18n/en";
import th from "@/i18n/th";
import moment from 'moment';
import 'moment/locale/zh-cn';
import 'moment/locale/en-gb';
import ajax from "./lib/ajax";
import CollapseCard from "@/components/CollapseCard";
import NumberInput from "@/components/NumberInput";
import DateSelect from "@/components/DateSelect";

const { create, all } = require('mathjs')
const config = {
    number: 'BigNumber',
    precision: 20
}
const math = create(all, config)

Vue.prototype.$math = math
Vue.use(CollapseCard)
Vue.component('CollapseCard', CollapseCard);
Vue.component('NumberInput', NumberInput);
Vue.component('DateSelect', DateSelect);

Vue.prototype.$EventBus = new Vue();
Vue.use(VueI18n)
Vue.use(CKEditor);
Vue.use(FilterList);

Vue.config.productionTip = false
Vue.prototype.ajax = ajax;
Vue.prototype.global = Vue.prototype.global || {}
Vue.prototype.$lib = $lib
const version = '0.5.12';
sessionStorage.setItem('version', version);
console.log('version: %cv' + version, "font-style: italic;color:red")
let locale = localStorage.getItem('language')
if (!locale) {
    locale = 'en'
    localStorage.setItem('language', locale);
}
Vue.prototype.antd = {
    langLib: {
        zh: zh_CN,
        en: en_GB,
        th: th_TH
    },
    lang: locale
}
const i18n = new VueI18n({
    locale: locale,
    messages: {
        zh,
        en,
        th
    },
    silentTranslationWarn: true
});

moment.locale(locale === 'zh' ? 'zh-cn' : 'en-gb');
Vue.prototype.$moment = moment
Vue.prototype.global.i18n = i18n

// directives
import "./directive/buttonAuth";
// buttonConfig
import buttonConfig from "./mock/buttonConfig.json";

Vue.prototype.$buttonConfig = buttonConfig

// import menuList from "@/directive/menuList";

router.beforeEach((to, from, next) => {
    const sessionid = sessionStorage.getItem("sessionid");
    if (to.matched.length > 0) {
        if (sessionid != 'undefined' && sessionid) {
            // 预设buuton控制
            const authRawList = JSON.parse(sessionStorage.getItem('authRawList'))
            // console.log(authRawList)
            if (authRawList) {
                let currentBtn = [];
                currentBtn = authRawList.filter(b => {
                    if (b.children.len > 0) {
                        const re = b.children.filter(d => {
                            return d.href == to.path && d.menuType == 'view'
                        })[0] || {}
                        return re
                    } else {
                        return to.path.indexOf(b.href) >= 0 && b.menuType == 'view'
                    }
                })[0] || {};
                const authBtns = currentBtn.buttons;
                // console.log('currentBtn', currentBtn)
                sessionStorage.setItem('authBtns', JSON.stringify(authBtns))
            }
            next();
        } else {
            next();
            // next({
            //     path: "/login",
            //     query: { redirect: to.fullPath } // 将要跳转路由的path作为参数，传递到登录页面
            // });
        }
    } else {
        next({
            path: '/exception404'
        })
    }
});

new Vue({
    router,
    store,
    i18n,
    render: h => h(App)
}).$mount('#app')
