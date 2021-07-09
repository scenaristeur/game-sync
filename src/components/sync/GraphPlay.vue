<template>
  <div>
    <div v-if="game != null">
      GraphPlay :

      <a :href="game.url" target="_blank">{{game.url}}</a>


      <b-button @click="resetGame">Reset Game</b-button><br>
<br>
      <b-button variant="info" @click="changeGame('up')">Up</b-button>
      <b-button variant="info" @click="changeGame('down')">Down</b-button>
      <b-button variant="info" @click="changeGame('left')">Left</b-button>
      <b-button variant="info" @click="changeGame('right')">Right</b-button>
<hr>
      updates : {{game.updates}}
<hr>
      <b-list-group class="item list-group-item d-flex justify-content-between p-1">
        <b-list-group-item variant="light"
        class="item list-group-item d-flex justify-content-between"
        v-for="(up,i) in updates" :key="i"  button>
        <div class="input-group" style="display:table; width:100%;">
          <p class="p-0 m-0 flex-grow-1">{{ up }}</p>
          <!-- <b-button v-b-modal.share-modal>share</b-button> -->

          <span style="display: table-cell; width: 40px;">
            <!-- <button class="btn btn-default" type="button"><span>ᐅ</span>  Go!</button> -->
            <!-- class="unstyled-button" -->
            <!-- <Share :item="fi" /> -->

            <b-button size="sm" variant="outline-danger"  @click.stop="trash(up)">
              <b-icon-trash @click.stop="trash(up)" variant="danger" ></b-icon-trash>
            </b-button>

          </span>
        </div>

      </b-list-group-item>
    </b-list-group>
  </div>
</div>

</template>

<script>
export default {
  name: "GraphPlay",
  data(){
    return{
      updates: []
    }
  },
  methods:{
    changeGame(action){
      //this.game.updates.push(action)
      this.$changeGame(this.game, action)
    },
    trash(action){
      console.log(action)
      this.$remove(this.game, action)
    },
    resetGame(){
      this.game = null
    }
  },
  watch:{
    game(){
      if (this.game != null){
        console.log("Game", this.game)
        this.updates = this.game.updates
      }

    }
  },
  computed:{
    game:{
      get () { return this.$store.state.gamesync.game },
      set (value) { this.$store.commit('gamesync/setGame', value) }
    },
  }
}
</script>

<style>

</style>
