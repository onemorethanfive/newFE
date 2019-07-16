<template>
  <div style="border-radius:10px;">
    <el-card class="box-card" :style="cardStyle">
      <div slot="header" class="clearfix">
        <span style="font-weight: 550;">个人总资产</span>
      </div>
      <div class="text item">
        <img :src="imgurl" class="cardimg" @click="onclick" />

        <el-form
          class="curMon"
          style="float:right;"
          ref="currentMoney"
          :model="currentMoney"
          label-width="300"
        >
          <div class="moneytt">当前资产：(元)</div>
          <el-form-item>
            <el-input
              size="large"
              class="showCurrentM"
              v-model="currentMoney.money"
              style="width:80%"
            ></el-input>
          </el-form-item>
        </el-form>
        <el-button type="primary" plain  @click="addBillPanel">余额变动明细<i class="el-icon-upload el-icon--right"></i></el-button>
      </div>
    </el-card>

    <el-dialog title="银行卡包" :visible.sync="cardDialog" width="35%" :before-close="handleClose">
      <span>
        <el-collapse v-model="activeNames" @change="handleChange">
          <el-collapse-item
            v-for="(card, index) in cards"
            :title="card.cardNumber"
            :key="index"
            :name="index"
          >
            <el-divider></el-divider>
            <div>浙商银行 {{card.cardTypeName}}</div>
            <div>银行卡余额：(元) {{card.cardMoney}}</div>
          </el-collapse-item>
        </el-collapse>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button type="danger" @click="closeCards">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="余额变动明细" :visible.sync="billdialog" width="80%" :modal="false">
      <el-table
        :data="billData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
        height="350"
        style="width: 100%"
        :row-class-name="getTableClass"
      >
        <el-table-column prop="billDate" label="日期" width="180"></el-table-column>
        <el-table-column prop="billId" label="流水号" width="180"></el-table-column>
        <el-table-column prop="billNum" label="变动数额"></el-table-column>
        <el-table-column prop="billType" label="收支类型" width="50"></el-table-column>

        <el-table-column prop="billRemarks" label="备注"></el-table-column>
        <el-table-column fixed="right" label="分类" width="150">
          <template slot-scope="scope">
            <el-tag
              :type="getTagClass(scope.row.billEztag)"
              disable-transitions
            >{{getTagName(scope.row.billEztag)}}</el-tag>
            <el-button
              type="primary"
              icon="el-icon-edit"
              circle
              @click="addEditPanel(scope.row.billId)"
              size="mini"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="block" style="margin-top:15px;">
        <el-pagination
          align="center"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[5,10,20]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="billData.length"
        ></el-pagination>
      </div>
    </el-dialog>
    <el-dialog title="编辑消费标签" :visible.sync="editDialog" width="80%" :modal="false">
      <el-tag :type="getTagClass('clothes')" disable-transitions @click="changeTag('衣物')">衣物</el-tag>
      <el-tag :type="getTagClass('eat')" disable-transitions @click="changeTag('饮食')">饮食</el-tag>
      <el-tag :type="getTagClass('house')" disable-transitions @click="changeTag('住宿')">居住</el-tag>
      <el-tag :type="getTagClass('travel')" disable-transitions @click="changeTag('旅行')">出行</el-tag>
      <el-tag :type="getTagClass('amusement')" disable-transitions @click="changeTag('娱乐')">娱乐</el-tag>
      <el-tag :type="getTagClass('others')" disable-transitions @click="changeTag('其他')">其他</el-tag>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "MoneyCard",
  data() {
    return {
      imgurl: require("../../assets/cardbag.jpg"),
      currentMoney: {
        money: ""
      },
      cardDialog: false,
      billdialog: false,
      editDialog: false,
      activeNames: [""],
      cards: [],
      userId: "1",
      cardStyle: {},
      billData: [],
      curBillId: 0,
      currentPage: 1,
      pageSize: 10
    };
  },

  methods: {
    onclick: function() {
      if (document.body.clientWidth < 768) {
        this.cardStyle.width = "80%";
      }
      this.cardDialog = true;
      this.getCards();
    },
    addBillPanel() {
      this.getRecording();
      this.billdialog = true;
    },
    addEditPanel(billId) {
      this.curBillId = billId;
      this.editDialog = true;
    },
    changeTag(tag) {
      alert(this.curBillId);
      var _self = this;
      this.$axios
        .get("http://localhost:6060//billCardMap/updateTag", {
          params: {
            billId: this.curBillId,
            tag: tag
          }
        })
        .then(response => {
          var data = response.data;
          if (data == 1) {
            alert("修改成功！");
          } else {
            alet("修改失败，请稍后再试！");
          }
          this.editDialog = false;
        })
        .catch(error => {
          console.log(error);
        });
    },
    getTableClass({ row, rowIndex }) {
      if (row.billType == "1") {
        return "income-row";
      } else {
        return "outcome-row";
      }
    },
    getTagName(tag) {
      var classType = "";
      switch (tag) {
        case "CLOTHES": {
          classType = "衣物";
          break;
        }
        case "EAT": {
          classType = "饮食";
          break;
        }
        case "HOUSE": {
          classType = "居住";
          break;
        }
        case "TRAVEL": {
          classType = "出行";
          break;
        }
        case "AMUSEMENT": {
          classType = "娱乐";
          break;
        }
        default: {
          classType = "其他";
          break;
        }
      }
      return classType;
    },
    getTagClass(tag) {
      var classType = "";
      switch (tag) {
        case "CLOTHES": {
          classType = "";
          break;
        }
        case "EAT": {
          classType = "success";
          break;
        }
        case "HOUSE": {
          classType = "info";
          break;
        }
        case "TRAVEL": {
          classType = "danger";
          break;
        }
        case "AMUSEMENT": {
          classType = "warning";
          break;
        }
        default: {
          classType = "";
          break;
        }
      }
      return classType;
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.currentPage = 1;
      this.pageSize = val;
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
    },
    getRecording() {
      var _self = this;
      this.$axios
        .get("http://localhost:6060//bill/getBillsTagByUser", {
          params: {
            userId: this.userId
          }
        })
        .then(response => {
          var data = response.data;
          _self.billData = data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    getCards: function() {
      var _self = this;
      var userId = this.userId;
      this.$axios
        .get("http://localhost:6060/card/getCardByUser/" + userId, {
          params: {}
        })
        .then(response => {
          var data = response.data;
          for (var i = 0; i < data.length; i++) {
            data[i].cardNumber = data[i].cardNumber.replace(/(.{4})/g, "$1 ");
            var all = data[i].cardMoney;
            var back = all.substring(all.length - 2, all.length);
            all = all.substring(0, all.length - 2) + "." + back;
            data[i].cardMoney = all;
            if (data[i].cardType == "1") {
              data[i].cardTypeName = "储蓄金卡";
            } else if (data[i].cardType == "0") {
              data[i].cardTypeName = "储蓄红卡";
            }
          }
          _self.cards = data;
          _self.activeNames[0] = data.length - 1;
        })
        .catch(error => {
          console.log(error);
        });
    },
    getCurrentMoney: function() {
      var _self = this;
      var userId = this.userId;
      this.$axios
        .get("http://localhost:6060/card/getMoneyByUser/" + userId, {
          params: {}
        })
        .then(response => {
          var data = response.data;
          _self.currentMoney.money = _self.returnFloat(data);
        })
        .catch(error => {
          console.log(error);
        });
    },
    returnFloat: function(value) {
      var value = Math.round(parseFloat(value) * 100) / 100;
      var xsd = value.toString().split(".");
      if (xsd.length == 1) {
        value = value.toString() + ".00";
        return value;
      }
      if (xsd.length > 1) {
        if (xsd[1].length < 2) {
          value = value.toString() + "0";
        }
        return value;
      }
    },
    handleClose(done) {
      this.cardDialog = false;
      this.activeNames = [];
      this.activeNames[0] = this.cards.length - 1;
    },
    handleChange() {},
    closeCards() {
      this.cardDialog = false;
      this.activeNames = [];
      this.activeNames[0] = this.cards.length - 1;
    }
  },
  created: function() {
    this.getCurrentMoney();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
.box-card {
  width: 110%;
  z-index: 3010;
  background-color: rgba(255, 255, 255);
}

.cardimg {
  margin-left: 5%;
  width: 30%;
  height: 30%;
  float: left;
  margin-bottom: 20px;
}
.moneytt {
  color: #cf13328c;
  font-size: 2rem;
  float: left;
  margin-left: 10%;
  margin-top: 1%;
  font-weight: 550;
  font-family: "Open Sans", Arial, sans-serif;
}
.showCurrentM {
  background-color: #ffffff00;
  border-color: #ffffff00;
  font-size: 2.2rem;
  font-weight: 550;
  margin-top: 1%;
}
.el-dialog {
  border-radius: 10px;
}
.el-dialog__header {
  background-color: gainsboro;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
}
.el-dialog__body {
  background-color: #0000000f;
}
.el-dialog__footer {
  background-color: #0000000f;
}
.el-collapse {
  text-align: -webkit-center;
}
.el-collapse-item__header {
  background-color: #e26767;
  border-radius: 10px 10px 0px 0px;
  margin-top: -10px;
  height: 65px;
  border: 5px solid #ffffff00;
  font-size: 1.5rem;
  font-weight: 550;
  padding-left: 25px;
  color: white;
}
.el-collapse-item__wrap {
  background-color: #e26767;
  border-radius: 0px 0px 10px 10px;
  border: 5px solid #ffffff00;
  padding-left: 25px;
  padding-right: 25px;
}
.el-collapse-item {
  box-shadow: 2px -2px 4px #555;
  border-radius: 10px;
  width: 85%;
}
.el-collapse-item__content {
  color: white;
  font-size: 1.5rem;
  font-weight: 550;
}
.el-divider--horizontal {
  margin: 0px;
  margin-bottom: 5px;
}
.el-input__inner {
  font-weight: inherit;
}
.el-card__header {
  font-size: 2.5rem;
}
.curMon {
  width: 65%;
}
.v-modal {
  z-index: 1000 !important;
}
.el-table .income-row {
  background: rgb(252, 204, 204)
}

.el-table .outcome-row {
  background: #d0ffd0;
}
</style>
