<template>
  <div>
    NetworkView {{ networkUrl}}<br>
    updates : {{ updates }}
  </div>
</template>

<script>
export default {
  name: "NetworkView",
  data(){
    return{
      updates: []
    }
  },
  watch:{
    game(){
      console.log("game", this.game)
      if (this.game != null && this.game.url == this.networkUrl.url){
        console.log("Game Update", this.game)
        this.updates = this.game.updates
      }
    }
  },
  computed: {
    networkUrl:{
      get () { return this.$store.state.gamesync.networkUrl },
      set (/*value*/) { /*this.updateTodo(value)*/ }
    },
    game:{
      get () { return this.$store.state.gamesync.game },
      set (/*value*/) { /*this.$store.commit('gamesync/setGame', value)*/ }
    },
  }
}
</script>

<style>

</style>
