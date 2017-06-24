<template>
  <div class="container">
    <h1 class="title">Vote</h1>
    <h2 class="subtitle">Click on either-or</h2>
    <hr>
    <div class="columns is-centered">
      <div class="column is-5">
        <item-button :item="getItem(0)"></item-button>
      </div>
      <div class="column is-2 has-text-centered">
        <button class="button is-info is-outlined is-large is-fullwidth">
          Skip
        </button>
      </div>
      <div class="column is-5">
        <item-button :item="getItem(1)"></item-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import ItemButton from './ItemButton.vue'

export default {
  name: 'vote',
  components: { ItemButton },
  computed: {
    ...mapGetters(['getItem'])
  },
  methods: {
    ...mapActions(['generateCombinations'])
  },
  mounted () {
    this.generateCombinations()
  }
}
</script>
