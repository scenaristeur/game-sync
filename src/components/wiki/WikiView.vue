<template>
  <div v-if="wikiData != null">
    <Search />
    <b-list-group>
      <WikiEntry v-for="(url, id) in wikiData.resources" :key="id" :url="url"/>
    </b-list-group>
    <!-- <ul>
    <li v-for="(url, id) in wikiData.resources" :key="id">
    {{id}} : {{url}}

  </li>
</ul> -->
<MentionSelector />
<DragDrop />
<!-- {{JSON.stringify(wikiData, undefined, 2)}} -->
</div>
</template>

<script>
export default {
  name: "WikiView",
  props:['data'],
  components: {
    'WikiEntry': () => import('@/components/wiki/WikiEntry'),
    'DragDrop': () => import('@/components/wiki/DragDrop'),
    'Search': () => import('@/components/wiki/Search'),
    'MentionSelector': () => import('@/components/layout/MentionSelector'),
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
