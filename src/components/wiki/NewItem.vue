<template>
  <div class="add-item">
    <form action="#" method="post" v-on:submit.prevent="submitForm" class="mb-3">
      <b-form-input v-model="item.label" v-on:submit.prevent="submitForm" placeholder="Untitled"></b-form-input>
      <!-- <input type="text" v-model="itemText" placeholder="Add something to the backlog"> -->
    </form>
    <i>date: {{item.date}}</i>

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
    };
  },
  created() {
    this.init()
  },
  methods: {
    init(){
      let d = new Date()
      this.item.label = d.toLocaleDateString()+"-"+d.toLocaleTimeString() //uuidv4() //
      this.item.date = d
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
        this.item.url = this.path+uuidv4()+'.ttl'//#it'
        console.log(this.item)
        // this.$store.dispatch(this.namespace+'/addItem', {
        //   url : url,
        //   name: this.itemText,
        //   text: this.itemText
        // });
        // }


        this.item = '';
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
