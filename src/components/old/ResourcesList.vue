<template>
  <div>
    resources: <br>


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





</div>
</template>

<script>
export default {
  name: 'ResourcesList',
  data(){
    return {
      resources : []
    }
  },
  methods:{
    read(res){
      console.log("read",res)
      this.$read(res)
    },
    trash(res){
      console.log("trash", res)
      this.$deleteOnPod(res)
    },
  },
  watch:{
    gameContainer(){
      console.log(this.gameContainer)
      if (this.gameContainer != null && this.gameContainer.resources != undefined){
        this.resources = this.gameContainer.resources
        console.log(this.resources)
      }
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
