<template>
  <b-container>
    <b-list-group v-if="items.length > 0">
      <b-list-group-item v-for="item in items" :key="item.id" button>{{JSON.stringify(item)}}

        <b-button size="sm" @click="properties(item)">properties</b-button>
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
