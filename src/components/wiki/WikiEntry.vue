<template>

  <b-list-group-item v-if="wikiEntry != null && numberShown > 0">
    <!-- {{ numberShown}}
    {{searchQuery}} -->
    <!-- <div> -->

      <b-card no-body>
        <b-tabs pills card :vertical="vertical">
          <b-button size="sm" variant="outline-primary" @click="toggleVertical">
            <b-icon icon="align-start" v-if="vertical == true"></b-icon>
            <b-icon icon="align-top" v-else></b-icon>
          </b-button>
          <!-- -->
          <div v-for="(t, id) in wikiEntry.things" :key="id">
            <b-tab v-if="t.show"
            :title="t.name">

            <b-card-text>
              <!-- {{t.id}}
              {{t.id == last}} -->
              <h5>{{t.name}}</h5>
              <!-- {{searchQuery}} -->
              <!-- {{t.content}}

              <blockquote contenteditable="true" v-html="t.content">
              <p>Edit this content to add your own quote</p>
            </blockquote>

            <cite contenteditable="true">-- Write wikidata or semapps tags here, coma separated</cite> -->

          </b-card-text>
          <b-form-textarea
          id="textarea"
          v-model="t.content"
          placeholder="Enter something..."
          rows="3"
          max-rows="6"
          @change="contentChanged"
          ></b-form-textarea>
          <!-- {{JSON.stringify(t)}}
          <hr> -->
          <a :href="t.url" target="_blank">data</a>
        </b-tab>
      </div>

      <b-tab title="+" >
        <b-card-text>
          <b-input v-model="newnote.name" placeholder="name" @change="addNote" />

        </b-card-text>
        <!-- <b-form-textarea
        id="textarea"
        v-model="newnote.content"
        placeholder="Enter something..."
        rows="3"
        max-rows="6"
        @change="newNotecontentChanged"
        ></b-form-textarea> -->
      </b-tab>



    </b-tabs>
  </b-card>
<!-- </div> -->

<!-- <div v-for="(t, id) in wikiEntry.things" :key="id">
<b-button v-b-toggle :href="'#_'+id" @click.prevent>{{t.name}}</b-button>


<b-collapse :id="'#_'+id">
<b-card title="Collapsible card">
Hello world!Hello world! {{id}}
</b-card>
</b-collapse>
</div> -->

</b-list-group-item>

<!-- <ul v-if="wikiEntry != null">
<li v-for="(t, id) in wikiEntry.things" :key="id">
{{t.name}}

</li>
</ul> -->

<!-- <small>
{{JSON.stringify(wikiEntry)}}
</small> -->

</template>

<script>
import { v4 as uuidv4 } from 'uuid';

export default {
  name: "WikiEntry",
  props: ['url'],
  data(){
    return {
      wikiEntry : null,
      newnote: {},
      last: "",
      vertical: false,
       numberShown : 0
    }

  },
  created(){
    this.init()
  },
  methods: {
    async addNote(){
      console.log(this.wikiEntry)
      console.log(this.wikiEntry.things)
      console.log("new note", this.newnote)
      this.newnote.id = uuidv4()
      this.newnote.url = this.wikiEntry.url+"#"+this.newnote.id
      this.newnote.path = this.wikiEntry.path
      //  this.$store.dispatch('wiki/update', this.newnote);
      //this.wikiEntry.things.push(this.newnote)
      await this.$store.dispatch('wiki/add', this.newnote);
      this.last = this.newnote.id
      this.newnote = {}
      this.init()

    },
    async init(){
      //  console.log(this.url)
      this.wikiEntry = await this.$readWikiEntry(this.url)

      if(this.wikiEntry != null && this.wikiEntry.things.length > 0) {
        this.updateShow()
        this.$store.commit('wiki/updateIndex', this.wikiEntry);
      }
      //this.numberShown = 0
      //  console.log(this.wikiEntry)


    },
    contentChanged(){
      console.log(this.wikiEntry)
      this.$store.dispatch('wiki/update', this.wikiEntry);
    },
    toggleVertical(){
      this.vertical = !this.vertical
      console.log("vertical", this.vertical)
    },
    updateShow(){
      this.numberShown = 0

      for (const t of this.wikiEntry.things){
        if( t.name.includes(this.searchQuery)){
          t.show = true
          this.numberShown++
        }else{
          t.show = false
        }
      }
      if (this.searchQuery.length == 0) { this.numberShown = this.wikiEntry.things.length}
    }
    // show(t){
    //   t.show =  this.searchQuery.length == 0 || t.name.includes(this.searchQuery)
    //   return t.show
    // },

  },
  watch:{
    async url(){
      this.init()
    },
    searchQuery(){
      this.updateShow()
    }
  },
  computed:{
    // pod:{
    //   get () { return this.$store.state.solid.pod },
    //   set (/*value*/) { /*this.updateTodo(value)*/ }
    // },
    searchQuery:{
      get () { return this.$store.state.wiki.searchQuery },
      set (/*value*/) { /*this.updateTodo(value)*/ }
    },
    // showing:{
    //   get (){
    //     let show = true
    //     if(this.wikiEntry != null && this.wikiEntry.things.length > 0) {
    //       for (const t of this.wikiEntry.things){
    //         console.log(await t.show == true)
    //       }
    //     }else{
    //       show = false
    //     }
    //
    //     return show
    //   }
    //}
  }
}
</script>

<style>
.output {
  font: 1rem 'Fira Sans', sans-serif;
}

blockquote {
  background: #eee;
  border-radius: 5px;
  margin: 16px 0;
}

blockquote p {
  padding: 15px;
}

cite {
  margin: 16px 32px;
}

blockquote p::before {
  content: '\201C';
}

blockquote p::after {
  content: '\201D';
}

[contenteditable='true'] {
  caret-color: red;
}

</style>
