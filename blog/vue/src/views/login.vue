<template>
    <div  class='mainbox' :style="bg">
        <h2>登陆</h2>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px">
            <el-form-item label="" prop="username">
                <el-input v-model="ruleForm.username" placeholder="输入账号"></el-input>
            </el-form-item>
            <el-form-item label="" prop="password" >
                <el-input  type="password" v-model="ruleForm.password" placeholder="输入密码" autocomplete="off" show-password></el-input>
            </el-form-item>
            <el-form-item>
                <el-button class="login_bt" type="primary" @click="login('ruleForm')" >登录</el-button>
                <el-button  @click="goRegistry()" >注册</el-button>
            </el-form-item>
        </el-form>
		
    </div>
</template>

<script>
import {setCookie,getCookie} from '@/assets/js/cookie.js'
export default {
    data(){
        return{
            ruleForm:{
                username:'',
                password:''
            },
        }
    },
    mounted(){
        /*页面挂载获取cookie，如果存在username的cookie，则跳转到主页，不需登录*/
        if(getCookie('username')){
            this.$router.push('/home')
        }
    },
    methods:{
        login(formName){
            
            this.$refs[formName].validate((valid) => {
            if (valid) {
                this.$axios({
                    method:'post',
                    url:'/api/login',
                    data:{
                        username:this.ruleForm.username,
                        password:this.ruleForm.password
                    }
                })
                .then(res=>{
                    console.log(res)
                    if(res.data.code == 1)
                    {
                        //登陆成功
                        setCookie('username',this.ruleForm.username,1000*60)
                        setTimeout(function(){
                            this.$router.push('/home')
                        }.bind(this),1000)
                        alert(res.data.message);
                    }
                    else 
                    {
                        //登陆失败
                        this.ruleForm.password = '';
                        this.$message({
                            message:res.data.message,
                            type:'error',
                            showClose:true,
                        })
                        // alert(res.data.message);
                    }
                })
            }else {
                console.log('error submit!!');
                return false;
          }
        })
        },
        goRegistry(){
            this.$router.push('/registry')
        }
    }
}
</script>>

<style >
.mainbox{
    display: flex;
    flex-direction: column;
    align-items: center;
}
.el-form-item{
  text-align: center;
}

</style>