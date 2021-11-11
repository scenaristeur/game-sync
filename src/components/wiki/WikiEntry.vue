<template>
  <div>
    <div v-if="wikiEntry != null">

      <div>
        <b-card no-body>
          <b-tabs pills card vertical>
            <!-- -->
            <b-tab v-for="(t, id) in wikiEntry.things" :key="id"
            :title="t.name">

            <b-card-text>
              {{t.name}}
              {{t.text}}

              <blockquote contenteditable="true" v-html="t.text">
                <p>Edit this content to add your own quote</p>
              </blockquote>

              <cite contenteditable="true">-- Write wikidata or semapps tags here, coma separated</cite>

            </b-card-text>

          </b-tab>

          <b-tab title="other thing" ><b-card-text>other entry in this wiki page</b-card-text></b-tab>
          <b-tab title="Tab 2"><b-card-text>Tab contents 2</b-card-text></b-tab>
          <b-tab title="Tab 3"><b-card-text>Tab contents 3</b-card-text></b-tab>


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
export default {
  name: "WikiEntry",
  props: ['url'],
  data(){
    return {
      wikiEntry : null
    }

  },
  created(){
    this.init()
  },
  methods: {
    async init(){
      console.log(this.url)
      this.wikiEntry = await this.$readWikiEntry(this.url)

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
