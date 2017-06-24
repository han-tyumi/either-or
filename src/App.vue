<template>
  <div id="app">
    <nav class="nav has-shadow">
      <div class="container">
        <div class="nav-left">
          <router-link to="/" class="nav-item">
            <h1 class="title">either-or</h1>
          </router-link>
          <router-link to="/new" class="nav-item is-tab is-hidden-mobile">New</router-link>
          <router-link :to="{ name: 'settings', props: { id: id }}" v-if="id" class="nav-item is-tab is-hidden-mobile">Settings</router-link>
          <router-link :to="{ name: 'vote', props: { id: id }}" v-if="id" class="nav-item is-tab is-hidden-mobile">Vote</router-link>
          <router-link :to="{ name: 'rankings', props: { id: id }}" v-if="id" class="nav-item is-tab is-hidden-mobile">Rankings</router-link>
        </div>
        <span class="nav-toggle">
          <span></span>
          <span></span>
          <span></span>
        </span>
        <div class="nav-right nav-menu">
          <router-link to="/collections" class="nav-item is-tab is-hidden-tablet">Collections</router-link>
          <router-link to="/" class="nav-item is-tab is-hidden-tablet">Items</router-link>
          <router-link to="/vote" class="nav-item is-tab is-hidden-tablet">Vote</router-link>
          <router-link to="/rankings" class="nav-item is-tab is-hidden-tablet">Rankings</router-link>
        </div>
      </div>
    </nav>
    <main class="section">
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </main>
  </div>
</template>

<script>
export default {
  props: ['id']
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
</style>
