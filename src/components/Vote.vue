<template>
  <div class="container">
    <h1 class="title">Vote</h1>
    <h2 class="subtitle">Click on either-or</h2>
    <hr>
    <div v-if="!doneVoting">
      <div class="columns">
        <div class="column is-4">
          <button class="button is-primary is-outlined is-large is-fullwidth" @click.prevent="action('a', $event)">{{ combination.a.name }}</button>
        </div>
      </div>
      <div class="columns">
        <div class="column is-4">
          <button class="button is-primary is-outlined is-large is-fullwidth" @click="action('b', $event)">{{ combination.b.name }}</button>
        </div>
      </div>
      <div class="columns">
        <div class="column is-4 has-text-centered">
          <button class="button is-info is-outlined is-large is-fullwidth" @click="action('skip', $event)">Skip</button>
        </div>
      </div>
      <div class="columns">
        <div class="column is-2 has-text-centered">
          <button class="button is-danger is-outlined is-large is-fullwidth" @click="undo" :disabled="index <= 0">Undo</button>
        </div>
        <div class="column is-2 has-text-centered">
          <router-link class="button is-default is-outlined is-large is-fullwidth" :to="{ name: 'rankings', params: { id: id } }" tag="button">Cancel</router-link>
        </div>
      </div>
    </div>
    <div class="columns" v-else>
      <div class="column is-half has-text-centered">
        <button class="button is-primary is-outlined is-large is-fullwidth" @click="submit">Submit</button>
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
    ...mapGetters([
      'id',
      'index',
      'combination',
      'doneVoting'
    ])
  },
  methods: {
    ...mapActions([
      'next',
      'undo',
      'submitVotes'
    ]),
    action (action, event) {
      this.next(action)
      event.target.blur()
    },
    submit () {
      this.submitVotes().then((id) => {
        this.$router.push({ name: 'rankings', params: { id: id } })
      })
    }
  }
}
</script>
