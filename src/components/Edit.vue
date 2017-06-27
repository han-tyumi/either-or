<template>
  <div class="container">
    <h1 class="title">Edit</h1>
    <h2 class="subtitle">Change the main properties of your list</h2>
    <div class="box">
      <div class="field">
        <label class="label">Title</label>
        <p class="control">
          <input v-model="title" class="input" type="text" placeholder="Title your collection">
        </p>
      </div>
      <div class="field">
        <label class="label">Items</label>
        <p class="control">
          <textarea v-model="input" class="textarea" placeholder="Enter on separate lines" rows="5"></textarea>
        </p>
      </div>
      <div class="field">
        <label class="label">Privacy</label>
        <p class="control">
          <label class="radio">
            <input type="radio" name="privacy" value="public" v-model="privacy">
            Public
          </label>
          <label class="radio">
            <input type="radio" name="privacy" value="private" v-model="privacy">
            Private
          </label>
        </p>
      </div>
      <div class="field is-grouped">
        <p class="control">
          <button class="button is-primary" @click="update">Update</button>
        </p>
        <p class="control">
          <router-link :to="{ name: 'rankings', props: { id: id } }" tag="button" class="button is-link">Cancel</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'edit',
  computed: {
    ...mapGetters([
      'id',
      'canEdit',
      'exists'
    ]),
    title: {
      get () { return this.$store.getters.title },
      set (value) { this.$store.commit('setTitle', value) }
    },
    input: {
      get () { return this.$store.getters.input },
      set (value) { this.$store.commit('setInput', value) }
    },
    privacy: {
      get () { return this.$store.getters.privacy },
      set (value) { this.$store.commit('setPrivacy', value) }
    }
  },
  methods: {
    ...mapActions([
      'updateCollection'
    ]),
    update () {
      this.updateCollection().then((key) => {
        this.$router.push({ name: 'rankings', params: { id: key } })
      })
    }
  }
}
</script>
