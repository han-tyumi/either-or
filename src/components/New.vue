<template>
  <div class="container">
    <h1 class="title">New</h1>
    <h2 class="subtitle">Create a new collection</h2>
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
            <input type="radio" name="privacy" value="public" v-model="privacy" checked="true">
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
          <button class="button is-primary" @click="create">Create</button>
        </p>
        <p class="control">
          <router-link to="/" tag="button" class="button is-link">Cancel</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'new',
  data () {
    return {
      title: '',
      input: '',
      privacy: 'public'
    }
  },
  methods: {
    ...mapActions([
      'addCollection'
    ]),
    create () {
      this.addCollection({
        title: this.title,
        input: this.input,
        privacy: this.privacy
      }).then((key) => {
        this.$router.push({ name: 'rankings', params: { id: key } })
      })
    }
  }
}
</script>
