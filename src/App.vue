<template>
  <div id="app">
    <nav class="nav has-shadow">
      <div class="container">
        <div class="nav-left">
          <router-link to="/" class="nav-item">
            <h1 class="title">either-or</h1>
          </router-link>
          <router-link to="/new" class="nav-item is-tab is-hidden-mobile">New</router-link>
          <router-link :to="{ name: 'edit', props: { id: id }}" v-if="canEdit" class="nav-item is-tab is-hidden-mobile">Edit</router-link>
          <router-link :to="{ name: 'vote', props: { id: id }}" v-if="id" class="nav-item is-tab is-hidden-mobile">Vote</router-link>
          <router-link :to="{ name: 'rankings', props: { id: id }}" v-if="id" class="nav-item is-tab is-hidden-mobile">Rankings</router-link>
        </div>
        <span class="nav-toggle">
          <span></span>
          <span></span>
          <span></span>
        </span>
        <div class="nav-right nav-menu">
          <router-link to="/new" class="nav-item is-tab is-hidden-tablet">New</router-link>
          <router-link :to="{ name: 'edit', props: { id: id }}" v-if="id" class="nav-item is-tab is-hidden-tablet">Edit</router-link>
          <router-link :to="{ name: 'vote', props: { id: id }}" v-if="id" class="nav-item is-tab is-hidden-tablet">Vote</router-link>
          <router-link :to="{ name: 'rankings', props: { id: id }}" v-if="id" class="nav-item is-tab is-hidden-tablet">Rankings</router-link>
        </div>
      </div>
    </nav>
    <main class="section">
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'id',
      'canEdit',
      'exists',
      'items'
    ])
  },
  methods: {
    ...mapActions([
      'bindCollections',
      'bindCollection',
      'generateCombinations'
    ])
  },
  watch: {
    id () {
      this.bindCollection().then(() => {
        if (!this.exists) {
          this.$router.push('/')
        }
      })
    },
    items () {
      this.generateCombinations()
    }
  },
  created () {
    this.bindCollections().then((id) => {
      if (this.id) {
        this.bindCollection().then((id) => {
          if (!this.exists) {
            this.$router.push('/')
          } else if (this.$route.name === 'edit' && !this.canEdit) {
            this.$router.push({ name: 'rankings', params: { id: id } })
          }
        })
      }
    })
  }
}
</script>

<style src="bulma/css/bulma.css"></style>
<style src="font-awesome/css/font-awesome.min.css"></style>
<style>
body {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
}

#app {
  flex: 1 0 auto;
}

textarea, .textarea {
  min-height: inherit;
  height: auto;
}
</style>
