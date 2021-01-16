import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import GoogleSignInButton from 'vue-google-signin-button-directive'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  icons: {
    iconfont: 'mdi'
  },
  GoogleSignInButton,
  VueAxios,
  axios,
  render: h => h(App)
}).$mount('#app')
