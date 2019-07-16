<template>
  <div class="container">
    <el-row>
      <el-col :span="4" :offset="6">
        <el-button round class="pay-button" @click="addPayPanel('水费缴纳')">水 费</el-button>
      </el-col>
      <el-col :span="4">
        <el-button round class="pay-button" @click="addPayPanel('电费缴纳')">电 费</el-button>
      </el-col>
      <el-col :span="4">
        <el-button round class="pay-button" @click="addPayPanel('煤气费缴纳')">煤 气 费</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="4" :offset="6">
        <el-button round class="pay-button" @click="addPayPanel('有线电视费缴纳')">有线电视</el-button>
      </el-col>
      <el-col :span="4">
        <el-button round class="pay-button" @click="addPayPanel('话费缴纳')">话 费</el-button>
      </el-col>
      <el-col :span="4">
        <el-button round class="pay-button" @click="addBillPanel">缴费记录</el-button>
      </el-col>
    </el-row>
    <el-dialog title="缴费" :visible.sync="payDialog" width="35%" :modal="false">
      <span></span>
      <div>
        <el-radio-group v-model="payNum">
          <el-radio-button label="50"></el-radio-button>
          <el-radio-button label="100"></el-radio-button>
          <el-radio-button label="200"></el-radio-button>
          <el-radio-button label="500"></el-radio-button>
        </el-radio-group>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="pay">确定</el-button>
        <el-button type="danger" @click="payDialog=false">取消</el-button>
      </span>
    </el-dialog>
    <el-dialog title="缴费明细" :visible.sync="billdialog" width="80%" :modal="false">
      <el-table :data="billData" :stripe="true" height="350" style="width: 100%">
        <el-table-column prop="billDate" label="日期" width="180"></el-table-column>
        <el-table-column prop="billId" label="流水号" width="180"></el-table-column>
        <el-table-column prop="billNum" label="充值数额"></el-table-column>
        <el-table-column prop="billRemarks" label="备注"></el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "BottonPanel",
  data() {
    return {
      payDialog: false,
      billdialog: false,
      payNum: "50",
      payRemarks: "",
      userId: "1",
      projectTag: "easyPay",
      billData: []
    };
  },
  methods: {
    addPayPanel(remark) {
      this.payDialog = true;
      console.log("1.data is");
      console.log(this.billData);
      this.payRemarks = remark;
    },
    addBillPanel() {
      this.getRecording();
      this.billdialog = true;
    },
    closePayPanel() {
      this.payDialog = false;
    },
    pay() {
      console.log(this.payNum);
      var _self = this;
      this.$axios
        .get("http://localhost:6060//bill/add", {
          params: {
            billNum: _self.payNum,
            billRemarks: _self.payRemarks,
            cardId: 1
          }
        })
        .then(response => {
          var data = response.data;
          // console.log(data);
          if (data == 1) {
            alert("缴费成功！");
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    getRecording() {
      var _self = this;
      this.$axios
        .get("http://localhost:6060//bill/getBillsByUserAndTag", {
          params: {
            userId: this.userId,
            tag: this.projectTag
          }
        })
        .then(response => {
          var bills = response.data;
          var data = response.data;
          _self.billData = data;
          // console.log(data);
          // console.log(bills[0]);
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  mounted() {},
  created: function() {}
};
</script>

<style scoped>
.pay-button {
  height: 100%;
  background-size: cover;
  font-size: 0.8rem;
  color: white;
  background-color: #cf1322;
}
</style>