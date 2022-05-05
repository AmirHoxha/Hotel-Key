<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>

export default {
  name: 'app',
  components: {

  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Fredoka+One&family=Poppins:ital,wght@0,400;1,600&display=swap');
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  color: #2c3e50;
  margin-top: 60px;
}
* {
  font-family: 'Poppins', sans-serif;
}
</style>
