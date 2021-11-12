<template>
  <b-modal id="modal-mention-selector" :title="mentionTarget.name" @ok="update">
    <!-- <p class="my-4">Hello from modal!</p> -->
    <i> should separate this part in  two : ading props/adding links</i>
<b>For the moment, you MUST edit the content of the note to update these mentions !</b>

    <div>
      <b-tabs content-class="mt-3">
        <IdentifiantSelector categorie="Actors" active=active :items="mentionTarget.actors"/>
        <IdentifiantSelector categorie="Actions" :items="mentionTarget.actions"/>
        <IdentifiantSelector categorie="Objects" :items="mentionTarget.objects"/>
        <IdentifiantSelector categorie="Contexts" description="(optional) Contexts, Conditions, Constraints" :items="mentionTarget.contexts"/>
      </b-tabs>
    </div>
    <!-- {{JSON.stringify(item)}}
    <hr>
    {{JSON.stringify(mentionTarget)}} -->
  </b-modal>
</template>

<script>
export default {
  name: "MentionSelector",
  data(){
    return{
      //  item: {}
    }
  },
  components: {
    //  Calendar,
    // DatePicker,
    'IdentifiantSelector': () => import('@/components/layout/IdentifiantSelector'),
    // 'TimelineTest': () => import('@/components/timeline/TimelineTest'),
  },
  methods:{
    update(){
      console.log(this.mentionTarget)
    }
    // mentionTarget(mentionTarget){
    //   this.item.actors = mentionTarget.actors
    //   this.item.actions = mentionTarget.actions
    //   this.item.objects = mentionTarget.objects
    //   this.item.contexts = mentionTarget.contexts
    // }
  },
  computed:{
    pod:{
      get () { return this.$store.state.solid.pod },
      set (/*value*/) { /*this.updateTodo(value)*/ }
    },
    mentionTarget:{
      get () { return this.$store.state.wiki.mentionTarget },
      set (/*value*/) { /*this.updateTodo(value)*/ }
    },
  }
}
</script>

<style>

</style>
