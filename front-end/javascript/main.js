import Vue from 'vue';
import x5GMaps from 'x5-gmaps';
import 'bootstrap';

Vue.use(x5GMaps, MAPS_API_KEY);

import App from './App';

new Vue({
            render: h => h(App)
        }).$mount('#app')