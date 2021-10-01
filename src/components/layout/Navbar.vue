<template>
  <div>

     <b-navbar toggleable="lg" type="light" variant="light">
  <b-navbar-brand to="/">Sync</b-navbar-brand>
  <Login />
  <!-- <router-link to="/syncess">Entreprise Solid Server</router-link> | -->
  <!-- <div>
<b-button-toolbar key-nav aria-label="Toolbar with button groups">
<b-button-group class="mx-1">
  <b-button>&laquo;</b-button>
  <b-button>&lsaquo;</b-button>
</b-button-group>
<b-button-group class="mx-1">
  <b-button>Edit</b-button>
  <b-button>Undo</b-button>
  <b-button>Redo</b-button>
</b-button-group>
<b-button-group class="mx-1">
  <b-button>&rsaquo;</b-button>
  <b-button>&raquo;</b-button>
</b-button-group>
</b-button-toolbar>
</div> -->

  <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

  <b-collapse id="nav-collapse" is-nav>
    <b-navbar-nav>
        <b-nav-item to="/about">About</b-nav-item>
        <b-nav-item to="/test">Test timeline</b-nav-item>
        <b-nav-item to="/event">Event</b-nav-item>
      <!-- <b-nav-item href="#">Link</b-nav-item>
      <b-nav-item href="#" disabled>Disabled</b-nav-item> -->



    </b-navbar-nav>

    <!-- Right aligned nav items -->
    <b-navbar-nav class="ml-auto">
      <!-- <b-nav-form>
        <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
        <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
      </b-nav-form>

      <b-nav-item-dropdown text="Lang" right>
        <b-dropdown-item href="#">EN</b-dropdown-item>
        <b-dropdown-item href="#">ES</b-dropdown-item>
        <b-dropdown-item href="#">RU</b-dropdown-item>
        <b-dropdown-item href="#">FA</b-dropdown-item>
      </b-nav-item-dropdown>



      <b-nav-item-dropdown right>-->
        <!-- Using 'button-content' slot -->
      <!--  <template #button-content>
          <em>User</em>
        </template>
        <b-dropdown-item href="#">Profile</b-dropdown-item>
        <b-dropdown-item href="#">Sign Out</b-dropdown-item>
      </b-nav-item-dropdown> -->
    </b-navbar-nav>
  </b-collapse>
</b-navbar>

  </div>
</template>

<script>
export default {
name: "Navbar",
components: {
  'Login': () => import('@/components/solid/Login'),
},
}
</script>

<style>

</style>
