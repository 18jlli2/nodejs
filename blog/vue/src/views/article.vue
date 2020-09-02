<template>
  <div>
    <Top :msg="username" ref="Top"/>
    <div class="main-content">
		<div class="text1">标题：
		  {{article.title}}
		</div>
      <div class="text">内容：
        {{article.article}}
      </div>
      <div class="about">
		  <div class="action">
		      <el-button @click="back" round>返回</el-button>
		  </div>
      </div>
    </div>
  </div>
</template>

<script>
import Top from '../components/Top'
import { getCookie } from '@/assets/js/cookie.js'
export default {
    name:'article',
    components:{
      Top,
    },
    data(){
        return{
            username:'',
            id:'',
            article:{},
        }
    },
    mounted(){
      
    },
    created(){
        this.title = this.$route.params.title;
        let username = getCookie('username');
        this.username = username;
        this.getThisArticle(this.title);
    },
    methods:{
		back:function(){
		    this.$router.push('/home')
		},
      getThisArticle:function(id){
        this.$axios({
          method:'get',
          url:'/api/getData/getThisArticle',
          params:{
            title:this.title,
          }
        }).then(res=>{
          this.article = res.data[0];
        })
      }
    },
}
</script>

<style >
	.main-content .about.action{
		color: white;
	    margin-top:10px;
	    display: flex;
	    flex-direction: row;
	    justify-content: center;
	}
  .main-content{
    width: 70%;
    padding-left:15%;
    padding-right:15%;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
  }
  .main-content .text{
    display: flex;
    background-color: white;
    width:70%;
  }  
  .main-content .text1{

    background-color: white;
    width:10%;
  }
  .main-content .about{
    display: flex;
    background-color: white;
    width:25%;
    height:200px
  }
</style>