import Vue from 'vue';
import Router from 'vue-router';
// import menuModule from './router';
Vue.use(Router);
import HomeIndex from '@/views/index.vue';
import Login from '@/views/login/index.vue';
import SealCar from '@/views/car/seal.vue';
import VipCard from '@/views/user/vipcard.vue';
import carDetail from '@/views/car/detail.vue';
const router = new Router({
    // mode: 'history',
    routes: [
        {
            path: '/home',
            name: 'home',
            component: HomeIndex,
            meta: {
                title: '汽车列表'
            },
        },
        {
            path: '/vipcard',
            name: 'vipcard',
            component: VipCard,
            meta: {
                title: '会员卡'
            },
        },
        {
            path: '/seal',
            name: 'seal',
            component: SealCar,
            meta: {
                title: '卖车'
            },
        }, {
            path: '/carDetail/:id',
            name: 'carDetail',
            component: carDetail,
            meta: {
                title: '汽车详情'
            },
        },
        {
            path: '/',
            name: 'login',
            component: Login,
            meta: {
                title: ''
            },
        },
        {
            path: '*',
            name: 'error_404',
            component: () =>
                import ('@/views/error/error_404.vue')
        },
        {
            path: '/unauthorized',
            name: 'error_401',
            component: () =>
                import ('@/views/error/error_401.vue')
        },
        // ...generateRoutesFromMenu(menuModule.state.contents)
    ]
});

/**
 *
 *
 * @param {any} [menu=[]]
 * @param {any} [routes=[]]
 * @returns
 */
function generateRoutesFromMenu(menu = [], routes = []) {
    for (let i = 0, l = menu.length; i < l; i++) {
        let item = menu[i];
        if (item.path) {
            routes.push(item);
        }
        if (!item.component) {
            generateRoutesFromMenu(item.contents, routes);
        }
    }
    return routes;
}

router.beforeEach((to, from, next) => {
    next();
    const appid = 'wx1683897a0af2da49';
    const redirect_uri = 'http%3A%2F%2Fwww.cheshouyun.com';
    // if (local) {

    // }
    // location.href(`https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${redirect_uri}&response_type=code&scope=snsapi_base#wechat_redirect`);
    if (to.meta.title) {
        document.title = to.meta.title;
    }
});

export default router;
