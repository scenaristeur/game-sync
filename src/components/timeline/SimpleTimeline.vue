<template>
  <div>
    SimpleTimeline
    <vue-timeline :data="events"></vue-timeline>
  </div>
</template>

<script>
import VueTimeline from "vue-timeline-component"

export default {
  name: "SimpleTimeline",
  components: {
  VueTimeline
},
data() {
  return {
    events: [{
        name: "event 1",
        start: new Date(2021, 9,1),
        end: new Date(2021, 9,4),
    },{
        name: "event 2",
        start: new Date(2020, 1,2),
        end: new Date(2020, 1,5),
    },{
        name: "event 3",
        start: new Date(2020, 1,3),
        end: new Date(2020, 1,10),
    }]
  }
},
}
</script>

<style>

</style>
