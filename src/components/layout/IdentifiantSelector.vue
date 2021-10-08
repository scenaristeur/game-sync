<template>
  <b-tab :title="categorie" :active="active"><b-card-text>
  <!-- <b-container class="row mt-3"> -->
      <i>{{description}}</i>
    <b-col>
      <IdentifiantSearch :items="items"/>
    </b-col>
    <b-col>
      <IdentifiantListe :items="items"/>
    </b-col>
  <!-- </b-container> -->
  </b-card-text></b-tab>
</template>

<script>
export default {
  name: "IdentifiantSelector",
  props: ["items", "categorie", "description", "active"],
  components: {
    'IdentifiantSearch': () => import('@/components/layout/IdentifiantSearch'),
    'IdentifiantListe': () => import('@/components/layout/IdentifiantListe'),
  },
}
</script>

<style>

</style>
