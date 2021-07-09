<template>
  <div>
    GraphList
    {{ list}}
  </div>
</template>

<script>
export default {
  name: "GraphList",
  data(){
    return{
      list: []
    }
  },
  methods:{
    changedUrl(){

    }
  },
  watch: {
    gameContainer(){
      console.log(this.gameContainer)
      this.list = this.gameContainer.resources
    }
  },
  computed: {
    gameContainer:{
      get () { return this.$store.state.gamesync.gameContainer },
      set (/*value*/) { /*this.updateTodo(value)*/ }
    },
  }
}
</script>

<style>

</style>
