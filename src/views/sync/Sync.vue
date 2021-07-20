<template>
  <div>
    <b-row>
      <b-col>
        <GraphCreate />
      </b-col>
      <b-col>
        <GraphList />
      </b-col>

    </b-row>
    <UrlChoose />
    <!-- <Toolbar /> -->
    <GraphPlay />
    <NetworkView />
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
    // 'Toolbar': () => import('@/components/sync/Toolbar'),
  },
}
</script>

<style>

</style>
