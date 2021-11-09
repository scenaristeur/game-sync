<template>
  <div v-if="wikiData != null">
    <ul>
      <li v-for="(url, id) in wikiData.resources" :key="id">
        {{id}} : {{url}}
        <WikiEntry :url="url"/>
      </li>
    </ul>


    <!-- {{JSON.stringify(wikiData, undefined, 2)}} -->
  </div>
</template>

<script>
export default {
  name: "WikiView",
  props:['data'],
  components: {
    'WikiEntry': () => import('@/components/wiki/WikiEntry'),
  },
  computed:{
    pod:{
      get () { return this.$store.state.solid.pod },
      set (/*value*/) { /*this.updateTodo(value)*/ }
    },
    wikiData:{
      get () { return this.$store.state.wiki.wikiData },
      set (/*value*/) { /*this.updateTodo(value)*/ }
    },
  }

}
</script>

<style>

</style>
