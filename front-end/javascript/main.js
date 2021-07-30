import Vue from 'vue';
import x5GMaps from 'x5-gmaps';
import 'bootstrap';

Vue.use(x5GMaps, 'AIzaSyAUFGJ0wjNVSr8HXtYFNIwXjPrHSYblyr4');

import App from './App';

new Vue({
            render: h => h(App)
        }).$mount('#app')