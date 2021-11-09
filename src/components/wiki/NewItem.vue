<template>
  <div class="add-item">
    <b-button variant="outline-primary" v-if="expand == false" @click="expanding">+</b-button>
    <div v-else  >
      <form action="#" method="post" v-on:submit.prevent="submitForm" class="mb-3">
        <b-form-input v-model="item.label" v-on:submit.prevent="submitForm" @blur="submitForm" placeholder="new note"></b-form-input>
        <!-- <input type="text" v-model="itemText" placeholder="Add something to the backlog"> -->
      </form>
      <b-input type="date" v-model="item.dateString"></b-input>
      <b-input type="time" v-model="item.time"></b-input>
    </div>
  </div>
</template>

<script>
import { v4 as uuidv4 } from 'uuid';
export default {
  name: "NewItem",
  props: ['path'],
  data() {
    return {
      item: {},
      expand: false
    };
  },
  created() {
    this.init()
  },
  methods: {
    expanding(){
      this.expand = true
      this.init()
    },
    init(){
      let d = new Date()

      //this.item.label = d.toLocaleDateString()+"-"+d.toLocaleTimeString() //uuidv4() //
      this.item.date = d
      this.item.dateString = this.formatDate(d)
      this.item.time = d.toLocaleTimeString()
      this.item.label = d.toLocaleDateString()+"-"+d.toLocaleTimeString()
      console.log(this.item)
    },
    formatDate(d){
      return d.getFullYear()+"-"+("0" + (d.getMonth() + 1)).slice(-2)+"-"+("0" + d.getDate()).slice(-2)
    },
    submitForm() {
      if (this.item) {

        // if(this.namespace == 'kanban'){
        //   this.$store.commit(this.namespace+'/addItem', {
        //     text: this.itemText,
        //   });
        // }else{
        //   console.log('route',this.$route)
        //let path = this.$store.state.solid.storage+this.$store.state.table.privacy+'/table/workspaces/'
        this.item.path = this.path
        this.item.id = uuidv4()//#it'
        console.log(this.item)
        this.$store.dispatch('wiki/create', this.item);


        this.item = {}
        this.expand = false
        //  this.init()
      }
    },
  },
}
</script>

<style>
.add-item input {
  outline: none;
  border: 0;
  /*  border-bottom: 1px solid rgba(255, 255, 255, 0.5);*/
  width: 100%;
  transition: all 0.25s;
  background: inherit;
  color: grey;
}
.add-item input:focus {
  /*border-bottom-color: rgba(255, 255, 255, 1);*/
}
</style>
