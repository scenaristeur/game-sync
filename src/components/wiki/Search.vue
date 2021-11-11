<template>
  <b-container>
    <!-- {{ wikiIndex}} -->
    <vue-typeahead-bootstrap
    v-model="query"
    :data="wikiIndex"
    placeholder="search"
    showOnFocus
    @hit="searchChanged"
    :serializer="item => item.name"
    >
    <template slot="append" v-if="query.length > 0">
      <button  class="btn btn-primary" @click="clear">
        X
      </button>
    </template>
  </vue-typeahead-bootstrap>
</b-container>

</template>

<script>
//https://github.com/mattzollinhofer/vue-typeahead-bootstrap


export default {
  name: "Search",
  components: {
    'VueTypeaheadBootstrap': () => import('vue-typeahead-bootstrap'),
  },
  data(){
    return{
      selected: "",
      query: "",
      //data: ['Canada', 'United States', 'Mexico']
    }
  },
  methods:{
    searchChanged(ev){
      this.selected = ev
      console.log(this.selected, this.query)
    },
    clear(){
      this.query = ""
    }
  },
  watch:{
    query(){
      console.log(this.query)
      this.$store.commit('wiki/setSearchQuery', this.query)
    }
  },
  computed:{
    // pod:{
    //   get () { return this.$store.state.solid.pod },
    //   set (/*value*/) { /*this.updateTodo(value)*/ }
    // },
    wikiIndex:{
      get () { return this.$store.state.wiki.wikiIndex },
      set (/*value*/) { /*this.updateTodo(value)*/ }
    },
  }
}
</script>

<style>

</style>
