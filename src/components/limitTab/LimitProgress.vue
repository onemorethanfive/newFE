<template>
  <div class="limitProgress">
    <el-row type="flex" justify="center">
      <el-col :span="4">
        <div class="moneytt" style="text-align:">日期进度:</div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="5" align="center">
        <div class="moneytt"></div>
      </el-col>
    </el-row>
    <el-progress :text-inside="true" :stroke-width="50" :percentage="50" status="exception"></el-progress>

    <el-row type="flex" justify="center">
      <el-col :span="4">
        <div class="moneytt" style="text-align:">总限额:</div>
        <el-progress type="circle" :percentage="0" :width="150" :show-text="true"></el-progress>
      </el-col>
        <el-col :span="4">
        <div class="moneytt" style="text-align:">今日限额:</div>
         <el-progress type="circle" :percentage="100" :width="150" :show-text="true" status="exception"></el-progress>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="5" align="center">
        <div class="moneytt"></div>
      </el-col>
    </el-row>
    
   
  </div>
</template>

<script>
export default {
  name: "LimitProgress",
  data() {
    return {
        userId:1,
        dateProcess:"",
        totalProcess: "",
        todayProcess: ""

    };
  },
  methods: {
    getData() {
      var _self = this;
      this.$axios
        .get("http://localhost:6060/userSpend/updateUserSpend", {
          params: {
            userId: this.userId
          }
        })
        .then(response => {
          var bills = response.data;
          var data = response.data;
          _self.billData = data;
          console.log(data);
          // console.log(bills[0]);
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  mounted() {
    this.getData();
    
  },
  created: function() {}
};
</script>


<style scoped>
.box-card1 {
  width: 50%;
  margin: 0 auto;
}
</style>