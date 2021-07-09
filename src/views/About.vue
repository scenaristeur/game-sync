<template>
  <div class="about">
    <h1>This is an about page</h1>
      <Todo />
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {
    'Todo': () => import('@/components/Todo'),
  },
}
</script>
