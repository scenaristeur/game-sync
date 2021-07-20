<template>
<span v-if="infos != null">
{{ infos.name}}
</span>
</template>

<script>
export default {
name: "Resource",
props: ['url'],
data(){
  return{
    infos: null
  }
},
created(){
  this.getInfos()
},
methods:{
  async getInfos(){
    this.infos = await this.$getResourceInfos(this.url)
    console.log("INFOs",this.infos)
  }
},
watch:{
  url(){
    this.getInfos()
  }
}
}
</script>

<style>

</style>
