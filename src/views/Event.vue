<template>
  <div>
    <b-container class="row">

      <CalendarList class="col-md-3 col-12 mb-2"/>
      <Calendrier class="col-md-3 col-12"/>
      <!-- <h1>This is an test page</h1>


      <hr> -->

      <!-- <SimpleTimeline />
      <hr>
      <TimelineTest />
      <hr> -->
    </b-container>

    <CalendarTop />
  </div>
</template>

<script>
export default {
  name: 'Event',
  components: {
    'Calendrier': () => import('@/components/timeline/Calendrier'),
    'CalendarList': () => import('@/components/timeline/CalendarList'),
    // 'SimpleTimeline': () => import('@/components/timeline/SimpleTimeline'),
    'CalendarTop': () => import('@/components/timeline/CalendarTop'),
    // 'TimelineTest': () => import('@/components/timeline/TimelineTest'),

  },
}
</script>
