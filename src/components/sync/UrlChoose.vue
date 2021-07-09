<template>
  <div>
    <b-form-input v-model="temp_url" placeholder="chhose a url"></b-form-input>
    <b-button @click="changedUrl">Explore</b-button>
  </div>
</template>

<script>
export default {
  name: "UrlChoose",
  data(){
    return{
      temp_url: "",
      default: "https://game-sync.solidcommunity.net/public/test/"
    }
  },
  created(){
    this.init()
    this.changedUrl()
  },
  methods:{
    init(){
      this.temp_url = this.default
    },
    changedUrl(){
      this.url = this.temp_url
    }
  },
  computed: {
    url:{
      get () { return this.$store.state.gamesync.url },
      set (value) { this.$store.dispatch('gamesync/explore', value) }
    },
  }
}
</script>

<style>

</style>
