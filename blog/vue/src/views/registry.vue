<template>
    <div class="mainbox1" >
    <h2>注册</h2>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
        <el-form-item label="用户名" prop="username">
            <el-input v-model="ruleForm.username" ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass" >
            <el-input  type="password" v-model="ruleForm.pass" autocomplete="off" show-password></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
            <el-input  type="password" v-model="ruleForm.checkPass" autocomplete="off" show-password></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')" >立即注册</el-button>
            <el-button @click="resetForm('ruleForm')">重新输入</el-button>
            <el-button @click="returnToLogin()">返回</el-button>
        </el-form-item>
    </el-form>
    </div>
</template>

<script>
import axios from 'axios'
  export default {
    data() {
		//校验账号密码格式
        var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else if(value.length<6||value.length>16){
            callback(new Error('输入仅包含字母数字的密码'))
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
        };
        var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('再次输入密码'));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
        };
      return {
        ruleForm: {
          username: '',
          pass:'',
          checkPass:'',
        },
        rules: {
            username: [
                { required: true, message: '输入用户名', trigger: 'blur' },
                { min: 3, max: 10, message: '3-10', trigger: 'blur' }
            ],
            pass:[
                {required: true, validator: validatePass, trigger: 'blur'},
            ],
            checkPass:[
                {required: true, validator: validatePass2, trigger: 'blur'},
            ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log(this.ruleForm)
            axios({
                method:'post',
                url:'http://127.0.0.1:7001/commit',
                data:{
                    username:this.ruleForm.username,
                    password:this.ruleForm.pass,
                }
            }).then(res=>{
              console.log(res.data)
              if(res.data.code == 1)
              {
                this.$router.push('/login');
                alert(res.data.message)
              }
              else if(res.data.code == -1){
                  this.ruleForm.username = ''
                  alert(res.data.message)
              }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      returnToLogin(){
        this.$router.push('/login')
      }
    }
  }
</script>

<style>
.mainbox1{
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>