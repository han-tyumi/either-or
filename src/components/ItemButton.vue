<template>
  <button class="button is-primary is-outlined is-large is-fullwidth">{{ item.name }}</button>
</template>

<script>
export default {
  name: 'item-button',
  props: ['item']
}
</script>
