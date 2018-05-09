<template>
  <div ref="vi-container" class="vi-container" :style="{'background-color':bgColor}" @mouseover="active" @mouseout="deactive">
    <div class="vi-relativeContainer">
        <div class="vi-absoluteContainer">
            <i :class="icon" class="vi-icon"></i>
            <span class="vi-text">{{text}}</span>
        </div>
    </div>
</div>
</template>

<script>
// 系统级按钮组件，其中为上部图片+下部文字的方式
// html结构部分，外部为总的container，要求从外部改变宽度、大小的时候，内部的结构不能变换
// 通过两个div，一个relative和一个absolute，来控制其上下和作用的居中
export default {
  name: "vaIconbutton",
  props: {
    icon: String,
    text: String,
    color: String,
    bgColor:String,
    activeColor:String,
  },
  // 通过mouseover和mouseenter的方式处理传入的props中的activeColor和bgColor的绑定
  methods: {
      active () {
          this.$refs['vi-container'].style.backgroundColor =  this.activeColor;
      },
      deactive () {
          this.$refs['vi-container'].style.backgroundColor =  this.bgColor;
      }
  }
};
</script>

<style scoped lang="scss">
    
    // 给定义一个默认的宽高
    .vi-container {
        height:60px;
        width:120px;
    }

    // 先套一个内层的relative父级
    .vi-relativeContainer {
        position:relative;
        height:100%;
    }

    // 再套一个内层的absolute父级
    // 让这个div内部字体水平居中，内部的块级元素水平和垂直方向同时居中
    .vi-absoluteContainer {
        width:100%;
        text-align:center;
        position:absolute;
        top:50%;
        left:50%;
        transform:translate(-50%,-50%);
    }

    // 修改为块元素
    .vi-icon {
        display:block;
        font-size:18px;
    }

    // 修改为块元素
    .vi-text {
        display:block;
        margin-top:2px;
        line-height:1;
    }
</style>
