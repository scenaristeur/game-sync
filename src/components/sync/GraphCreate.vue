<template>
  <div>
    <!-- URL : {{ url }} -->


    <div v-if="webId == null">
      <b-alert show variant="warning">
        You must Login to create a new Graph
      </b-alert>

    </div>

    <div v-else>
      WebId : {{ webId }}
      <b-form-input v-model="name" placeholder="choose a name"></b-form-input>
      <b-button @click="create">Create a graph</b-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "GraphCreate",

  data(){
    return{
      name: "",
      webId: null
      //  url: "https://game-sync.solidcommunity.net/public/test/"
    }
  },
  created(){
    this.name =  Date.now();
  },
  methods:{
    create(){
      let chose = {url: this.url, name: this.name}
      console.log(chose)
      this.$create(chose)
      this.name =  Date.now();
    }
  },
  watch:{
    session(){
      if (this.session != null){
        this.webId = this.session.info.webId
      }
    }
  },
  computed: {
    url:{
      get () { return this.$store.state.gamesync.url },
      set (/*value*/) { /*this.updateTodo(value)*/ }
    },
    session:{
      get () { return this.$store.state.solid.session != null && this.$store.state.solid.session },
      set (/*value*/) { /*this.updateTodo(value)*/ }
    },
  }
}
</script>

<style>

</style>
