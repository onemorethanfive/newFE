<template>
  <div class="signup-container">
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-position="left"
      label-width="0px"
      class="signup-page"
    >
      <el-form-item prop="age">
        <el-input v-model.number="ruleForm.age" placeholder="用户名"></el-input>
      </el-form-item>
      <el-form-item prop="pass">
        <el-input type="password" v-model="ruleForm.pass" autocomplete="off" placeholder="密码"></el-input>
      </el-form-item>
      <el-form-item prop="checkPass">
        <el-input
          type="password"
          v-model="ruleForm.checkPass"
          autocomplete="off"
          placeholder="确认密码"
        ></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    var checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("用戶名不能为空"));
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        pass: "",
        checkPass: "",
        age: ""
      },
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        age: [{ validator: checkAge, trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      
        
          alert("submit!");
          var form = {
              userId:this.ruleForm.age,
              userPsw:this.ruleForm.pass,
              userName:this.ruleForm.age
          }

        console.log(form)
          var _self = this;
          this.$axios
            .post(_self.$root.urlport+"/user/signUp/", form)
            .then(response => {
              var data = response.data;
              console.log(data);
              if (data.success == false) {
                console.log("error");
              } else {
                localStorage.removeItem('token');
                this.$router.push({ path: "/" });
              }
            })
            .catch(error => {
              console.log(error);
            });
        
     
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>


// export default {
//   name: "Signup",
//   data() {
//     return {
//         ruleForm: {
//           pass: '',
//           checkPass: '',
//           age: ''
//         },
//         rules: {
//           pass: [
//             { validator: validatePass, trigger: 'blur' }
//           ],
//           checkPass: [
//             { validator: validatePass2, trigger: 'blur' }
//           ],
//           age: [
//             { validator: checkAge, trigger: 'blur' }
//           ]
//         }
//       };
//     },
//     var validatePass = (rule, value, callback) => {
//         if (value === '') {
//           callback(new Error('请输入密码'));
//         } else {
//           if (this.ruleForm.checkPass !== '') {
//             this.$refs.ruleForm.validateField('checkPass');
//           }
//           callback();
//         }
//       };
//       var validatePass2 = (rule, value, callback) => {
//         if (value === '') {
//           callback(new Error('请再次输入密码'));
//         } else if (value !== this.ruleForm.pass) {
//           callback(new Error('两次输入密码不一致!'));
//         } else {
//           callback();
//         }
//       };
//   },
//   methods: {
//     handleSubmit(event) {
//       var _self = this;
//       this.$axios
//         .post("http://localhost:6060/user/signUp/", this.ruleForm2)
//         .then(response => {
//           var data = response.data;
//           console.log(data);
//           if (data.userId == null) {
//             console.log("error");
//           } else {
//             localStorage["token"] = data.token;
//             console.log(localStorage["token"]);
//             this.login = true;
//             this.$router.push({ path: "/" });
//           }
//         })
//         .catch(error => {
//           console.log(error);
//         });
//     }
//   },
//   submitForm(formName) {
//         this.$refs[formName].validate((valid) => {
//           if (valid) {
//             alert('submit!');
//           } else {
//             console.log('error submit!!');
//             return false;
//           }
//         });
//       },
//       resetForm(formName) {
//         this.$refs[formName].resetFields();
//       }
//     }
// };


<style scoped>
.signup-container {
  width: 100%;
  height: 100%;
}
.signup-page {
  -webkit-border-radius: 5px;
  border-radius: 5px;
  margin: 180px auto;
  width: 350px;
  padding: 35px 35px 15px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}
label.el-checkbox.rememberme {
  margin: 0px 0px 15px;
  text-align: left;
}
</style>