<template>
  <b-container class="row mt-3">
    <b-col class="col-2">
      {{categorie}}
    </b-col>
    <b-col>
      <IdentifiantSearch :items="items"/>
    </b-col>
    <b-col>
      <IdentifiantListe :items="items"/>
    </b-col>
  </b-container>
</template>

<script>
export default {
  name: "IdentifiantSelector",
  props: ["items", "categorie"],
  components: {
    'IdentifiantSearch': () => import('@/components/layout/IdentifiantSearch'),
    'IdentifiantListe': () => import('@/components/layout/IdentifiantListe'),
  },
}
</script>

<style>

</style>
