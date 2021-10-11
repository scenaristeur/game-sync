<template>
  <div id="calendrier">

    <v-calendar class="container fluid"
    :attributes="attributes"
    @dayclick='dayClicked'
    >
  </v-calendar>
  <div
  v-if='selectedDay'
  class='selected-day'>
  <h3>{{ selectedDay.date.toDateString() }}</h3>
  <ul>
    <li
    v-for='attr in selectedDay.attributes'
    :key='attr.key'>
    {{ attr.customData.title }}<br>
    actors
    {{ attr.customData.actors }}
  </li>
</ul>
</div>
<!-- {{JSON.stringify(selectedDay)}} -->
</div>
</template>

<script>
export default {
  name: "Calendrier",
  data() {
    //  const month = new Date().getMonth();
    //const year = new Date().getFullYear();
    return {
      selectedDay: null, // Add state to store selected day
      todos: [

        {
          id: 1,
          title: 'Clean the house.',
          actors: ["one", "two"],
          date: new Date(2021, 9, 15),
          isCompleted: false,
          color: 'red'
        },
        {
          id: 2,
          title: 'Clean the Car.',
          actors: ["tri", "four"],
          date: new Date(2021, 9, 15),
          isCompleted: true,
          color: 'blue'
        },
        {
          id: 3,
          title: 'Clean the Body.',
          actors: ["five", "six"],
          date: {start: new Date(2021, 9, 10), end: new Date(2021, 9, 20)},
          isCompleted: true,
          color: 'blue'
        },
        {
          id: 4,
          title: 'Clean the Car.',
          actors: ["tri", "four"],
          date: new Date(2021, 9, 15),
          isCompleted: true,
          dot: 'green'
        },
        {
          id: 5,
          title: 'Clean the Car.',
          actors: ["tri", "four"],
          date: new Date(2021, 9, 15),
          isCompleted: true,
          color: 'blue'
        },
        {
          id: 6,
          title: 'Clean the Car.',
          actors: ["tri", "four"],
          date: new Date(2021, 9, 15),
          isCompleted: true,
          color: 'blue'
        },
        {
          id: 7,
          title: 'Clean the Car.',
          actors: ["tri", "four"],
          date: new Date(2021, 9, 15),
          isCompleted: true,
          dot: 'green'
        },
        {
          id: 8,
          title: 'Clean the Car.',
          actors: ["tri", "four"],
          date: new Date(2021, 9, 17),
          isCompleted: true,
          bar: true,        // Boolean, String, Object
          content: 'red',
        },
        {
          id: 9,
          title: 'Clean the steak.',
          actors: ["tri", "four"],
          date: new Date(2021, 9, 17),
          isCompleted: true,
          popover: { /*console.log("pop")*/ },
          highlight: true,  // Boolean, String, Object
          dot: true,        // Boolean, String, Object
          bar: true,        // Boolean, String, Object
          color: 'red',
        },
        {
          id: 10,
          title: 'Clean the Car.',
          actors: ["tri", "four"],
          date: new Date(2021, 9, 15),
          isCompleted: true,
          color: 'blue'
        },
      ],
    }
  },
  methods: {
    dayClicked(day) {
      this.selectedDay = day;
      // console.log(this.selectedDay.attributes)
      // console.log(this.selectedDay.attributesMap)
    },
  },
  computed: {
    attributes() {
      let attrs = this.todos.map(t => ({
        key: `todo.${t.id}`,
        dot: {
          backgroundColor: t.color,
        },
        dates: t.date,
        customData: t,
      }));

      // let today =   {
      //   key: 'today',
      //   highlight: true,
      //   dates: new Date(),
      // }
      // attrs.push(today)
      return attrs
    },
  }
}
</script>

<style>
/* #calendrier {
  display: flex;
} */

.selected-day {
  margin-left: 10px;
}

</style>
