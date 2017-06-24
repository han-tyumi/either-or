// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
import Firebase from 'firebase'
import { sync } from 'vuex-router-sync'
import { mapActions } from 'vuex'

// sync router to vuex store
sync(store, router)

Vue.config.productionTip = false

// connect to database
let db = Firebase.database()

// authenticate user anonymously
Firebase.auth().signInAnonymously().catch((error) => {
  console.log(`${error.code} - ${error.message}`)
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App },
  methods: {
    ...mapActions([
      'setCollectionsRef'
    ])
  },
  created () {
    this.setCollectionsRef(db.ref('collections'))
  }
})
