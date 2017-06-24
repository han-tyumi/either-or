<template>
  <div class="container">
    <h1 class="title">Settings</h1>
    <h2 class="subtitle">Change the main properties of your list</h2>
    <div class="card">
      <div class="card-content">
        <div class="field">
          <label class="label">Title</label>
          <p class="control">
            <input v-model="title" class="input" type="text" placeholder="Give your collection an awesome title">
          </p>
        </div>
        <div class="field">
          <label class="label">Items</label>
          <p class="control">
            <textarea v-model="input" class="textarea" placeholder="Enter each item on a separate line"></textarea>
          </p>
        </div>
      </div>
      <footer class="card-footer">
        <a @click="setItemsToInput" class="card-footer-item">Set</a>
        <a @click="input = ''" class="card-footer-item">Clear</a>
      </footer>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'settings',
  computed: {
    title: {
      get () {
        return this.$store.getters.getTitle
      },
      set (value) {
        this.$store.commit('setTitle', value)
      }
    },

    input: {
      get () {
        return this.$store.getters.getInput
      },
      set (value) {
        this.$store.commit('setInput', value)
      }
    }
  },
  methods: {
    ...mapActions([
      'setItemsToInput'
    ])
  }
}
</script>
