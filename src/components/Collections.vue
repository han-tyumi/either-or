<template>
  <div class="container">
    <h1 class="title">Collections</h1>
    <h2 class="subtitle">View public collections</h2>
    <table class="table is-striped">
      <thead>
        <tr>
          <th>Title</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="collection in collections">
          <td><router-link :to="{ name: 'collection', params: { id: collection['.key'] }}">{{ collection.title }}</router-link></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'collections',
  computed: {
    ...mapGetters({
      collections: 'getCollections'
    })
  }
}
</script>
