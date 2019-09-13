/**
 * @file entry
 * @author Starink(161250119@smail.nju.edu.cn)
 */

import Vue from 'vue';
import Meta from 'vue-meta';

import { createRouter } from '@/.lavas/router';
import { createStore } from '@/.lavas/store';
import AppComponent from './App.vue';
import VueRouter from 'vue-router';

import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import VeCandle from 'v-charts/lib/candle.common'
const F2 = require('@antv/f2');

Vue.use(Meta);
Vue.use(Antd);
Vue.use(VueRouter);
Vue.component(VeCandle.name, VeCandle);
Vue.prototype.$F2 = F2;

Vue.config.productionTip = false;

export function createApp() {
    let router = createRouter();
    let store = createStore();
    let App = Vue.extend({
        router,
        store,
        ...AppComponent
    });
    return { App, router, store };
}

if (module.hot) {
    module.hot.accept();
}

import http from '../httpConfig/url_config';
Vue.prototype.$axios = http;