<template>
  <div>

    <b-row>
      <b-col>
        <NetworkView />
      </b-col>
      <b-col>
        <Toolbar />
        <CommandInput />
      </b-col>
    </b-row>

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
    'Toolbar': () => import('@/components/sync/Toolbar'),
    'CommandInput': () => import('@/components/layout/CommandInput')
  },
}
</script>

<style>

</style>
