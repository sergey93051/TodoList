require('./bootstrap');

import { InertiaApp } from '@inertiajs/inertia-vue'
import Vue from 'vue'
import store from './store'


Vue.use(InertiaApp)



const app = document.getElementById('app')
new Vue({
    store,
    render: h => h(InertiaApp, {
        props: {
            initialPage: JSON.parse(app.dataset.page),
            resolveComponent: name => require(`./Todo/${name}`).default,
        },
    }),
}).$mount(app)