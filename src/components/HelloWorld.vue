<template>
  <div class="hello">
    <Login />

    <!-- <TestNss />
    <hr> -->
    <Test />



  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  components: {
    //  'BookmarksList': () => import('@/components/bookmarks/BookmarksList'),
    'Test': () => import('@/components/Test'),
    'Login': () => import('@/components/solid/Login'),
    // 'TestNss': () => import('@/components/TestNss'),
  },
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
</style>
