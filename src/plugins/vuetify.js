import 'material-design-icons-iconfont/dist/material-design-icons.css'
import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify, {
    iconfont: 'mdi'
});

import en from 'vuetify/es5/locale/en'
import ru from 'vuetify/es5/locale/ru'

export default new Vuetify({
    lang: {
        locales: {ru, en},
        current: 'ru'
    }
});
