<template>
  <div>


    <NetworkView />

    <GraphList />
    <GraphCreate />
    <UrlChoose />
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
    'NetworkView': () => import('@/components/sync/NetworkView'),
  },
}
</script>

<style>

</style>
