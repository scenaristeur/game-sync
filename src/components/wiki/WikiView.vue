<template>
  <div v-if="wikiData != null">

    <b-list-group>
      <b-list-group-item button v-for="(url, id) in wikiData.resources" :key="id">
        <WikiEntry :url="url"/>
      </b-list-group-item>

    </b-list-group>
    <!-- <ul>
      <li v-for="(url, id) in wikiData.resources" :key="id">
        {{id}} : {{url}}

      </li>
    </ul> -->

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
