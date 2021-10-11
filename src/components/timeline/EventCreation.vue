<template>
  <div>

    <!-- <b-button @click="now">Now</b-button> -->
    <b-input-group prepend="Title" class="mb-3" >
      <b-form-input v-model="event.title" autofocus></b-form-input>
    </b-input-group>


    <!-- <b-row>
    <b-col> -->
    <form class="bg-white shadow-md rounded px-8 pt-6 pb-8" @submit.prevent>
      <div class="mb-4">
        <!-- <span class="block text-gray-600 text-sm text-left font-bold mb-2"
        >Select Range</span
        > -->
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
            <b-input-group size="sm" prepend="start" >
              <input
              class="flex-grow pl-8 pr-2 py-1 bg-gray-100 border rounded w-full"
              :class="isDragging ? 'text-gray-600' : 'text-gray-900'"
              :value="inputValue.start"
              v-on="inputEvents.start"
              />
            </b-input-group>
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
      <b-input-group size="sm" prepend="end" >
        <input
        class="flex-grow pl-8 pr-2 py-1 bg-gray-100 border rounded w-full"
        :class="isDragging ? 'text-gray-600' : 'text-gray-900'"
        :value="inputValue.end"
        v-on="inputEvents.end"
        />
      </b-input-group>
    </div>
  </div>
</template>
</DatePicker>
</div>
</form>
<!-- </b-col>

<b-col> -->

<!-- </b-col>

</b-row> -->



<!-- <div class="accordion" role="tablist">
<b-card no-body class="mb-1">
<b-card-header header-tag="header" class="p-1" role="tab">
<b-button block v-b-toggle.accordion-1 variant="info">Accordion 1</b-button>
</b-card-header>
<b-collapse id="accordion-1" visible accordion="my-accordion" role="tabpanel">
<b-card-body>
<b-card-text>I start opened because <code>visible</code> is <code>true</code></b-card-text>
<b-card-text>{{ text }}</b-card-text>
<IdentifiantSelector categorie="Actors" active=active :items="event.actors"/>
</b-card-body>
</b-collapse>
</b-card>

<b-card no-body class="mb-1">
<b-card-header header-tag="header" class="p-1" role="tab">
<b-button block v-b-toggle.accordion-2 variant="info">Accordion 2</b-button>
</b-card-header>
<b-collapse id="accordion-2" accordion="my-accordion" role="tabpanel">
<b-card-body>
<b-card-text>{{ text }}</b-card-text>
</b-card-body>
</b-collapse>
</b-card>

<b-card no-body class="mb-1">
<b-card-header header-tag="header" class="p-1" role="tab">
<b-button block v-b-toggle.accordion-3 variant="info">Accordion 3</b-button>
</b-card-header>
<b-collapse id="accordion-3" accordion="my-accordion" role="tabpanel">
<b-card-body>
<b-card-text>{{ text }}</b-card-text>
</b-card-body>
</b-collapse>
</b-card>
</div> -->


<div>
  <b-tabs content-class="mt-3">
    <IdentifiantSelector categorie="Actors" active=active :items="event.actors"/>
    <IdentifiantSelector categorie="Actions" :items="event.actions"/>
    <IdentifiantSelector categorie="Objects" :items="event.objects"/>
    <IdentifiantSelector categorie="Contexts" description="(optional) Contexts, Conditions, Constraints" :items="event.contexts"/>
  </b-tabs>


  <!-- <b-tabs vertical content-class="mt-3">
  <IdentifiantSelector categorie="Actors" active=active :items="event.actors"/>
  <IdentifiantSelector categorie="Actions" :items="event.actions"/>
  <IdentifiantSelector categorie="Objects" :items="event.objects"/>
  <IdentifiantSelector categorie="Contexts" description="(optionnel) Contexts, Conditions, Contraintes" :items="event.contexts"/>
</b-tabs> -->

</div>
<hr>
<b-input-group size="sm">
  <b-form-input v-model="event.color" type="color"></b-form-input>
</b-input-group>
<b-input-group size="sm" prepend="certainty" >
  <b-form-input v-model="event.certainty" type="range"></b-form-input>
</b-input-group>
<hr>


<b-form-group label="Where do you want to publish your event:" v-slot="{ ariaDescribedby }">

  <b-form-checkbox-group
  id="checkbox-group-1"
  v-model="publishTo"
  :options="options"
  :aria-describedby="ariaDescribedby"
  name="flavour-1"
  >
  <b-form-checkbox value="private" :disabled="pod == null">Private</b-form-checkbox>
  <b-form-checkbox value="public" :disabled="pod == null">Public</b-form-checkbox>
  <b-alert :show="pod == null" variant="warning">You must login to store event on your Pod</b-alert>

  <b-button @click="addAnotherDestination" size="sm" variant="primary" disabled>Add another destination</b-button>
</b-form-checkbox-group>
</b-form-group>
<b-button v-if="publishTo.length > 0" variant="primary" @click="createEvent">Create (test)</b-button>

<b-button v-if="publishTo.length > 0" variant="primary" @click="send">Send</b-button>
<b-alert v-else show variant="warning">You must at leat select one destination</b-alert>
<br>

pod {{ JSON.stringify(pod)}}
<div v-if="debug == true">
  debug : {{ debug}}
  detail :  {{ JSON.stringify(detail)}}<br><br>
  event:     {{ JSON.stringify(event)}}
</div>
</div>
</template>

<script>
//import Calendar from 'v-calendar/lib/components/calendar.umd'
import DatePicker from 'v-calendar/lib/components/date-picker.umd'


export default {
  name: "EventCreation",
  props:['detail', "debug"],
  components: {
    //  Calendar,
    DatePicker,
    'IdentifiantSelector': () => import('@/components/layout/IdentifiantSelector'),
    // 'TimelineTest': () => import('@/components/timeline/TimelineTest'),
  },
  data(){
    return{
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
        // "recursion" : {},
        // "actors": [],
        // "actions": [],
        // "objects": [],
        // "contexts": [],
      },
      publishTo: [{name: 'agora', url:"https://agora.solidcommunity.net/public/" }], // Must be an array reference!
      options: [
        // { text: 'Private', value: {name: 'private'} },
        // { text: 'Public', value: {name:'public'} },
        { text: 'Agora', value: {name: 'agora', url:"https://agora.solidcommunity.net/public/" }},
        //  { text: 'Add Another destination', value: 'grape' }
      ]
    }
  },
  created(){
    this.init()
  },
  methods:{
    init(){
      this.range.start = new Date(this.detail.customData.start)
      this.range.end = new Date(this.detail.customData.end)
      this.event.title = this.detail.customData.title
      this.event.color = this.detail.customData.color || "#16C4F0"
      this.event.certainty = this.detail.customData.certainty || "50"
      this.event.actors = this.detail.customData.actors || []
      this.event.actions = this.detail.customData.actions || []
      this.event.objects = this.detail.customData.objects || []
      this.event.contexts = this.detail.customData.contexts || []
      // this.event = this.detail.customData
      // this.event.actors == undefined ? this.event.actors = [] : ""
      // this.event.actions == undefined ? this.event.actions = [] : ""
      // this.event.objects == undefined ? this.event.objects = [] : ""
      // this.event.contexts == undefined ? this.event.contexts = [] : ""
    },
    now(){
      this.range.start = new Date()
      this.range.end = new Date()
    },
    async createEvent(){
      this.event.start = this.range.start
      this.event.end = this.range.end
      let cal_event = await this.$eventAsToCal(this.event)
      let cal_as = await this.$eventCalToAs(this.event)
      console.log(cal_event, cal_as)
    },
    send(){
      console.log(this.range)

      this.event.start = this.range.start
      this.event.end = this.range.end
      console.log(this.event, this.publishTo)
      let event = {
        key: Date.now(),
        customData: this.event,
        dates:{
          start: this.event.start,
          end: this.event.end
        }
      }
      //let event = { "title": this.event.title, "startDate": this.event.start, "endDate": this.event.end }
      this.$store.dispatch('events/addEvent', {event: event, publishTo: this.publishTo})
    },
    addAnotherDestination(){
      alert("Todo")
    },
    dateFormat(d){
      return d.getFullYear() + "-" + (d.getMonth()+1) + "-" + d.getDate() + " " +
      d.getHours() + ":" + d.getMinutes();
    }
  },
  computed: {
    pod:{
      get () { return this.$store.state.solid.pod },
      set (/*value*/) { /*this.updateTodo(value)*/ }
    },
  }
}
</script>

<style>

</style>
