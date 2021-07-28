import Vue from 'vue';
import 'bootstrap';

import apiTokenForm from './components/api-token-form'

Vue.component('api-token-form', apiTokenForm);

new Vue({
            el: '#app',
        });