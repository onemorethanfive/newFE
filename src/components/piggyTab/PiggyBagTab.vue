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
          <el-input @input="countTarget" v-model="form.dailyMoney"></el-input>
        </el-form-item> 
        <el-form-item label="开始时间">
          <el-col :span="11">
            <el-date-picker type="date" @input="countTarget" placeholder="选择日期" v-model="form.startDate" style="width: 150%;"></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="结束时间">
          <el-col :span="11">
            <el-date-picker type="date" @input="countTarget" placeholder="选择日期" v-model="form.endDate" style="width: 150%;"></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="预计金额">
          <el-input v-model="form.targetMoney"></el-input>
        </el-form-item>
        <el-form-item label="已存金额">
          <el-input :disabled="true" v-model="form.moneyPool"></el-input>
        </el-form-item>
        <el-form-item >
          <el-button type="danger" @click="savePiggy">保存</el-button>
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
      userId:'1'
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
        .post("http://localhost:6060/piggy/addBag", {
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
        var date=(date2.getTime()-date1.getTime())/(1000*60*60*24);
        console.log(date);
        // var sds = this.form.startDate.replace(/-/g,"");
        // var eds = this.form.endDate.replace(/-/g,"");
        this.form.targetMoney=this.form.dailyMoney*date;
      }
    },
    getData(){
      var _self = this;
      this.$axios
        .get("http://localhost:6060/piggy/getByUser", {
          params: {
            userId: this.userId
          }
        })
        .then(response => {
          var bills = response.data;
          if(bills!=""){
            _self.form = bills;
          }else{
            _self.form = {
              dailyMoney:"",
              startDate:"",
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
    savePiggy(){
      var _self = this;
      var s=_self.form.startDate.toJSON();
      s=s.substring(0,10);
      _self.form.startDate = s;
      var ss=_self.form.endDate.toJSON();
      ss=ss.substring(0,10);
      _self.form.endDate = ss;
      var piggybag = _self.form;
      piggybag.userId = this.userId;
      this.$axios
        .get("http://localhost:6060/piggy/addBag", {
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
  width: 50%;
  margin: 0 auto;
}
</style>