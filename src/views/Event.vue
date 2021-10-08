<template>
  <div class="about">
    <h1>This is an test page</h1>


    <hr>
    <CalendarTop />
    <SimpleTimeline />
    <hr>
    <TimelineTest />
    <hr>
  </div>
</template>

<script>
export default {
  name: 'Test',
  components: {
    'SimpleTimeline': () => import('@/components/timeline/SimpleTimeline'),
    'CalendarTop': () => import('@/components/timeline/CalendarTop'),
    'TimelineTest': () => import('@/components/timeline/TimelineTest'),

  },
}
</script>
