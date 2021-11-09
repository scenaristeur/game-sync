<template>
  <div id="app">
    <Navbar />
    <router-view/>

    <!-- <Login /> -->
    <!-- <ResourcesList /> -->
    <!-- <Game /> -->
    <small><i>0.0.11 - wiki</i></small>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {
     'Navbar': () => import('@/components/layout/Navbar'),
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
