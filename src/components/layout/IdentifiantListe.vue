<template>
  <b-container>
    <b-list-group v-if="items.length > 0">
      <b-list-group-item v-for="item in items" :key="item.id" button class="p-0">
        <!-- {{JSON.stringify(item)}} -->
{{item.text}}
        <b-button size="sm" @click="properties(item)" variant="outline-primary">more</b-button>
        <b-button v-if="item.url != undefined" size="sm" :href="item.url" target="_blank" variant="outline-primary">see</b-button>
      </b-list-group-item>
    </b-list-group>
  </b-container>
</template>

<script>
export default {
  name: "IdentifiantListe",
  props: ["items"],
  methods: {
    properties(item){
      alert("todo: add & manage properties of "+ JSON.stringify(item))
    }
  }
}
</script>

<style>

</style>
