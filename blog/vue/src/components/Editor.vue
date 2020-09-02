
<template>
  <div class="content-body">
    <div class="toolbar">
      <button @click="Bold" id="Bold" >B</button>
      <button @click="Italic" id="Italic" >/</button>
      <button @click="Underline" id="Underline">U</button>
      <button @click="Superscript" id="Superscript" >x²</button>
      <button @click="Subscript" id="Subscript" >x₂</button>
	  
      <div class="splitline"></div>
	  
      <button @click="InsertHorizontalRule" >L</button>
      <button @click="InsertOrderedList" >
        <i class="iconfont icon-youxuliebiao"></i>
      </button>
      <button @click="InsertUnorderedList" >
        <i class="iconfont icon-wuxuliebiao"></i>
      </button>
	  
      <div class="splitline"></div>
	  
      <button @click="JustifyLeft" title="左对齐">
        <i class="iconfont icon-zuoduiqi"></i>
      </button>
      <button @click="JustifyCenter" title="居中">
        <i class="iconfont icon-icon--"></i>
      </button>
      <button @click="JustifyRight" title="右对齐">
        <i class="iconfont icon-youduiqi"></i>
      </button>
      <button @click="JustifyFull" title="两端对齐">
        <i class="iconfont icon-liangduanduiqimohangjuzhongduiqi"></i>
      </button>
	  
 
	 
    </div>
	
    <div class="getTitle">
      <input v-model="title" placeholder="输入标题"  id="getTitle" @focus="handleTitle" @blur="unhandleTitle" autocomplete="off">
    </div>
    <div contenteditable="true" id="writearea" class="writearea" @focus="writing" @blur="unwriting">
      {{defaulttext}}
    </div>
  </div>
</template>
<script>
import '../assets/css/Align icons/iconfont.css'
import '../assets/css/List Icon/iconfont.css'
import '../assets/css/Image icons/iconfont.css'
import '../assets/css/Clear format icon/iconfont.css'
import { read } from 'fs'
 export default {
    name: "Editor",
    data() {
      return {
        defaulttext:'输入内容',
        title:'',
        tools:{
          Bold:false,
          Italic:false,
          Underline:false,
          Superscript:false,
          Subscript:false,
          BackColor:false,
          Typeface:'Type',
          FormatBlock:'Head',
          FontSize:'Size',
        }   
      };
    },
    mounted(){
      this.writearea = document.getElementById('writearea');
      this.writearea.addEventListener('click',this.handleClick);
      let dom = document.getElementById('writearea');
      dom.style.color="#b3b3b1";
    },
    methods:{
      handleTitle:function(){
        let dom = document.getElementById('getTitle');
        dom.placeholder = '';
      },
      unhandleTitle:function(){
        let dom = document.getElementById('getTitle');
        dom.placeholder = '输入标题...';
      },
      handleMouseup() {
          this.setCursor('');
          // 拖拽结束移除事件监听
          document.removeEventListener('mousemove', this.handleDrag);
          document.removeEventListener('mouseup', this.handleMouseup);
      },
      setCursor(value) {// 设置鼠标样式
        [document.body, this.nowImg].forEach(el => {
            el.style.cursor = value;
        });
      },
      clickEle:function(id){
        let dom = document.getElementById(id);
        dom.click();
      },
      unwriting:function(){//当编辑器失去焦点
        let dom = document.getElementById('writearea');
        let text = dom.innerHTML;
        if(!text){
          dom.innerHTML = this.defaulttext;
          dom.style.color = '#b3b3b1';
        }
      },
      writing:function(e){//当编辑器获得焦点
        let dom = document.getElementById('writearea');
        let text = dom.innerHTML;
        let temp = ' '+this.defaulttext+' ';
        if(text === temp || text === this.defaulttext){
          dom.innerHTML = '';
        }
        dom.style.color= '';

      },
      Bold:function(){//字体加粗
        document.execCommand('bold',false,null);
        let dom = document.getElementById('Bold');
        if(!this.tools.Bold){
          dom.style ="color:rgb(0, 0, 0);font-weight:bold";
        }else{
          dom.style ="color:normal;font-weight:normal";
        }
        this.tools.Bold = !this.tools.Bold
      },
      Italic:function(){//斜体
        document.execCommand('italic',false,null);
        let dom = document.getElementById('Italic');
        if(!this.tools.Italic){
          dom.style ="font-style:italic;color:rgb(64,158,255);font-weight:bold";
        }else{
          dom.style ="font-style:normal;color:normal;font-weight:normal";
        }
        this.tools.Italic = !this.tools.Italic
      },
      Underline:function(){//下划线
        document.execCommand('underline',false,null);
        let dom = document.getElementById('Underline');
        if(!this.tools.Underline){
          dom.style ="text-decoration:underline;color:rgb(64,158,255);font-weight:bold";
        }else{
          dom.style ="text-decoration:none;color:normal;font-weight:normal";
        }
        this.tools.Underline = !this.tools.Underline
      },
      Superscript:function(){//上角标
        document.execCommand('superscript',false,null);
        let dom = document.getElementById('Superscript');
        if(!this.tools.Superscript){
          dom.style ="color:rgb(64,158,255);font-weight:bold;";
        }else{
          dom.style ="color:normal;font-weight:normal;";
        }
        this.tools.Superscript = !this.tools.Superscript
      },
      Subscript:function(){//下角标
        document.execCommand('subscript',false,null);
        let dom = document.getElementById('Subscript');
        if(!this.tools.Subscript){
          dom.style ="color:rgb(64,158,255);font-weight:bold;";
        }else{
          dom.style ="color:normal;font-weight:normal;";
        }
        this.tools.Subscript = !this.tools.Subscript
      },
      BackColor:function(){//高亮
        let dom = document.getElementById('BackColor');
        if(!this.tools.BackColor){
          document.execCommand('backColor',false,'rgb(255,255,0)');
          dom.style ="color:rgb(64,158,255);font-weight:bold;";
        }else{
          document.execCommand('backColor',false,'rgb(255,255,255)'); 
          dom.style ="color:normal;font-weight:normal;";
        }
        this.tools.BackColor = !this.tools.BackColor
      },

      FormatBlock:function(){//标题
          document.execCommand('formatBlock',false,this.tools.FormatBlock)
      },
      FontSize:function(){//字号
          document.execCommand('fontSize',false,this.tools.FontSize)
      },
      InsertHorizontalRule:function(){//水平线
        document.execCommand('insertHorizontalRule',false,null);
      },
      InsertOrderedList:function(){//有序列表
        document.execCommand('insertOrderedList',false,null);
      },
      InsertUnorderedList:function(){//无序列表
        document.execCommand('insertUnorderedList',false,null);
      },
      JustifyLeft:function(){//左对齐
        document.execCommand('justifyLeft',false,null);
      },
      JustifyCenter:function(){//居中
        document.execCommand('justifyCenter',false,null);
      },
      JustifyRight:function(){//右对齐
        document.execCommand('justifyRight',false,null);
      },
      JustifyFull:function(){//两端对齐
        document.execCommand('justifyFull',false,null);
      },
    },  
}
</script>
 
<style scoped>

  .content-body{
	background-color: ghostwhite;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-items: center;
	font: 20px;
  }
  .content-body .toolbar{
    width:100%;
    margin-bottom: 10px;
    /* display: flex;
    flex-wrap: wrap;
    flex-direction: row; */
  }
  .content-body .toolbar .splitline{
    display: inline;
    border:none;
    border-right: 0.5px rgb(0, 0, 0) solid;
    margin-left:1px;
    margin-right:1px;
  }
  .content-body .toolbar button{
    outline: none;
    background-color: white;
    border: none;
    padding:7px;
    font-family: Arial, Helvetica, sans-serif;
  }
  .content-body .toolbar button:hover{
    background-color: rgb(236, 245, 255);
  }
  .content-body .toolbar select{
    padding-bottom: 1px;
    outline: none;
    border: 0.5px rgb(0, 0, 0) solid;
    width:60px;
    margin-left:2px;
  }
  .content-body .toolbar select:hover{
    border-color: rgb(0, 0, 0);
  }
  .content-body .toolbar select:focus{
    border-color: rgb(0, 0, 0);
  }
  .content-body .getTitle input{
    border: none;
    outline: none;
    margin-bottom: 1px;
    font-size:24px;
    text-align: center;
  }
  .content-body .writearea{
    text-align: left;
    padding-left: 20px;
    padding-top: 1px;
    padding-right: 2px;
    border: 2px rgb(0, 0, 0) solid;
    height:300px;
    width:70%;
    overflow-y: auto;
    outline: none;/* 取消选中时的默认黑色边框 */
  }
  .content-body .writearea:hover{
    border-color: rgb(0, 0, 0);
  }
  .content-body .writearea:focus{
    border-color: rgb(0, 0, 0);
  }
</style>