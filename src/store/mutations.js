import _ from 'lodash'
import { firebaseMutations } from 'vuexfire'

export default {
  updateUserCollections: (state, value) => { state.userCollections = _.unionBy(value, state.userCollections, '.key') },
  setCollection: (state, value) => { state.collection = value },
  setTitle: (state, value) => { state.title = value },
  setInput: (state, value) => { state.input = value },
  setPrivacy: (state, value) => { state.privacy = value },
  setItems: (state, value) => { state.items = value },
  setCombinations: (state, value) => { state.combinations = value },
  setAction: (state, { index, action }) => { state.combinations[index].action = action },
  setIndex: (state, value) => { state.index = value },
  ...firebaseMutations
}
