<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Sync</router-link> |
      <!-- <router-link to="/syncess">Entreprise Solid Server</router-link> | -->
      <router-link to="/about">About</router-link>
    </div>
    <div>
    </div>
    <router-view/>

    <!-- <Login /> -->
    <!-- <ResourcesList /> -->
    <!-- <Game /> -->
    <small><i>0.0.8- properties</i></small>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {
    // 'Login': () => import('@/components/solid/Login'),
    // 'Game': () => import('@/components/Game'),
    //  'ResourcesList': () => import('@/components/ResourcesList'),
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<!-- <style scoped>
h3 {
margin: 40px 0 0;
}
ul {
list-style-type: none;
padding: 0;
}
li {
display: inline-block;
margin: 0 10px;
}
a {
color: #42b983;
}
</style> -->

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
