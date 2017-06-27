import _ from 'lodash'

export default {
  id: (state) => state.route.params.id,
  exists: (state, getters) => !_.isEmpty(getters.collection),
  canEdit: (state, getters) => _.find(getters.userCollections, { '.key': getters.id }) !== undefined,
  collections: (state) => state.collections,
  userCollections: (state) => state.userCollections,
  collection: (state) => state.collection,
  title: (state) => state.title,
  input: (state) => state.input,
  privacy: (state) => state.privacy,
  items: (state) => state.items,
  sortedItems: (state, getters) => _.orderBy(getters.items, ['votes', 'name'], ['desc', 'asc']),
  itemAt: (state, getters) => (index) => getters.items[index],
  combinations: (state) => state.combinations,
  index: (state) => state.index,
  combination: (state, getters) => getters.combinations ? state.combinations[getters.index] : null,
  doneVoting: (state, getters) => getters.index >= getters.combinations.length
}
