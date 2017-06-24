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
        <tr v-for="item in items">
          <th>{{ item.rank }}</th><td>{{ item.name }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'rankings',
  computed: {
    ...mapState(['items'])
  }
}
</script>
