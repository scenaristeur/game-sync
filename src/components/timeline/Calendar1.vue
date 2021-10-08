<template>
  <div>
  {{ events}}
  <SpringCalendar year="2021" color="#41b883" :events="events" locale="fr"/>
</div>
</template>

<script>
import SpringCalendar from "vue-spring-calendar";
export default {
  name: "Calendar",
  components: {
    SpringCalendar
  },
  data: () => ({
    eventsBegin:[
    {
        title:'Event 1',
        startDate:'2021-10-01 08:00'/*,
        endDate:'2021-10-03 12:00',*/
    },
    {
        title:'Test de calendar',
        startDate:'2021-10-08 09:00',
        endDate:'2021-10-08 12:00',
    },
    {
        title:'Test de calendar 2',
        startDate:'2021-10-08 09:00',
        endDate:'2021-10-08 14:00',
    },
    // {
    //     title:'Test de calendar 3',
    //     startDate:'2021-10-08 07:00',
    //     endDate:'2021-10-08 15:00',
    // },
    // {
    //     title:'Test de calendar 4',
    //     startDate:'2021-10-08 17:00',
    //     endDate:'2021-10-08 19:00',
    // },
    // {
    //     title:'Projet',
    //     startDate:'2021-11-05 12:00',
    //     endDate:'2021-11-05 16:00',
    // },
    ]

  }),
  created(){
    this.eventsBegin.forEach((e) => {
      this.$store.commit('events/addEvent',e)
    });

  },
  computed: {
    events:{
      get () { return this.$store.state.events.events },
      set (/*value*/) { /*this.updateTodo(value)*/ }
    },
  }
};
</script>

<style>

</style>
