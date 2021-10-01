<template>
  <b-container>
    <b-button>Wikimedia</b-button><b-button>Pod</b-button><b-button>Google</b-button>
    <b-input-group prepend="id" class="mt-3">
      <b-form-input v-model="itemIdentifiant" placeholder="url / identifiant"></b-form-input>
      <b-input-group-append>
        <b-button variant="outline-dark">Cancel</b-button>
        <b-button variant="success" @click="add">Add</b-button>
      </b-input-group-append>
    </b-input-group>
  </b-container>
</template>

<script>
export default {
  name: "IdentifiantSearch",
    props: ["items"],
    data(){
      return{
        itemIdentifiant: ""
      }
    },
    methods:{
      add(){
        this.items.push({id:this.itemIdentifiant})
      }
    }
}
</script>

<style>

</style>
