import _ from 'lodash'
import Firebase from 'firebase'
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
  // add a new collection to the database
  addCollection: ({ commit }, { title, input, privacy }) => {
    let items = _.compact(input.split('\n'))
    // return a promise that resolves when finished creating entries in database
    return new Promise((resolve, reject) => {
      // fetch uid before adding collection to database
      Firebase.auth().onAuthStateChanged((user) => {
        // create access entry
        let key = accessRef.child(user.uid).push(true, () => {
          // create collection entry
          collectionsRef.child(key).set({
            created: Firebase.database.ServerValue.TIMESTAMP,
            modified: Firebase.database.ServerValue.TIMESTAMP,
            title: title,
            privacy: privacy
          }, () => {
            // add items
            let itemsKeyRef = itemsRef.child(key)
            for (let i = 0; i < items.length; i++) {
              itemsKeyRef.push().set({
                name: items[i],
                votes: 0
              })
            }
            resolve(key)
          })
        }).key
      })
    })
  },

  // update a collection's information
  updateCollection: ({ getters, commit }) => {
    let items = _.compact(getters.input.split('\n'))

    return new Promise((resolve, reject) => {
      collectionsRef.child(getters.id).update({
        modified: Firebase.database.ServerValue.TIMESTAMP,
        title: getters.title,
        privacy: getters.privacy
      }, () => {
        let itemsKeyRef = itemsRef.child(getters.id)
        itemsKeyRef.remove().then(() => {
          let itemsKeyRef = itemsRef.child(getters.id)
          for (let i = 0; i < items.length; i++) {
            itemsKeyRef.push().set({
              name: items[i],
              votes: 0
            })
          }
          resolve(getters.id)
        })
      })
    })
  },

  generateCombinations: ({ getters, commit }) => {
    let combinations = []
    for (let i = 0; i < getters.items.length - 1; i++) {
      for (let j = i + 1; j < getters.items.length; j++) {
        let heads = _.random()
        combinations.push({
          a: {
            index: heads ? i : j,
            name: getters.items[heads ? i : j].name
          },
          b: {
            index: heads ? j : i,
            name: getters.items[heads ? j : i].name
          },
          action: null
        })
      }
    }
    commit('setCombinations', _.shuffle(combinations))
    commit('setIndex', 0)
  },

  next: ({ getters, commit }, action) => {
    commit('setAction', { index: getters.index, action: action })
    commit('setIndex', getters.index + 1)
  },

  undo: ({ getters, commit }) => {
    commit('setIndex', getters.index - 1)
    commit('setAction', { index: getters.index, action: null })
  },

  submitVotes: ({ getters, commit }) => {
    return new Promise((resolve, reject) => {
      let itemsKeyRef = itemsRef.child(getters.id)
      for (let i = 0; i < getters.combinations.length; i++) {
        let combination = getters.combinations[i]
        let action = combination.action
        if (action !== 'skip') {
          let item = getters.itemAt(combination[action].index)
          itemsKeyRef.child(item['.key']).child('votes').set(item.votes + 1)
        }
      }
      resolve(getters.id)
    })
  },

  bindCollections: firebaseAction(({ getters, bindFirebaseRef, commit }) => {
    return new Promise((resolve, reject) => {
      bindFirebaseRef('collections', collectionsRef.orderByChild('privacy').equalTo('public'))
      Firebase.auth().onAuthStateChanged((user) => {
        accessRef.child(user.uid).on('value', (snapshot) => {
          snapshot.forEach((snapshot) => {
            collectionsRef.child(snapshot.key).on('value', (snapshot) => {
              let collection = snapshot.val()
              if (collection) {
                collection['.key'] = snapshot.key
                commit('updateUserCollections', [collection])
              }
            })
          })
          resolve(getters.id)
        })
      })
    })
  }),
  bindCollection: firebaseAction(({ getters, bindFirebaseRef, unbindFirebaseRef, commit }) => {
    return new Promise((resolve, reject) => {
      if (getters.id) {
        let done = false
        bindFirebaseRef('collection', collectionsRef.child(getters.id), { readyCallback () {
          commit('setTitle', getters.collection.title)
          commit('setPrivacy', getters.collection.privacy)
          done ? resolve(getters.id) : done = true
        }})
        bindFirebaseRef('items', itemsRef.child(getters.id), { readyCallback () {
          commit('setInput', _.join(_.map(getters.items, 'name'), '\n'))
          done ? resolve(getters.id) : done = true
        }})
      } else {
        unbindFirebaseRef('collection')
        commit('setCollection', {})
        commit('setTitle', '')
        commit('setPrivacy', '')
        unbindFirebaseRef('items')
        commit('setItems', [])
        commit('setInput', '')
        resolve(getters.id)
      }
    })
  })
}
