<template>
  <fieldset v-if="permissions != null">
  <legend>Permissions</legend>
    <!-- url : {{url}}<br> -->
    agent read : {{ permissions.agentAccess.read}}<br>
    agent write : {{ permissions.agentAccess.write}}<br>
    public read : {{ permissions.publicAccess.read}}<br>
    public write : {{ permissions.publicAccess.write}}<br>


</fieldset>
</template>

<script>
export default {
  name: "Permissions",
  props: ['url'],
  data(){
    return {
      permissions : null
    }
  },
  created(){
    this.getPermissions()
  },
  methods:{
    async getPermissions(){
      if(this.pod != null){
      this.permissions = await this.$getPermissions(this.url)
      console.log("permissions", this.permissions)
    }
    },
  },
  watch:{
    pod(){
      //  console.log("pod",this.pod)
      if(this.pod != null){
        //  console.log("pod non null", this.pod)
        this.getPermissions()
      }
    }
  },
  computed:{
    pod:{
      get () { return this.$store.state.solid.pod },
      set (/*value*/) { /*this.updateTodo(value)*/ }
    },
  }
}
</script>

<style>
legend {
    background-color: #000;
    color: #fff;
    padding: 3px 6px;
      font: 1rem 'Fira Sans', sans-serif;
}

/* .output {
    font: 1rem 'Fira Sans', sans-serif;
}

input {
    margin: .4rem;
} */
</style>
