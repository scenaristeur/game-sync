<template>
  <div class="about">
    <h1>This is an test page</h1>
    <hr>
    <EventCreation />
    <hr>
    <TimelineTest />
    <hr>
  </div>
</template>

<script>
export default {
  name: 'Test',
  components: {
    'TimelineTest': () => import('@/components/timeline/TimelineTest'),
    'EventCreation': () => import('@/components/timeline/EventCreation'),
  },
}
</script>
