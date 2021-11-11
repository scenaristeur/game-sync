<template>
  <div>
    <div v-if="wikiEntry != null">
      <!-- {{last}} -->
      <div>

        <b-card no-body>
          <b-tabs pills card :vertical="vertical">
            <b-button size="sm" variant="outline-primary" @click="toggleVertical">
              <b-icon icon="align-start" v-if="vertical == true"></b-icon>
              <b-icon icon="align-top" v-else></b-icon>
            </b-button>
            <!-- -->
            <b-tab v-for="(t, id) in wikiEntry.things" :key="id"
            :title="t.name">

            <b-card-text>
              <!-- {{t.id}}
              {{t.id == last}} -->
              <h5>{{t.name}}</h5>
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
          autofocus
          @change="contentChanged"
          ></b-form-textarea>
        </b-tab>

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
  </div>

  <!-- <div v-for="(t, id) in wikiEntry.things" :key="id">
  <b-button v-b-toggle :href="'#_'+id" @click.prevent>{{t.name}}</b-button>


  <b-collapse :id="'#_'+id">
  <b-card title="Collapsible card">
  Hello world!Hello world! {{id}}
</b-card>
</b-collapse>
</div> -->

</div>

<!-- <ul v-if="wikiEntry != null">
<li v-for="(t, id) in wikiEntry.things" :key="id">
{{t.name}}

</li>
</ul> -->
</div>
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
      vertical: false
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

    },
    contentChanged(){
      console.log(this.wikiEntry)
      this.$store.dispatch('wiki/update', this.wikiEntry);
    },
    toggleVertical(){
      this.vertical = !this.vertical
      console.log("vertical", this.vertical)
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
