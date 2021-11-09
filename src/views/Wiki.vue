<template>
  <div>

    Wiki

    <NewItem :path="wikiStore"/>
    wikistore : {{ wikiStore}}
    <hr>
    wikiData : {{ JSON.stringify(wikiData)}}
    <hr>
    <div v-if="pod == null">
      You must login to use wiki
    </div>
    <div v-else>
      {{JSON.stringify(pod)}}
    </div>

  </div>
</template>

<script>
export default {
  name: 'Wiki',
  data(){
    return {
      wikiStore : null,
      //wikiData : null
    }
  },
  components: {
    'NewItem': () => import('@/components/wiki/NewItem'),
    // 'CalendarList': () => import('@/components/timeline/CalendarList'),
    // // 'SimpleTimeline': () => import('@/components/timeline/SimpleTimeline'),
    // 'CalendarTop': () => import('@/components/timeline/CalendarTop'),
    // // 'TimelineTest': () => import('@/components/timeline/TimelineTest'),

  },
  watch:{
    pod(){
      this.wikiStore = this.pod == null ? null : this.pod.storage+"wikiStore/"
    },
    async wikiStore(){
      if (this.wikiStore == null){
        this.$store.commit('wiki/setWikiData', null)
      }else{
        console.log("run wikiget")
        await this.$store.dispatch('wiki/getWikiContainer', this.wikiStore)
      }
    }
  },
  computed:{
    pod:{
      get () { return this.$store.state.solid.pod },
      set (/*value*/) { /*this.updateTodo(value)*/ }
    },
    wikiData:{
      get () { return this.$store.state.wiki.wikiData },
      set (/*value*/) { /*this.updateTodo(value)*/ }
    },
  }
}
</script>
