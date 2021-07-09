<template>
  <div>
    Sync
    <UrlChoose />
    <GraphCreate />
    <GraphList />
    <GraphPlay />
  </div>
</template>

<script>
export default {
  name: 'Sync',
  components: {
    'UrlChoose': () => import('@/components/sync/UrlChoose'),
    'GraphCreate': () => import('@/components/sync/GraphCreate'),
    'GraphList': () => import('@/components/sync/GraphList'),
    'GraphPlay': () => import('@/components/sync/GraphPlay'),
  },
}
</script>

<style>

</style>
