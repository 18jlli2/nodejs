<template>
    <div class="write">
        <Top :msg="username"  ref="Top"/>
        <el-card class="content">
            <Editor ref="Editor"></Editor>
            <div class="action">
                <el-button @click="publish"  round>发布</el-button>
                <el-button @click="back" round>返回</el-button>
            </div>
        </el-card>
    </div>
</template>

<script>
import axios from 'axios'
import { getCookie } from '@/assets/js/cookie.js'
import Editor from '../components/Editor'
import Top from '../components/Top'
export default {
    name: 'Write',
    components:{
        Editor,
        Top,
    },
    data() {
        return {
            username: '',
        }
    },
    //生命周期 - 访问当前this实例
    created() {

    },
    //生命周期 -访问DOM元素
    mounted() {
        /*页面挂载获取保存的cookie值，渲染到页面上*/
      let username = getCookie('username')
      this.username = username
    },
    methods:{
        back:function(){
            this.$router.push('/home')
        },
        publish:function(){//发布文章
            let dom = this.$refs.Editor.$el.childNodes[2];//获取内容节点
            let article = dom.innerHTML;//article
            let title = this.$refs.Editor.title;//title
            let username = this.username;//username
          
            let data = {
                username:username,
                title:title,
                article:article,
                
            };
            let flag = title;
            if(flag){//当内容校验无误后进行
                axios({
                    method:'post',
                    url:'http://127.0.0.1:7001/publish',
                    
                }).then(res=>{
                    let code = res.data.code;
                    let msg = res.data.msg;
                    if(code === 1){
                        this.$message({
                            type:'success',
                            showClose:true,
                            onClose:()=>{
                                this.$router.push('/home')
                            }
                        })
                    }
                    
                })
            }else{//内容有误
                this.$message({
                    message:'请输入文章标题',
                    type:'warning',
                    showClose:true,
                })
            }
        },

    }
}
</script>
<style>
    .content{
        width:70%;
        height: 450px;
        padding:5px 5px;
        margin-left: 15%;
        margin-right: 15%;
        
    }
    .action{
		color: white;
        margin-top:10px;
        display: flex;
        flex-direction: row;
        justify-content: center;
    }
</style>