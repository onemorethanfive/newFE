<template>

  <router-view></router-view>

</template>

<script>
import HOME from './components/HOME.vue'
export default {
  name: 'App',
  components:{
    HOME
  }
}
</script>

<style>
.el-row{
  background-color: rgba(143, 0, 0, 0.288);
}
body{
  margin:0px;
}
:root {
  font-size: 10px;
}
#app {
  font-family: "Open Sans", Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.el-col-lg-18 {
    width: 100%;
}
.el-col-lg-3{
  height: 0px;
}


/* .piechart {
  position: relative;
  z-index: 1000;
  text-align: -webkit-center;
  top: 300px;
  left: 0;
  right: 0;
  margin: 0 auto;
} */

</style>
