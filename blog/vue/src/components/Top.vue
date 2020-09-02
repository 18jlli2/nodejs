<template>
  <div>
  <div id="Top">
	 
    <div  >
      <div class="info">
		  <span>{{msg}}  
          </span>
	  </div>
    </div>
    <div class="top-right">
		<div @click="refresh" >
		 <el-button  round >主页</el-button>
		</div>
        <div class="write" @click="write">
            <el-button  round >发布文章</el-button>
        </div>
        <el-button  @click="quit" round>退出</el-button>
    </div>
  </div>
  <div style="height:80px"></div> 
  </div>
</template>

<script>
import { delCookie } from '@/assets/js/cookie.js'
export default {
  name: 'Top',
  props: ['msg'],
  data(){
      return {
      }
  },
  methods:{
      refresh:function(){
          this.$router.push('/home')
      },
      write:function(){
          this.$router.push('/write')
      },
      quit:function(){
          delCookie('username')
          this.$router.push('/login')
      }
  }
}
</script>
<style scoped> 
  #Top{
    width:70%;
    background-color: lightgray;
    height: 40px;
    display: flex;
    position: fixed;
    top:0;
    padding-left: 15%;
    padding-right: 15%;
    flex-wrap: nowrap;
    padding-top: 10px;
    padding-bottom: 10px;
    box-shadow: 0 0 10px #888888;
    flex-direction: row;
	 border-radius: 18px;
    justify-content: space-between;
  }
.head img{
    position: absolute;
    height:100px;
    width:100px;
    border-radius: 50%;
    border: 2px white solid;
    left:29%;
    top:15%;
  }
  .info{
      height: 100%;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      justify-content: center;
      border: 1px rgb(255, 255, 255) solid;
      border-radius: 20px;
      padding-left: 15px;
      padding-right: 15px;
	  margin-right: 10px

  }
  .info:hover{
      box-shadow: 0 0 5px #888888;
      transition: all 0.2s;
  }
  .info span{
      font-size: 16px;
      font-family: Arial, Helvetica, sans-serif;
  }
  .top-right{
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
	
  }
  .write{
      margin-right: 10px;
  }
</style>