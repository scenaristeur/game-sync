<template>
  <b-container>
    My Calendars
    <b-list-group>
      <b-list-group-item button
      v-for="calendar in calendars"
      :key="calendar.name"
      :active="calendar.active"
      :disabled="calendar.disabled"
      :style="calendar.active? 'backgroundColor:'+calendar.color : ''"
      class="p-0"
      @click.self="clickCalendar(calendar)">{{calendar.name}}
      <span v-if="calendar.disabled == true"> (not logged)</span>
      <b-button v-else size="sm" class="p-0 m-0" @click="calSettings(calendar)">
        <b-icon icon="gear-fill" aria-hidden="true" ></b-icon>
      </b-button>
    </b-list-group-item>
    <b-list-group-item button class="p-1" @click="addCalandar">
      <b-button variant="outline-primary" size="sm"  class="mr-2 pt-0 pb-0">+</b-button>new calendar</b-list-group-item>

    </b-list-group>


    <b-modal id="settings" :title="currentCal.name" @ok="updateCalendars">
      <b-container fluid>
        <b-row class="my-1">
          <b-col sm="2">
            <label for="input-name">Name:</label>
          </b-col>
          <b-col sm="10">
            <b-form-input v-model="currentCal.name" id="input-name" size="sm" placeholder="Calendar name"></b-form-input>
          </b-col>
        </b-row>
        <b-row class="my-1">
          <b-col sm="2">
            <label for="input-url">Url:</label>
          </b-col>
          <b-col sm="10">
            <b-form-input v-model="currentCal.url" id="input-url" size="sm" placeholder="Calendar url">
            </b-form-input>
            <!-- <b-button size="sm" class="p-0 m-0" title="Reset to default">
            <b-icon icon="skip-backward" aria-hidden="true" ></b-icon>
          </b-button> -->

        </b-col>
      </b-row>
      <b-row class="my-1">
        <b-col sm="2">
          <label for="input-color">Color:</label>
        </b-col>
        <b-col sm="10">
          <b-form-input v-model="currentCal.color" id="input-color" type="color" size="sm"></b-form-input>
        </b-col>
      </b-row>

      <b-row class="my-1">
        <b-col sm="2">
          <label for="input-active">Active:</label>
        </b-col>
        <b-col sm="10">
          <b-form-checkbox
          v-model="currentCal.active" id="input-active" >
          active
        </b-form-checkbox>
      </b-col>
    </b-row>

    <b-row class="my-1">
      <b-col sm="2">
        <label for="input-active">Visibility / Share:</label>
      </b-col>
      <b-col sm="10">
        {{currentCal.permissions}}
      </b-col>
    </b-row>

    <b-row class="my-1">
      <b-col sm="2">
        <b-button class="p-0" title="Not implemented yet" variant="danger">
          <b-icon icon="trash"  variant="outline-danger" aria-hidden="true" ></b-icon>
        </b-button>
      </b-col>

    </b-row>

  </b-container>
</b-modal>

</b-container>
</template>

<script>
export default {
  name: "CalendarList",
  data(){
    return {
      currentCal: {}
    }
  },
  created(){
    //  this.updateWithPod()
  },
  methods:{
    addCalandar(){
      let date = ""+Date.now()
      let cal = {name: date}

      this.calendars[date] = cal
      this.calSettings(cal)
    },
    clickCalendar(c){
      console.log(c)
      c.active = !c.active
    },
    calSettings(c){
      this.currentCal = c
      this.$bvModal.show("settings")
    },
    updateCalendars(){
      this.$store.dispatch('events/updateCals', this.calendars)
    },
    updateWithPod(){
      console.log("pod", this.pod)
      if (this.pod == null || this.pod == {}){
        this.calendars.private.active = false
        this.calendars.public.active = false
        this.calendars.private.disabled = true
        this.calendars.public.disabled = true
      }else{
        this.calendars.public.url = this.pod.storage+'public/events/'
        this.calendars.private.url = this.pod.storage+'private/events/'
        this.calendars.private.disabled = false
        this.calendars.public.disabled = false
      }

    }
  },
  watch:{
    pod(){
      this.updateWithPod()
    }
  },
  computed: {
    calendars:{
      get () { return this.$store.state.events.calendars },
      set (/*cals*/) { /*this.$store.dispatch('events/updateCals', cals)*/ }
    },
    pod:{
      get () { return this.$store.state.solid.pod },
      set (/*value*/) { /*this.updateTodo(value)*/ }
    },
  }
}
</script>

<style>

</style>
