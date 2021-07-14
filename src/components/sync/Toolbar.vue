<template>
  <div>
    <b-button-toolbar key-nav aria-label="Toolbar with button groups">
      <!-- <b-button-group class="mx-1">
      <b-button>&laquo;</b-button>
      <b-button>&lsaquo;</b-button>
    </b-button-group> -->
    <b-button-group class="mx-1">
      <b-button>Add Node</b-button>
      <b-button>Add Edge</b-button>
      <b-button>Delete Node</b-button>
      <b-button>Delete Edge</b-button>
      <b-button>Delete Selected</b-button>
      <b-button>Edit Node</b-button>
      <b-button>Edit Edge</b-button>
    </b-button-group>

    <!-- <b-button-group class="mx-1">
    <b-button>&rsaquo;</b-button>
    <b-button>&raquo;</b-button>
  </b-button-group> -->
</b-button-toolbar>
</div>
</template>

<script>
export default {
  name: 'Toolbar',
  data(){
    return{
    //  inputValue: ""
    }
  },
  methods:{

  }
}
</script>

<style>

</style>
