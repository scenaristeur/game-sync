<template>
  <div>
    URL : {{ url }}
    <b-button @change="create">Create a graph</b-button>

  </div>
</template>

<script>
export default {
  name: "GraphCreate",
  data(){
    return{
      //  url: "https://game-sync.solidcommunity.net/public/test/"
    }
  },
  methods:{
    create(){

    }
  },
  computed: {
    url:{
      get () { return this.$store.state.gamesync.url },
      set (/*value*/) { /*this.updateTodo(value)*/ }
    },
  }
}
</script>

<style>

</style>
