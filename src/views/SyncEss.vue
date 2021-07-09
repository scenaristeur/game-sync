<template>
  <div>
    Test Entreprise Solid Server<br>
    <div v-if="webId != null" >
      webId = {{ webId }}<br>
    </div>
    url = {{ url }}<br><br>
    <b-button variant="info" @click="create">New Game</b-button>
    <b-button variant="info" @click="refresh">refresh list</b-button>



  <!-- Messages : {{messages}} -->
</div>
</template>

<script>
export default {
  name: 'SyncEss',
  data(){
    return {
      //  path : 'https://game-sync.solidcommunity.net/public/test/',
      path: "https://pod.inrupt.com/spoggy/public/game/",
      server: "ess",
      url: "",
      webId: null,

    }
  },
  methods:{
    async create(){
      let resource = await this.$create(this.path)
      console.log("created",resource)

    },

    refresh(){
      this.$refresh(this.path)
    }
  },
  watch:{
    session(){
      if (this.session != null){
        this.$subscribe(this.path, this.server)
        this.webId = this.session.info.webId
      }
    },

  },
  computed:{
    session:{
      get () { return this.$store.state.solid.session != null && this.$store.state.solid.session },
      set (/*value*/) { /*this.updateTodo(value)*/ }
    },
    messages:{
      get () { return this.$store.state.gamesync.messages },
      set (/*value*/) { /*this.updateTodo(value)*/ }
    },


  }
}
</script>

<style>

</style>
