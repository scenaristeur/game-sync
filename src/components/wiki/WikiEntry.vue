<template>

    <ul v-if="wikiEntry != null">
      <li v-for="(t, id) in wikiEntry.things" :key="id">
        {{t.name}}
      </li>
    </ul>
    <!-- <small>
      {{JSON.stringify(wikiEntry)}}
    </small> -->

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
