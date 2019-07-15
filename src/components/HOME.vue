<template>
<my-container >
  <div id="app">
    <div class="header"><Header/></div>
    <div class="background"><Background/></div>
    <!-- <div class="moneycard"><MoneyCard/></div>
    <div class="echarts"><Echarts/></div>
    <div class="piechart"><PieChart/></div>
    <div class="buttonPanel"><ButtonPanel/></div> -->
  </div>
</my-container>
</template>

<script>
import Header from './Header'
import Background from './Background'
// import MoneyCard from './MoneyCard'
// import Echarts from './ECharts'
// import PieChart from './PieChart'
// import ButtonPanel from './ButtonPanel'
export default {
  name: 'App',
  components:{
    Header,
    Background,
    // MoneyCard,
    // Echarts,
    // PieChart,
    // ButtonPanel
  }
}
</script>

<style scoped>
.el-row{
  background-color: rgba(143, 0, 0, 0.288);
}
body{
  margin:0px;
}
:root{
  font-size:10px;
}
#app {
  font-family: "Open Sans", Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.header{
  top: 0;
  left: 0;
  margin: 0;
  padding: 0;
  width: 100%;
  z-index: 3000;
}
.background{
  position: absolute;
  top: 0;
  left: 0;
  z-index:0;
}


</style>
