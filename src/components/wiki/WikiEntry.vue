<template>
  <div>
    <!-- {{url}} -->
    {{JSON.stringify(wikiEntry)}}
    <hr>
  </div>
</template>

<script>
export default {
  name: "WikiEntry",
  props: ['url'],
  data(){
    return {
      wikiEntry : null
    }

  },
  created(){
    this.init()
  },
  methods: {
    async init(){
      console.log(this.url)
      this.wikiEntry = await this.$readWikiEntry(this.url)

    }
  },
  watch:{
    async url(){
      this.init()
    }
  },
}
</script>

<style>

</style>
