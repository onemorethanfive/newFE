<template>
  <my-container>
    <div id="app">
      <!-- <test  @getLogin="getLogin"></test> -->
      <div v-if="login">
        <div class="header">
          <Header />
        </div>
        <div class="background">
          <Background />
        </div>
        <!-- <div class="moneycard"><MoneyCard/></div>
      <div class="echarts"><Echarts/></div>
      <div class="piechart"><PieChart/></div>
        <div class="buttonPanel"><ButtonPanel/></div>-->
      </div>
      <div v-else>
        <div class="login">
          <!-- <Login @getLogin="getLogin" /> -->
          <Login/>
        </div>
      </div>
    </div>
  </my-container>
</template>

<script>
import Header from "./Header";
import Background from "./Background";
import Login from "./Login";
// import MoneyCard from './MoneyCard'
// import Echarts from './ECharts'
// import PieChart from './PieChart'
// import ButtonPanel from './ButtonPanel'
export default {
  name: "App",
  components: {
    Header,
    Background,
    Login
    // MoneyCard,
    // Echarts,
    // PieChart,
    // ButtonPanel
  },
  data() {
    return {
      token:null,
      login: true
    };
  },
  methods:{
    // getLogin(msg){//msg就是传过来的数据了  这只是个形参  名字可以随意
    //   this.login=msg;//然后将数据赋值给chindVal
    // }
  },
  created: function(){
    this.token = localStorage["token"];
    if(localStorage["token"] == null){
      this.login = false
      console.log("token 为空 重定向至login")
      this.$router.push({ path:'/login'})
      }
    else
      this.login = true
  },
  mounted: function () {
         //此方法刷新页面时也会执行
         window.addEventListener('beforeunload',()=>{
            localStorage.removeItem('token');
        });
    },
};
</script>

<style scoped>
.el-row {
  background-color: rgba(193, 193, 193, 0.2);
  height: 1400px;
}
body {
  margin: 0px;
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
</style>
