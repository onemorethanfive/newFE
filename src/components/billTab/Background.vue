<template>
  <div id="background">
    <img style="width:100% ;" :src="imgurl"/>
  </div>
</template>
    
<script>
// import BillsTable from "./BillsTable";
export default {
  name: "Background",
  components: {
    // BillsTable
  },
  data(){
    return{
      imgurl:require("../../assets/chooseus3.jpg")
      
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
    