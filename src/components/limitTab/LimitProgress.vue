<template>
  <div class="limitProgress">
    <el-row type="flex" justify="center">
      <el-col :span="6">
        <el-row class="moneytt" style="text-align:">开始日期:</el-row>
        <el-row class="moneytt" style="text-align:">{{startDate}}</el-row>
      </el-col>
    </el-row>
    <el-progress
      :text-inside="true"
      :stroke-width="50"
      :percentage="dateProcess"
      :status="getProcessStatus(dateProcess)"
    ></el-progress>

    <el-row type="flex" justify="center">
      <el-col :xs="{span:10,offset:0,font:6}" :sm="{span:8,offset:4}" :md="{span:6,offset:6}">
        <div class="moneytt">总限额:</div>
        <div class="moneytt">{{restTotal}}/{{limitTotal}}</div>
        <el-progress
          type="circle"
          :percentage="totalProcess"
          :width="150"
          :show-text="true"
          :status="getProcessStatus(totalProcess)"
        ></el-progress>
      </el-col>
      <el-col :xs="{span:10,offset:0}" :sm="{span:8,offset:4}" :md="{span:6,offset:6}">
        <div class="moneytt">今日限额:</div>
        <div class="moneytt">{{restToday}}/{{limitToday}}</div>
        <el-progress
          type="circle"
          :percentage="todayProcess"
          :width="150"
          :show-text="true"
          :status="getProcessStatus(todayProcess)"
        ></el-progress>
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
      userId: 1,
      dateProcess: 0,
      totalProcess: 0,
      todayProcess: 0,
      today: "20190718",
      limitToday: "",
      limitTotal: "",
      pastDays: "",
      restToday: "",
      restTotal: "",
      startDate: "",
      totalDay: ""
    };
  },
  methods: {
    getProcessStatus(percentage) {
      console.log("percentage"+percentage)
      if (percentage < 25) {
        return "success";
      } else if (percentage < 50) {
        return "";
      } else if (percentage < 75) {
        return "warning";
      } else {
        return "exception";
      }
    },
    getData() {
      var _self = this;
      this.$axios
        .get(_self.$root.urlport+"/userSpend/updateUserSpend", {
          params: {
            userId: this.userId,
            today: this.today
          }
        })
        .then(response => {
          var bills = response.data;
          var data = response.data;
          _self.billData = data;
          _self.limitToday = data.limitToday.slice(0, 5);
          _self.limitTotal = data.limitTotal;
          _self.pastDays = data.pastDays;
          _self.restToday = data.restToday.slice(0, 5);
          _self.restTotal = data.restTotal;
          _self.startDate = data.startDate;
          _self.dateProcess = Math.round(data.pastDays/data.totalDay*100);
          _self.totalProcess = 100-Math.round(data.restTotal / data.limitTotal * 100);
          _self.todayProcess = 100-Math.round(data.restToday / data.limitToday * 100);
          console.log(data);
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
.moneytt {
  text-align: center;
}
.el-row {
  background-color: transparent;
}
.div {
  font-size: 1rem;
}
</style>