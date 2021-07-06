<template>
  <div>
    Test Entreprise Solid Server<br>
    <div v-if="webId != null" >
      webId = {{ webId }}<br>
    </div>
    url = {{ url }}<br><br>
    <b-button variant="info" @click="create">New Game</b-button>
      <b-button variant="info" @click="refresh">refresh list</b-button>

    res : {{resources.length}}
    <b-list-group class="item list-group-item d-flex justify-content-between p-1">
      <b-list-group-item variant="light"
      class="item list-group-item d-flex justify-content-between"
      v-for="fi in resources" :key="fi" @click="read(fi)" button>
      <div class="input-group" style="display:table; width:100%;">
        <p class="p-0 m-0 flex-grow-1"><b-icon-file-text></b-icon-file-text> {{ fi }}</p>
        <!-- <b-button v-b-modal.share-modal>share</b-button> -->

        <span style="display: table-cell; width: 40px;">
          <!-- <button class="btn btn-default" type="button"><span>ᐅ</span>  Go!</button> -->
          <!-- class="unstyled-button" -->
          <!-- <Share :item="fi" /> -->

          <b-button size="sm" variant="outline-danger"  @click.stop="trash(fi)">
            <b-icon-trash @click.stop="trash(fi)" variant="danger" ></b-icon-trash>
          </b-button>

        </span>
      </div>

    </b-list-group-item>
  </b-list-group>



  <!-- Messages : {{messages}} -->
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
      webId: null,
      resources : []
    }
  },
  methods:{
    async create(){
      let resource = await this.$create(this.path)
      console.log("created",resource)
  
    },
    read(res){
      console.log("read",res)
      this.$read(res)
    },
    trash(res){
      console.log("trash", res)
      this.$deleteOnPod(res)
    },
    refresh(){
      this.$refresh(this.path)
    }
  },
  watch:{
    session(){
      if (this.session != null){
        this.$subscribe(this.path)
        this.webId = this.session.info.webId
      }
    },
    gameContainer(){
      console.log(this.gameContainer)
      if (this.gameContainer != null && this.gameContainer.resources != undefined){
        this.resources = this.gameContainer.resources
        console.log(this.resources)
      }
    }
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
    gameContainer:{
      get () { return this.$store.state.gamesync.gameContainer },
      set (/*value*/) { /*this.updateTodo(value)*/ }
    },

  }
}
</script>

<style>

</style>
