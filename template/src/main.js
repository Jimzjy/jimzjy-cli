import Vue from 'vue'
import App from './App.vue'
{{#if_eq router true}}
import router from './router'
{{/if_eq}}
{{#if_eq vuex true}}
import store from './store'
{{/if_eq}}

Vue.config.productionTip = false

new Vue({
  {{#if_eq router true}}
  router,
  {{/if_eq}}
  {{#if_eq vuex true}}
  store,
  {{/if_eq}}
  render: h => h(App)
}).$mount('#app')
