<template>
  <div>
    <div v-if="resources.length > 0">
      <b-dropdown id="dropdown-1" dropleft text="GraphList" class="m-md-2" variant="light">


        <b-dropdown-item
        class="item list-group-item d-flex justify-content-between"
        v-for="fi in resources" :key="fi" @click="read(fi)" button>
        <div class="input-group" style="display:table; width:100%;">
          <p class="p-0 m-0 flex-grow-1"><b-icon-file-text>
          </b-icon-file-text>
          <Resource :url="fi" />
          <!-- {{ fi }} -->
        </p>
          <!-- <b-button v-b-modal.share-modal>share</b-button> -->
          <Permissions :url="fi" />
          <span style="display: table-cell; width: 40px;">
            <!-- <button class="btn btn-default" type="button"><span>ᐅ</span>  Go!</button> -->
            <!-- class="unstyled-button" -->
            <!-- <Share :item="fi" /> -->

            <b-button size="sm" variant="outline-danger"  @click.stop="trash(fi)">
              <b-icon-trash @click.stop="trash(fi)" variant="danger" ></b-icon-trash>
            </b-button>

            <Share :item="itemShared(fi)" style="float:left"/>

          </span>
        </div>
<small>{{fi}}</small>
      </b-dropdown-item>

      <!-- <b-dropdown-item>First Action</b-dropdown-item>
      <b-dropdown-item>Second Action</b-dropdown-item>
      <b-dropdown-item>Third Action</b-dropdown-item>
      <b-dropdown-divider></b-dropdown-divider>
      <b-dropdown-item active>Active action</b-dropdown-item>
      <b-dropdown-item disabled>Disabled action</b-dropdown-item>-->
    </b-dropdown>
  </div>


  <!-- <b-list-group class="item list-group-item d-flex justify-content-between p-1">
  <b-list-group-item variant="light"
  class="item list-group-item d-flex justify-content-between"
  v-for="fi in resources" :key="fi" @click="read(fi)" button>
  <div class="input-group" style="display:table; width:100%;">
  <p class="p-0 m-0 flex-grow-1"><b-icon-file-text></b-icon-file-text> {{ fi }}</p>

  <span style="display: table-cell; width: 40px;">


  <b-button size="sm" variant="outline-danger"  @click.stop="trash(fi)">
  <b-icon-trash @click.stop="trash(fi)" variant="danger" ></b-icon-trash>
</b-button>

</span>
</div>

</b-list-group-item>
</b-list-group> -->


</div>
</template>

<script>
export default {
  name: "GraphList",
  components: {
    'Share': () => import('@/components/layout/Share'),
    'Permissions': () => import('@/components/layout/Permissions'),
    'Resource': () => import('@/components/layout/Resource'),
  },
  data(){
    return{
      resources: []
    }
  },
  async created(){
    this.checkQueryUrl()
  },
  methods:{
    async  checkQueryUrl() {
      this.$store.commit('ipgs/spinnerInit')
      if (this.$route.query.url != undefined && this.$route.query.url.length > 0){
        //  console.log(this.$route)
        let url = this.$route.query.url
        this.read(url)
      }
    },
    itemShared(url){
      return {url: url}
    },
    read(res){
      let thing = {url: res, subscribe: true}
      console.log("read",thing)
      this.$readResource(thing)
      this.$store.commit('gamesync/setNetworkUrl', {url: res})
    },
    trash(res){
      console.log("trash", res)
      this.$deleteOnPod(res)
    },
  },
  watch: {
    gameContainer(){
      console.log(this.gameContainer)
      this.resources = this.gameContainer.resources
    },
    $route (){
      this.checkQueryUrl()
    },
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
