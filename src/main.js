// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
import Firebase from 'firebase'
import { sync } from 'vuex-router-sync'

// sync router to vuex store
sync(store, router)

// authenticate user anonymously
Firebase.auth().signInAnonymously().catch((error) => {
  console.log(`${error.code} - ${error.message}`)
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
