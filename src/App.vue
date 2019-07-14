<template>
  <div id="app">
    <div class="header"><Header/></div>
    <div class="background"><Background/></div>
    <div class="moneycard"><MoneyCard/></div>
    <div class="echarts"><Echarts/></div>
  </div>
</template>

<script>
import Header from './components/Header'
import Background from './components/Background'
import MoneyCard from './components/MoneyCard'
import Echarts from './components/ECharts'
export default {
  name: 'App',
  components:{
    Header,
    Background,
    MoneyCard,
    Echarts
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
  z-index: 3000;
}
.background{
  position: absolute;
  top: 0;
  left: 0;
  z-index:0;
}
.moneycard{
  position: relative;
  z-index: 1010;
  top: 100px;
  left: -30px;
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
</style>
