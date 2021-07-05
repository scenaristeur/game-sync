<template>
  <div>
    Test<br>
    <div v-if="webId != null" >
      webId = {{ webId }}<br>
    </div>
    url = {{ url }}<br><br>
    <b-button @click="create">Create</b-button>

  </div>
</template>

<script>
export default {
  name: 'Test',
  data(){
    return {
      //  path : 'https://game-sync.solidcommunity.net/public/test/',
      path: "https://pod.inrupt.com/spoggy/public/game/",
      url: "",
      webId: null
    }
  },
  methods:{
    create(){
      let name = Date.now();
      this.url = this.path+name+'.ttl'
    }
  },
  watch:{
    session(){
      if (this.session != null){
        this.$openEar(this.path)
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
