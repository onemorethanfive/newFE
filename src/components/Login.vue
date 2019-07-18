<template>
  <div class="login-container">
    <div class="back" >
      <!-- :style="{backgroundImage: 'url(' + bg2 + ')' }" -->
      <el-form
        :model="ruleForm2"
        :rules="rules2"
        ref="ruleForm2"
        label-position="left"
        label-width="0px"
        class="login-page"
      >
        <h3 class="title">系统登录</h3>
        <el-form-item prop="userId">
          <el-input type="text" v-model="ruleForm2.userId" auto-complete="off" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item prop="userPsw">
          <el-input
            type="password"
            v-model="ruleForm2.userPsw"
            auto-complete="off"
            placeholder="密码"
            show-password
          ></el-input>
        </el-form-item>
        <el-checkbox v-model="checked" class="rememberme">记住密码</el-checkbox>
        <el-form-item style="width:100%;">
          <el-button type="danger" style="width:100%;" @click="handleSubmit" :loading="login">登录</el-button>
        </el-form-item>
        <el-button>
        <router-link to="/signup">注册</router-link>
        </el-button>
      </el-form>
    </div>
    <img style="width:100% ;z-index:1000" :src="bg2"/>
    
    <img v-if="red" style="width:100% ;z-index:1000" :src="bg3"/>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      bg2:require('../assets/czbackground.jpg'),
      bg2:require('../assets/RedO1.jpg'),
      login: false,
      ruleForm2: {
        userId: "",
        userPsw: ""
      },
      red:document.body.clientWidth<768,
      rules2: {
        userId: [
          {
            required: true,
            message: "please enter your account",
            trigger: "blur"
          }
        ],
        userPsw: [
          { required: true, message: "enter your userPsw", trigger: "blur" }
        ]
      },
      checked: false
    };
  },
  methods: {
    handleSubmit(event) {
      var _self = this;
      this.$axios
        .post(_self.$root.urlport+"/user/signIn/", this.ruleForm2)
        .then(response => {
          var data = response.data;
          console.log(data);
          if(data.userId == null)
          {
            console.log("error");
            
          }
          else{
            localStorage["token"] = data.token
            console.log(localStorage["token"] );
            this.login = true
            this.$router.push({ path:'/'})
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
   watch:{
    'login':function(){
      this.$emit('getLogin',this.login);//主要是通过$emit方法来实现传参的方式，第一个参数是自定义事件名称，第二个则是要传的数据
    }
  }
};
</script>

<style scoped>
.title{
  color: white;
  font-size: 20px;
}
.login-container {
  width: 100%;
  height: 100%;
}
.rememberme{
  color:white
}
.login-page {
  -webkit-border-radius: 5px;
  border-radius: 10px;
  margin: 180px auto;
  width: 350px;
  padding: 35px 35px 15px;
  background: #61000073;
  border: 5px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
  z-index: 2000;
}
label.el-checkbox.rememberme {
  margin: 0px 0px 15px;
  text-align: left;
}
.back{
  position: fixed;
  width: 100%

}
</style>