<template>
  <div id="billTab">
    <div class="background">
      <Background />
    </div>
    <div class="moneycard">
      <MoneyCard />
    </div>
    <div class="echarts" :v-show="show">
      <Echarts />
    </div>
    <div class="piechart">
      <PieChart />
    </div>
    <!-- <div class="billsTable">
      <BillsTable /> -->
    <!-- </div> -->
  </div>
</template>
    
<script>
import MoneyCard from "./MoneyCard";
import Echarts from "./ECharts";
import PieChart from "./PieChart";
import Background from "./Background";
// import BillsTable from "./BillsTable";
export default {
  name: "BillTab",
  components: {
    MoneyCard,
    Echarts,
    PieChart,
    Background
    // BillsTable
  },
  data(){
    return{
      show:this.$root.visible,
    }
  }
};
</script>
    
<style>
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
.piechart {
  position: relative;
  z-index: 1000;
  text-align: -webkit-center;
  top: 300px;
  left: 0;
  right: 0;
  margin: 0 auto;
  height: 400px;
}
</style>
    