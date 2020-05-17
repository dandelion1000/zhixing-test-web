import Vue from 'vue';
import Router from 'vue-router';
// import menuModule from './router';
Vue.use(Router);
import HomeIndex from '@/views/index.vue';
import Login from '@/views/login/index.vue';
import SealCar from '@/views/car/seal.vue';
import carDetail from '@/views/car/detail.vue';
const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeIndex,
            meta: {
                title: ''
            },
        },
        {
            path: '/seal',
            name: 'seal',
            component: SealCar,
            meta: {
                title: ''
            },
        }, {
            path: '/carDetail/:id',
            name: 'carDetail',
            component: carDetail,
            meta: {
                title: ''
            },
        },
        {
            path: '/login',
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
    if (to.meta.title) {
        document.title = to.meta.title;
    }
});

export default router;
