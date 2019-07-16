<template>
  <div class="container">
    <div>
      <el-col :span="4" :offset="6">
        <el-button round class="pay-button" @click="addPayPanel('水费缴纳')">水 费</el-button>
      </el-col>
      <el-col :span="4">
        <el-button round class="pay-button" @click="addPayPanel('电费缴纳')">电 费</el-button>
      </el-col>
      <el-col :span="4">
        <el-button round class="pay-button" @click="addPayPanel('煤气费缴纳')">煤 气 费</el-button>
      </el-col>
    </div>
    <div>
      <el-col :span="4" :offset="6">
        <el-button round class="pay-button" @click="addPayPanel('有线电视费缴纳')">有线电视</el-button>
      </el-col>
      <el-col :span="4">
        <el-button round class="pay-button" @click="addPayPanel('话费缴纳')">网 费</el-button>
      </el-col>
      <el-col :span="4">
        <el-button round class="pay-button" @click="addBillPanel">缴费记录</el-button>
      </el-col>
    </div>
    <el-dialog title="缴费" :visible.sync="payDialog" width="35%" :modal="false" class="dialogPanel">
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
    <el-dialog
      title="缴费明细"
      :visible.sync="billdialog"
      width="80%"
      :modal="false"
      class="dialogPanel"
    >
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
import {EventBus} from "../../EventBus";
export default {
  name: "BottonPanel",
  // components: {
  //   EventBus
  // },
  data() {
    return {
      payDialog: false,
      billdialog: false,
      payNum: "50",
      payRemarks: "",
      userId: "1",
      projectTag: "easyPay",
      billData: [],
      site: "英冠水天城"
    };
  },
  methods: {
    addPayPanel(remark) {
      this.payDialog = true;
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
      var _self = this;
      var billRemarks = this.payRemarks + "-" + this.site;
      this.$axios
        .get("http://localhost:6060//bill/add", {
          params: {
            billNum: _self.payNum,
            billRemarks: billRemarks,
            cardId: 1
          }
        })
        .then(response => {
          var data = response.data;
          if (data == 1) {
            alert("缴费成功！");
            this.payDialog = false;
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
  mounted() {
    EventBus.$on("changeSite", site => {
      this.site = site;
    });
  },
  created: function() {}
};
</script>

<style scoped>
.pay-button {
  height: 8vw;
  width: 12vw;
  background-size: cover;
  color: white;
  background-color: #f8b6b6;
}
.el-dialog {
  z-index: 1200;
}
</style>