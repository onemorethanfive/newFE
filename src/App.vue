<template>
  <div><HOME/></div>

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
.header {
  position: fixed;
  top: 0;
  left: 0;
  margin: 0;
  padding: 0;
  width: 100%;
  z-index: 3000;
}
.background {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
}
.moneycard {
  position: relative;
  z-index: 1010;
  top: 70px;
  right: 0;
  width: 60%;
  height: 80%;
  margin: auto;
}
.echarts {
  position: relative;
  z-index: 1000;
  text-align: -webkit-center;
  top: 200px;
  left: 0;
  right: 0;
  margin: 0 auto;
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
.buttonPanel {
  position: relative;
  z-index: 1000;
  text-align: -webkit-center;
  top: 500px;
  left: 0;
  right: 0;
  margin: 0 auto;
}
</style>
