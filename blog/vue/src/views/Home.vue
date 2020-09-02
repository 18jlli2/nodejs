<template>
  <div id="Home">
    <Top :msg="username"  ref="Top"/>
      <div class="articles">
        <div v-bind:key="item" v-for="item of article_data" class="article" @click="goToArticle(item.title)">
          <div id="item_title">{{item.title}}</div>
          <div id="item_article">{{item.article}}</div>
        </div>
      </div>
  </div>
</template>
<script>	
import Top from '../components/Top'
import { getCookie } from '@/assets/js/cookie.js'
import '../assets/css/Personal profile icon/iconfont.css'

export default {
  name: 'Home',
  components:{
    Top,
  },
  data(){
    return{
      username: '',
      article_data:[],
    }
    
  },

  created(){//此时加载数据，dom未进行渲染
    let username = getCookie('username');
    this.username = username;
    this.getAllArticles();
  },
  methods:{
    getAllArticles:function(){
      this.$axios({
        method:'get',
        url:'/api/getData/getAllArticle'
      }).then(res=>{
        this.article_data = res.data;
      })
    },
    goToArticle:function(title){
      this.$router.push(`/post/${title}`);
    }
  }
}
</script>

<style scoped>
  html,body,#Home{
    height:100%
  }
  .main-content{
    width:70%;
    padding-left:15%;
    padding-right:15%;
    display: flex;
    flex-wrap: nowrap;
    flex-direction: row;
    justify-content: space-between;
  }
  .info{
    height:400px;
    width:30%;
    background-color: white;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: space-around;
  }

  .articles{
    width:65%;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
  }
  .articles .article{
    cursor: pointer;
    background-color: white;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    height: 85.3px;
    margin-bottom: 10px;
    justify-content: space-around;
    padding: 30px;
  }
  .articles .article #item_title{
    font-family: PingFang SC,Hiragino Sans GB,Arial,Microsoft YaHei,Verdana,Roboto,Noto,Helvetica Neue,sans-serif !important;
    font-size:18px;
    font-weight: bold;
  }


  
</style>
