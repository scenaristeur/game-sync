<template>
  <b-container>
    Event creation
    <!-- <b-button @click="now">Now</b-button> -->
    <b-input-group size="sm" prepend="Title" >
      <b-form-input v-model="event.title"></b-form-input>


      <form class="bg-white shadow-md rounded px-8 pt-6 pb-8" @submit.prevent>
        <div class="mb-4">
          <span class="block text-gray-600 text-sm text-left font-bold mb-2"
          >Select Range</span
          >
          <DatePicker
          v-model="range"
          mode="dateTime"
          :masks="masks"
          locale="fr"
          is-range
          is24hr
          >
          <template v-slot="{ inputValue, inputEvents, isDragging }">
            <div class="flex flex-col sm:flex-row justify-start items-center">
              <div class="relative flex-grow">
                <!-- <svg
                class="text-gray-600 w-4 h-full mx-2 absolute pointer-events-none"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
                >
                <path
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                ></path>
              </svg> -->
              <input
              class="flex-grow pl-8 pr-2 py-1 bg-gray-100 border rounded w-full"
              :class="isDragging ? 'text-gray-600' : 'text-gray-900'"
              :value="inputValue.start"
              v-on="inputEvents.start"
              />
            </div>
            <!-- <span class="flex-shrink-0 m-2">
            <svg
            class="w-4 h-4 stroke-current text-gray-600"
            viewBox="0 0 24 24"
            >
            <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </span> -->
        <div class="relative flex-grow">
          <!-- <svg
          class="text-gray-600 w-4 h-full mx-2 absolute pointer-events-none"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
          >
          <path
          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          ></path>
        </svg> -->
        <input
        class="flex-grow pl-8 pr-2 py-1 bg-gray-100 border rounded w-full"
        :class="isDragging ? 'text-gray-600' : 'text-gray-900'"
        :value="inputValue.end"
        v-on="inputEvents.end"
        />
      </div>
    </div>
  </template>
</DatePicker>
</div>
</form>
</b-input-group>
<!-- <Calendar /> -->

<IdentifiantSelector categorie="Actors" :items="event.actors"/>
<IdentifiantSelector categorie="Actions" :items="event.actions"/>
<IdentifiantSelector categorie="Objects" :items="event.objects"/>
<IdentifiantSelector categorie="(optionnel) Contexts, Conditions, Contraintes" :items="event.contexts"/>

<hr>


<b-form-group label="Where do you want to publish your event:" v-slot="{ ariaDescribedby }">
  <b-form-checkbox-group
  id="checkbox-group-1"
  v-model="publishTo"
  :options="options"
  :aria-describedby="ariaDescribedby"
  name="flavour-1"
  >
  <b-button @click="addAnotherDestination" size="sm" variant="primary">Add another destination</b-button>
</b-form-checkbox-group>
</b-form-group>
<b-button variant="primary" @click="send">Send</b-button>
</b-container>
</template>

<script>
//import Calendar from 'v-calendar/lib/components/calendar.umd'
import DatePicker from 'v-calendar/lib/components/date-picker.umd'


export default {
  name: "EventCreation",
  components: {
    //  Calendar,
    DatePicker,
    'IdentifiantSelector': () => import('@/components/layout/IdentifiantSelector'),
    // 'TimelineTest': () => import('@/components/timeline/TimelineTest'),
  },
  data(){
    return{
      //date: new Date(),
      range: {
        start: new Date(2020, 0, 6),
        end: new Date(2020, 0, 23),
      },
      masks: {
        input: 'DD-MM-YYYY h:mm',
      },
      event: {
        //"date": new Date(),
        //  "when" : {},
        "start" : null,
        "end": null,
        "recursion" : {},
        "actors": [],
        "actions": [],
        "objects": [],
        "contexts": []
      },
      publishTo: ["private"], // Must be an array reference!
      options: [
        { text: 'Private', value: 'private' },
        { text: 'Public', value: 'public' },
        { text: 'Agora', value: 'agora' },
        //  { text: 'Add Another destination', value: 'grape' }
      ]
    }
  },
  created(){
    this.now()
  },
  methods:{
    now(){
      this.range.start = new Date()
      this.range.end = new Date()
    },
    send(){
      console.log(this.range)

      this.event.start = this.dateFormat(this.range.start)
      this.event.end = this.dateFormat(this.range.end)
      console.log(this.event, this.publishTo)
      let event = { "title": this.event.title, "startDate": this.event.start, "endDate": this.event.end }
      this.$store.commit('events/addEvent', event)
    },
    addAnotherDestination(){
      alert("Todo")
    },
    dateFormat(d){
      return d.getFullYear() + "-" + (d.getMonth()+1) + "-" + d.getDate() + " " +
      d.getHours() + ":" + d.getMinutes();
    }
  }
}
</script>

<style>

</style>
