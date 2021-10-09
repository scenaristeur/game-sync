<template>
  <b-container>
    <b-button @click="mode = 'Wikimedia'"
    :variant="mode == 'Wikimedia'? 'primary' : 'outline-primary'" >
    Wikimedia
  </b-button>
  <b-button @click="mode = 'libre'"
  :variant="mode == 'libre'? 'primary' : 'outline-primary'" >
  Free id or url
</b-button>

<vue-tags-input
v-if="mode == 'Wikimedia'"
v-model="tag"
:tags="tags"
:autocomplete-items="autocompleteItems"
@tags-changed="update"
/>

<b-input-group  v-if="mode == 'libre'" >
  <b-form-input v-on:keyup.native.enter="add" v-model="itemIdentifiant" placeholder="url / identifiant"></b-form-input>
  <b-input-group-append>
    <!-- <b-button variant="outline-dark">Cancel</b-button> -->
    <b-button variant="success" @click="add">Add</b-button>
  </b-input-group-append>
</b-input-group>



<!-- <b-button @click="showPod = !showPod"
:variant="showPod == true? 'primary' : 'outline-primary'">
Pod
</b-button>
<b-button @click="showSemapps = !showSemapps" disabled
:variant="showSemapps == true? 'primary' : 'outline-primary'">
Semapps
</b-button> -->
<!-- <b-button @click="google" disabled
:variant="showGoogle == true? 'primary' : 'outline-primary'"
>
Google
</b-button> -->

</b-container>
</template>

<script>
import _ from 'underscore'
const API_URL = 'https://www.wikidata.org/w/api.php?action=wbsearchentities&origin=*&format=json'

export default {
  name: "IdentifiantSearch",
  props: ["items"],
  components: {
    'VueTagsInput': () => import('@johmun/vue-tags-input'),
  },
  data(){
    return{
      itemIdentifiant: "",
      tag: '',
      tags: [],
      autocompleteItems: [],
      debounce: null,
      mode: null,
      // showPod: false,
      // showSemapps: false,
      // showGoogle: false,
    }
  },
  created() {
    this.language = navigator.language.split("-")[0] || 'en'
    //this.initForm(this.$route.query)
  },
  methods:{
    add(){
      this.items.push({text:this.itemIdentifiant})
      this.itemIdentifiant = ""
    },
    update(newTags) {
      this.autocompleteItems = [];
      this.tags = newTags;
    },

    async getItems(query){
      this.getWikidataItems(query)
      this.getSolidtems(query)
      this.getSemappsItems(query)
      //this.getGoogleItems(query)
    },


    async getWikidataItems(query) {
      //  this.conceptUri = ""
      if(query.length>0){
        this.loading = true
        let search_url = API_URL+"&language="+this.language+"&search="+query
        console.log(search_url)
        try{
          const res = await fetch(search_url)
          const suggestions = await res.json()
          console.log(suggestions)
          // this.items = suggestions.search
          // console.log(this.items)
          this.autocompleteItems = suggestions.search.map(a => {
            return { text: /*"wikidata: "+*/a.match.text+" ("+a.description+")", url: a.concepturi };
          });
        }catch(e){
          alert(e)
        }
        this.loading = false
      }
    },
    // hndlr(response) {
    //   for (var i = 0; i < response.items.length; i++) {
    //     var item = response.items[i];
    //     console.log("item",item)
    //     // in production code, item.htmlTitle should have the HTML entities escaped.
    //     //document.getElementById("content").innerHTML += "<br>" + item.htmlTitle;
    //   }
    // },
    async getSolidtems(query){
      console.log("todo ", query)
    },
    async getSemappsItems(query){
      console.log("todo https://data.virtual-assembly.org/", query)
    },
    async getGoogleItems(query){
      // let hndlr = this.hndlr
      // console.log(hndlr)

      let url = "https://www.googleapis.com/customsearch/v1?key=PUT_YOUR_KEY&cx=017576662512468239146:omuauf_lfve&q="+query
      //  GET https://www.googleapis.com/customsearch/v1?key=INSERT_YOUR_API_KEY&cx=017576662512468239146:omuauf_lfve&q=lectures

      let results = await fetch(url)
      .then(function(resp) {
        console.log(resp)
        return resp.json()
      })
      .catch(function(err) {
        console.log("err",err)
        return err
      });

      console.log("results",results)

    },
    // getVariant(param){
    //   console.log("variant param",param)
    //   return param == true ? "secondary-outline" : "secondary"
    // }
  },
  watch:{
    'tag': _.debounce(function(item) { this.getItems(item) }, 500),
    tags(){
      console.log(this.tags)
      this.tags.forEach((t) => {
        var index = this.items.findIndex(x => x.url==t.url);
        index === -1 ? this.items.push(t) : ""

      });

      console.log(this.items)
      //  this.note.tags = this.tags//.map(t => t.text.trim())
    },
  }
}
</script>

<style>

</style>
