<template>
  <div class="container">
    <div class="box">
      <h1 class="title">Public Collections</h1>
      <h2 class="subtitle">View public collections</h2>
      <table class="table">
        <thead>
          <tr>
            <th>Title</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="collection in collections">
            <td><router-link :to="{ name: 'rankings', params: { id: collection['.key'] }}">{{ collection.title }}</router-link></td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="box">
      <h1 class="title">User Collections</h1>
      <h2 class="subtitle" v-if="">View your collections</h2>
      <table class="table">
        <thead>
          <tr>
            <th>Title</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="collection in userCollections">
            <td><router-link :to="{ name: 'rankings', params: { id: collection['.key'] }}">{{ collection.title }}</router-link></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'collections',
  computed: {
    ...mapGetters([
      'collections',
      'userCollections'
    ])
  }
}
</script>
