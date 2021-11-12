<template>
  <div v-if="relations.length > 0">

    <b-button variant="outline-primary" size="sm" @click="show = !show">relations</b-button>
    <b-list-group v-if="show">
      <b-list-group-item v-for="r in relations" :key="r">
        <Relation :url="r" />
      </b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>
export default {
  name: "Relations",
  props: ['relations'],
  components: {
    'Relation': () => import('@/components/layout/Relation'),
  },
  data(){
    return{
      show: false
    }
  }
}
</script>

<style>

</style>
