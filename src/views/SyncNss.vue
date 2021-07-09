<template>
  <div>
    Test Node Solid Server<br>
    <div v-if="webId != null" >
      webId = {{ webId }}<br>
    </div>
    url = {{ url }}<br><br>
    <b-button @click="create">Create</b-button>

  </div>
</template>

<script>
export default {
  name: 'SyncNss',
  data(){
    return {
      server : "nss",
      path : 'https://game-sync.solidcommunity.net/public/test/',
      //  path: "https://pod.inrupt.com/spoggy/public/game/",
      url: "",
      webId: null
    }
  },
  created(){
    this.$subscribe(this.path, this.server)
    console.log("sub")
  },
  methods:{
    async create(){
      // let name = Date.now();
      // this.url = this.path+name+'.ttl'
      let resource = await this.$create(this.path)
      console.log("created",resource)
    }
  },
  watch:{
    session(){
      if (this.session != null){
        this.$subscribe(this.path, this.server)
        this.webId = this.session.info.webId
      }
    }
  },
  computed:{
    session:{
      get () { return this.$store.state.solid.session != null && this.$store.state.solid.session },
      set (/*value*/) { /*this.updateTodo(value)*/ }
    },
  }
}
</script>

<style>

</style>
