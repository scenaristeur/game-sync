<template>
  <b-container>
    <b-list-group v-if="items.length > 0">
      <b-list-group-item v-for="item in items" :key="item.id" button>{{JSON.stringify(item)}}</b-list-group-item>
    </b-list-group>
  </b-container>
</template>

<script>
export default {
  name: "IdentifiantListe",
  props: ["items"],
}
</script>

<style>

</style>
