<template>
  <div class="text-center section">

    <h2 class="h2">Custom Calendars</h2>
    <p class="text-lg font-medium text-gray-600 mb-6">
      Roll your own calendars using scoped slots
    </p>





    <v-calendar
    class="custom-calendar max-w-full"
    :masks="masks"
    :attributes="attributes"
    disable-page-swipe
    is-expanded
    >
    <template v-slot:day-content="{ day, attributes }">
      <div class="flex flex-col h-full z-10 overflow-hidden">
        <!-- <span class="day-label text-sm text-gray-900" >{{ day.day }}</span> -->
        <b-button @click="create(day)" class="day-label text-sm text-gray-900"
         variant="outline-primary" size="sm">{{ day.day }}</b-button>
        <div class="flex-grow overflow-y-auto overflow-x-auto">
          <p
          v-for="attr in attributes"
          :key="attr.key"
          class="brd text-xs leading-tight rounded-sm p-1 mt-0 mb-1"
          :class="attr.customData.class"
          @click="showDetail(attr)"

          >
          <!-- @mouseover="showDetail(attr)" -->
          {{ attr.customData.title }}
        </p>
      </div>
    </div>
  </template>
</v-calendar>

<v-calendar
:attributes="attributes1" />

<b-modal v-if="detail != null" id="detail" size="xl" :title="detail.customData.title">

  <!-- date : {{detail.dates[0].isDate}} or range : {{detail.dates[0].isRange}} or iscomplex : {{ detail.dates[0].isComplex}} -->
  <hr>
  start: {{detail.customData.start.toLocaleDateString() }}
  <span v-if="detail.customData.start != undefined">{{ detail.customData.start.toLocaleTimeString()}}</span> <br>
  end: {{ detail.customData.end.toLocaleDateString() }}
  <span v-if="detail.customData.end != undefined">{{detail.customData.end.toLocaleTimeString()}}</span><br><br>
  <EventCreation :detail="detail" :debug="debug" />
  <!-- <p class="my-4">{{JSON.stringify(detail)}}</p> -->
  <!-- {{JSON.stringify(detail.dates[0],undefined,2)}} -->
</b-modal>
<b-button @click="debug = !debug">debug</b-button>
<div v-if="debug">  {{attributes}}</div>
</div>




</template>

<script>
export default {
  name: "CalendarTop",
  components:{
    'EventCreation': () => import('@/components/timeline/EventCreation'),
  },
  data() {

    const month = new Date().getMonth();
    const year = new Date().getFullYear();
    return {
      debug: false,
      detail: {customData: {start:new Date(), end: new Date()}},
      masks: {
        weekdays: 'WWW',
      },
      attributes1: [
        {
          // An optional key can be used for retrieving this attribute later,
          // and will most likely be derived from your data object
          //key: Any,
          // Attribute type definitions
          highlight: true,  // Boolean, String, Object
          dot: true,        // Boolean, String, Object
          bar: true,        // Boolean, String, Object
          content: 'red',   // Boolean, String, Object
          popover: { /*console.log("pop")*/ }, // Only objects allowed
          // Your custom data object for later access, if needed
          customData: { title:"swing" },
          // We also need some dates to know where to display the attribute
          // We use a single date here, but it could also be an array of dates,
          //  a date range or a complex date pattern.
          dates: new Date(),
          // You can optionally provide dates to exclude
          excludeDates: null,
          // Think of `order` like `z-index`
          order: 0
        },
        {
          dot: 'red',
          dates:{
            start: new Date(year, month, 1),
            monthlyInterval: 2,           // Every other month
            ordinalWeekdays: { [-1]: 6 }  // ...on the last Friday
          },
        },
        {
          bar: true,
          dates:
          {
            start: new Date(year, month, 4, 12, 2, 24),
            end: new Date(year, month, 5, 12, 2, 30)
          },
          customData: { title:"Range is cool" },

        }
      ],
      attributes: [
        {
          bar: true,
          dates:
          {
            start: new Date(year, month, 4, 12, 2, 24),
            end: new Date(year, month, 5, 12, 2, 30)
          },
          customData: { title:"Range is cool" },

        },
        {
          // An optional key can be used for retrieving this attribute later,
          // and will most likely be derived from your data object
          //key: Any,
          // Attribute type definitions
          highlight: true,  // Boolean, String, Object
          dot: true,        // Boolean, String, Object
          bar: true,        // Boolean, String, Object
          content: 'red',   // Boolean, String, Object
          popover: { /*console.log("pop")*/ }, // Only objects allowed
          // Your custom data object for later access, if needed
          customData: { title:"swing" },
          // We also need some dates to know where to display the attribute
          // We use a single date here, but it could also be an array of dates,
          //  a date range or a complex date pattern.
          dates: new Date(),
          // You can optionally provide dates to exclude
          excludeDates: null,
          // Think of `order` like `z-index`
          order: 0
        },
        {
          key: 1,
          customData: {
            title: 'Lunch with mom.',
            class: 'bg-danger text-light',
          },
          dates: new Date(year, month, 1, 12, 2, 24),
        },
        {
          key: 2,
          customData: {
            title: 'Range Take Noah to basketball practice',
            //  class: 'bg-blue-500 text-white',
          },
          dates:{
            start: new Date(year, month, 1, 12, 2, 24),
            end: new Date(year, month, 1, 12, 2, 30)
          }
        },
        {
          key: 3,
          customData: {
            title: "Noah's basketball game.",
            //  class: 'bg-blue-500 text-white',
          },
          dates: new Date(year, month, 5),
        },
        {
          key: 4,
          customData: {
            title: 'Take car to the shop',
            //  class: 'bg-indigo-500 text-white',
          },
          dates: new Date(year, month, 5),
        },
        {
          key: 4,
          customData: {
            title: 'Meeting with new client.',
            //  class: 'bg-teal-500 text-white',
          },
          dates: new Date(year, month, 7),
        },
        {
          key: 5,
          customData: {
            title: "Mia's gymnastics practice.",
            //  class: 'bg-pink-500 text-white',
          },
          dates: new Date(year, month, 11),
        },
        {
          key: 6,
          customData: {
            title: 'Cookout with friends.',
            //  class: 'bg-orange-500 text-white',
          },
          dates: { months: 5, ordinalWeekdays: { 2: 1 } },
        },
        {
          key: 7,
          customData: {
            title: "Mia's gymnastics recital.",
            //class: 'bg-pink-500 text-white',
          },
          dates: new Date(year, month, 22),
        },
        {
          key: 8,
          customData: {
            title: 'Visit great grandma.',
            //  class: 'bg-red-600 text-white',
          },
          dates: new Date(year, month, 25),
        },
      ],
    };
  },
  methods: {
    create(day){
      let attr = {dates: day.date, customData: {title: "New Event"+Date.now(), start: day.range.start, end: day.range.end}}
      //  this.$store.commit('events/addEvent', attr)
      this.detail = attr
      this.$bvModal.show("detail")
    },
    showDetail(e){
      console.log(e)
      this.detail = e
      this.$bvModal.show("detail")
    },
    // dateFormat(d){
    //   return d.toLocaleDateString() //d.getFullYear() + "-" + (d.getMonth()+1) + "-" + d.getDate()
    // },
    // dateTimeFormat(d){
    //   return d.getFullYear() + "-" + (d.getMonth()+1) + "-" + d.getDate() + " " +
    //   d.getHours() + ":" + d.getMinutes();
    // },
    // timeFormat(d){
    //   return d.toTimeString() //d.getHours() + ":" + d.getMinutes();
    // }
  },
  watch:{
    events(){
      //  this.attributes = []
      this.events.forEach((e) => {
        console.log(e)
        this.attributes.push(e)


      });

    }
  },
  computed: {
    events:{
      get () { return this.$store.state.events.events },
      set (/*value*/) { /*this.updateTodo(value)*/ }
    },
  }
};
</script>


<style scoped>
::-webkit-scrollbar {
  width: 0px;
}
::-webkit-scrollbar-track {
  display: none;
}
.custom-calendar.vc-container {
  --day-border: 1px solid #b8c2cc;
  --day-border-highlight: 1px solid #b8c2cc;
  --day-width: 90px;
  --day-height: 90px;
  --weekday-bg: #f8fafc;
  --weekday-border: 1px solid #eaeaea;
  border-radius: 0;
  width: 100%;
}
.custom-calendar.vc-header {
  background-color: #f1f5f8;
  padding: 10px 0;
}
.custom-calendar.vc-weeks {
  padding: 0;
}
.custom-calendar.vc-weekday {
  background-color: var(--weekday-bg);
  border-bottom: var(--weekday-border);
  border-top: var(--weekday-border);
  padding: 5px 0;
}
.custom-calendar.vc-day {
  padding: 0 5px 3px 5px;
  text-align: left;
  height: var(--day-height);
  min-width: var(--day-width);
  background-color: #ffeff8;
}
.custom-calendar.vc-day.weekday-1 .custom-calendar.vc-day.weekday-7 {
  background-color: #eff8ff;
}
.custom-calendar:not(.on-bottom) {
  border-bottom: var(--day-border);
}
.custom-calendar:not(.on-bottom).weekday-1 {
  border-bottom: var(--day-border-highlight);
}
.custom-calendar:not(.on-right) {
  border-right: var(--day-border);
}
.custom-calendar.vc-day-dots {
  margin-bottom: 5px;
}
.brd {
  border: 1px solid grey;
}

</style>
