import Firebase from 'firebase'
import _ from 'lodash'
import { firebaseAction } from 'vuexfire'

let db = Firebase.initializeApp({
  apiKey: '***REMOVED***',
  authDomain: '***REMOVED***',
  databaseURL: '***REMOVED***',
  projectId: '***REMOVED***',
  storageBucket: '***REMOVED***.appspot.com',
  messagingSenderId: '***REMOVED***'
}).database()
let collectionsRef = db.ref('collections')
let itemsRef = db.ref('items')
let accessRef = db.ref('access')

export default {
  // sets items based on newline separated input
  setItemsToInput: ({ state, getters, commit }) => {
    let lines = _.compact(getters.getInput.split('\n'))
    let items = []

    for (let i = 0; i < lines.length; i++) {
      items.push({
        name: lines[i],
        votes: 0
      })
    }
    commit('setItems', items)

    // create new collection and add items if new
    if (state.route.path === '/new') {
      Firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          let key = accessRef.child(user.uid).push(true, () => {
            collectionsRef.child(key).set({
              'created': Firebase.database.ServerValue.TIMESTAMP,
              'title': getters.getTitle,
              'privacy': 'public'
            }, () => {
              for (let i = 0; i < getters.getItems.length; i++) {
                itemsRef.child(key).push().set({
                  ...getters.getItems[i]
                })
              }
            })
          }).key
        }
      })
    }
  },

  setCollectionsRef: firebaseAction(({ bindFirebaseRef }, ref) => {
    bindFirebaseRef('collections', ref)
  })
}
