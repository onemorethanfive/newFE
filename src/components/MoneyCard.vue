<template>
  <div style="border-radius:10px;">
    <el-card class="box-card" style="background-color: rgba(255, 255, 255, 0.61);">
      <div slot="header" class="clearfix">
        <span style="font-weight: 550;">个人总资产</span>
      </div>
      <div class="text item">
        <img :src="imgurl" class = "cardimg" @click="onclick" />
                          
        <el-form class="curMon" style="float:right;" ref="currentMoney" :model="currentMoney" label-width="300">
          <div class="moneytt">当前资产：(元)</div>
          <el-form-item >
            <el-input size="large" class="showCurrentM" v-model="currentMoney.money" style="width:65%"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    
    <el-dialog
        title="银行卡包"
        :visible.sync="cardDialog"
        width="35%"
        :before-close="handleClose" >
      <span>
          <el-collapse v-model="activeNames" @change="handleChange">
          <el-collapse-item v-for="(card, index) in cards" :title="card.cardNumber" :key="index" :name="index">
            <el-divider></el-divider>
            <div>浙商银行 {{card.cardType}} </div>
            <div>银行卡余额： {{card.cardMoney}}</div>	
          </el-collapse-item>
        </el-collapse>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button type="danger" @click="closeCards">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'MoneyCard',
  data () {
    return {
      imgurl:require('../assets/cardbag.jpg'),
      currentMoney: {
				money: ''
      },
      cardDialog:false,
      activeNames: [''],
      cards:[],
      userId:'1'
    }
  },
	methods: {
    onclick: function(){
			this.cardDialog=true;	
			this.getCards();
    },
    getCards: function(){
			var _self = this;
      var userId = this.userId;
      this.$axios.get('http://localhost:6060/card/getCardByUser/'+userId,{
				params:{}
			}).then((response)=>{
        var data = response.data;
				for(var i = 0;i<data.length;i++){
				  data[i].cardNumber = data[i].cardNumber.replace(/(.{4})/g,'$1 ');
				}
        _self.cards=data;
        _self.activeNames[0]=data.length-1;
      }).catch((error)=>{
        console.log(error);
			});
    },
    getCurrentMoney: function(){
			var _self = this;
			var userId = this.userId;
      this.$axios.get('http://localhost:6060/card/getMoneyByUser/'+userId,{
				params:{}
			}).then((response)=>{
        var data = response.data;
				_self.currentMoney.money=_self.returnFloat(data);
      }).catch((error)=>{
        console.log(error);
			});
    },
    returnFloat: function (value) {
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
	    this.cardDialog=false;
		  this.activeNames=[];
		  this.activeNames[0]=this.cards.length-1;
    },
    handleChange(){

    },    
		closeCards(){
	    this.cardDialog=false;
		  this.activeNames=[];
		  this.activeNames[0]=this.cards.length-1;
		},
  },
  created: function(){
    this.getCurrentMoney();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
  .box-card {
		width: 110%;
    z-index: 3010;
	}

  .cardimg{
    margin-left: 5%;
		width:200px;
		height: 200px;
		float: left;
		margin-bottom: 20px;
	}
	.moneytt{
	  color: #cf13328c;
		font-size: 40px;
		float: left;
		margin-left: 10%;
		margin-top: 1%;
		font-weight: 550;
		font-family: "Open Sans", Arial, sans-serif;
	}
	.showCurrentM{
		background-color: #ffffff00;
		border-color: #ffffff00;
		font-size:40px;
		font-weight: 550;
    margin-top:1%;
	}
  .el-dialog{
    border-radius: 10px;
    
  }
  .el-dialog__header{
    background-color: gainsboro;
        border-top-right-radius: 10px;
    border-top-left-radius: 10px;
  }
	.el-dialog__body{
		background-color: #0000000f;
	}
	.el-dialog__footer{
		background-color: #0000000f;
	}
  .el-collapse{
    text-align: -webkit-center;
  }
	.el-collapse-item__header{
		background-color: #e26767;
		border-radius:  10px 10px 0px 0px;
		margin-top:-10px;
		height:65px;
		border: 5px solid #ffffff00;
		font-size: 20px;
		font-weight: 550;
		padding-left: 25px;
		color: white;
	}
	.el-collapse-item__wrap{
		background-color: #e26767;
		border-radius: 0px 0px 10px 10px;
		border: 5px solid #ffffff00;
		padding-left: 25px;
		padding-right: 25px;
	}
	.el-collapse-item{
		box-shadow: 2px -2px 4px #555;
	  border-radius: 10px;
    width: 85%;
	}
	.el-collapse-item__content {
		color:white;
		font-size:20px;
		font-weight: 550;
	}
	.el-divider--horizontal{
		margin:0px;
		margin-bottom:5px;
	}
  .el-input__inner{
    font-weight: inherit;
  }
  .curMon{
    width: 65%;
  }
</style>
