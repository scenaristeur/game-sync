<template>
  <div>

    subjects : {{r.subjects}}<br>
    action : <a :href="r.url" target="_blank">{{r.name}}</a><br>
    objects: {{r.objects}}<br>
    contexts: {{r.contexts}}<br>
    links: {{r.links}}
    <!-- <hr>
    {{JSON.stringify(r)}} -->

  </div>
</template>

<script>
export default {
  name: "Relation",
  props: ['url'],
  data(){
    return{
      r: {}
    }
  },
  created(){
    this.init()
  },
  methods:{
    async init(){

      this.r = await this.$getRelation(this.url)

    }
  }
}
</script>

<style>

</style>
