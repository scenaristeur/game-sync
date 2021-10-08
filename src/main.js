import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import SolidSync from './plugins/solid-sync';
Vue.use(SolidSync, {store: store});
// import NetworkPlugin from './plugins/network';
// Vue.use(NetworkPlugin, {store: store});

import { Network } from "vue-vis-network";
Vue.component('network', Network);

import VueSocialSharing from 'vue-social-sharing'
Vue.use(VueSocialSharing);

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

Vue.config.productionTip = false

//FOR CALEANDAR
//import the new composition api in order to make it work in Vue@2.x
// import VueComp from '@vue/composition-api'
// //use the vue-composition-api plugin
// Vue.use(VueComp)

import VCalendar from 'v-calendar';
Vue.use(VCalendar, {
//  componentPrefix: 'vc',  // Use <vc-calendar /> instead of <v-calendar />
//  ...,                // ...other defaults
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
