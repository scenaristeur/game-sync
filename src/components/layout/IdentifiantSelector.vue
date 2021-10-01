<template>
  <b-container>
    <IdentifiantSearch :items="items"/>
    <IdentifiantListe :items="items"/>
  </b-container>
</template>

<script>
export default {
  name: "IdentifiantSelector",
  props: ["items"],
  components: {
    'IdentifiantSearch': () => import('@/components/layout/IdentifiantSearch'),
    'IdentifiantListe': () => import('@/components/layout/IdentifiantListe'),
  },
}
</script>

<style>

</style>
