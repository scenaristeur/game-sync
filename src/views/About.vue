<template>
  <div class="about">
    <h1>This is an about page</h1>
    <Todo />

    <hr>
    <!-- <TimelineTest /> -->
    <hr>
  </div>
</template>

<script>
export default {
  name: 'About',
  components: {
    'Todo': () => import('@/components/Todo'),
    // 'TimelineTest': () => import('@/components/timeline/TimelineTest'),
  },
}
</script>
