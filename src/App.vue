<template>
  <div id="app">
    <div class="header"><Header/></div>
    <div class="background"><Background/></div>
  </div>
</template>

<script>
import Header from './components/Header'
import Background from './components/Background'
export default {
  name: 'App',
  components:{
    Header,
    Background
  }
}
</script>

<style>
#app {
  font-family: "Open Sans", Arial, sans-serif;

  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.header{
    position: fixed;
    top: 0;
    left: 0;
    margin: 0;
    padding: 0;
    width: 100%;
    z-index: 1001;
}
.background{
    position: absolute;
    top: 0;
    left: 0;
}
</style>
