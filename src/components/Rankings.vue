<template>
  <div class="container">
    <h1 class="title">Rankings</h1>
    <h2 class="subtitle">Items on the left, votes on the right</h2>
    <table class="table is-striped">
      <thead>
        <tr>
          <th>Item</th>
          <th>Votes</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="item['.key']">
          <th>{{ item.name }}</th><td>{{ item.votes }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'rankings',
  computed: {
    ...mapGetters({
      items: 'sortedItems'
    })
  }
}
</script>
