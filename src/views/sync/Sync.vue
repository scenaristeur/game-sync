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

    <CommandInput />
    <NetworkView />

    <UrlChoose />
    <!-- <Toolbar /> -->
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
    // 'Toolbar': () => import('@/components/sync/Toolbar'),
    'CommandInput': () => import('@/components/layout/CommandInput')
  },
}
</script>

<style>

</style>
