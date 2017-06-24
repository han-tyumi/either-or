import { firebaseMutations } from 'vuexfire'

export default {
  setTitle: (state, value) => { state.title = value },
  setInput: (state, value) => { state.input = value },
  setItems: (state, value) => { state.items = value },
  ...firebaseMutations
}
