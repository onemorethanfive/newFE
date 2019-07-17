<template>
  <div class="piggy">
    <div class="piggypic">
      <PiggyPic />
    </div>
    <el-card class="box-card1" style="border-radius: 20px;">
      <div slot="header" class="clearfix">
        <span style="color:#cf1322;font-weight:550;">小猪储蓄</span>
      </div>

      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="每日零钱">
          <el-input :disabled="edit" oninput = "value=value.replace(/[^\d]/g,'')" prefix-icon="el-icon-coin" maxlength="8" @input="countTarget" v-model="form.dailyMoney"></el-input>
        </el-form-item> 
        <el-form-item label="开始时间">
          <el-col :span="11">
            <el-date-picker :disabled="true" type="date" @input="countTarget" placeholder="选择日期" v-model="form.startDate" style="width: 150%;"></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="结束时间">
          <el-col :span="11">
            <el-date-picker :disabled="edit" type="date" @input="countTarget" placeholder="选择日期" v-model="form.endDate" style="width: 150%;"></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="预期金额">
          <el-input :disabled="edit" prefix-icon="el-icon-money" v-model="form.targetMoney"></el-input>
        </el-form-item>
        <el-form-item label="梦想红包">
          <el-input :disabled="edit" prefix-icon="el-icon-present" v-model="luckymoney"></el-input>
        </el-form-item>
        <el-form-item >
          <el-button :disabled="edit" type="danger" @click="open">保存</el-button>
        </el-form-item>
        
        
      </el-form>
    </el-card>

  </div>
</template>

<script>
import PiggyPic from './PiggyPic'
export default {
  name: "PiggyBag",
  data() {
    return {
      form: {},
      userId:'1',
      luckymoney:'',
      edit:false
    };
  },
  components:{
    PiggyPic
  },
  methods: {
    save(){
      var _self = this;
      var piggybag = _self.form;
      this.$axios
        .post(_self.$root.urlport+"/piggy/addBag", {
          params: {
            bag:_self.form
          }
        })
        .then(response => {
        })
        .catch(error => {
          console.log(error);
        });
    },
    countTarget(){
      if(this.form.startDate!=undefined&&this.form.endDate!=undefined&&this.form.dailyMoney!=undefined&&this.form.dailyMoney!=""&&this.form.startDate!=""&&this.form.endDate!=""){
        var date1 = this.form.startDate;
        var date2 = this.form.endDate;
        var date=Math.round((date2.getTime()-date1.getTime())/(1000*60*60*24));
        
        console.log(date);
        // var sds = this.form.startDate.replace(/-/g,"");
        // var eds = this.form.endDate.replace(/-/g,"");
        this.form.targetMoney=this.form.dailyMoney*date;
        this.form.targetMoney = this.form.targetMoney.toFixed(2);
        
        var pocketrate = 0.03/360;
        this.luckymoney = this.form.targetMoney*pocketrate*date;
        this.luckymoney = this.luckymoney.toFixed(2);
      }
    },
    getData(){
      var _self = this;
      this.$axios
        .get(_self.$root.urlport+"/piggy/getByUser", {
          params: {
            userId: this.userId
          }
        })
        .then(response => {
          var bills = response.data;
          if(bills!=""){
            _self.form = bills;
            _self.form.startDate = new Date(_self.form.startDate);
            _self.form.endDate = new Date(_self.form.endDate);
            _self.edit=true;
          }else{
            _self.form = {
              dailyMoney:"",
              startDate:new Date(),
              endDate:"",
              targetMoney:"",
              moneyPool:"0"
            }
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    open() {
        this.$confirm('您将购入小猪储蓄，此举将每日随机从您的绑定银行卡中取出金额并投入小猪储蓄，若中途停止则无法获得小猪红包噢', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.savePiggy();
          this.$message({
            type: 'error',
            message: '购买成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消购买'
          });          
        });
      },
    savePiggy(){
      var _self = this;
      var s1  = new Date(_self.form.startDate);
      var s=s1.toJSON();
      s=s.substring(0,10);
      _self.form.startDate = s;

      var ss1 = new Date(_self.form.endDate);
      var ss=ss1.toJSON();
      ss=ss.substring(0,10);
      _self.form.endDate = ss;
      var piggybag = _self.form;
      piggybag.userId = this.userId;
      this.$axios
        .get(_self.$root.urlport+"6060/piggy/addBag", {
          params: {
            dailyMoney:_self.form.dailyMoney,
            startDate:_self.form.startDate,
            endDate:_self.form.endDate,
            targetMoney:_self.form.targetMoney,
            moneyPool:_self.form.moneyPool,
            userId:_self.form.userId
          }
        })
        .then(response => {
          var bills = response.data;
          _self.form = bills;
          _self.getData();
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  mounted() {},
  created: function() {
    this.getData();
  }
};
</script>


<style scoped>
.box-card1{
  width: 70%;
  margin: 0 auto;
}
</style>