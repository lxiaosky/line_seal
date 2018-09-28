<template>
    <div class='main'>
        <div class='text'>
            <input type="text" v-model='company' placeholder='输入单位名称'>
            <input type="text" v-model='name' placeholder='输入印章名称'>
            <button @click='redraw'>确定</button>
            <button @click='addBorder'>{{border?"移除边框":"加边框"}}</button>
        </div>
        <canvas id="cachet" width="180" height="180"></canvas>
    </div>
</template>
<script>

import Cachet from '../script/cachet'

export default {
  data () {
    return {
      stamp: null,
      company: '某某某XXX有限公司',
      name: '测试专用章',
      border: false
    }
  },
  mounted () {
    // 初始化印章类
    this.stamp = new Cachet({
      id: 'cachet',
      name: this.name,
      company: this.company
    })
    // 绘制印章
    this.stamp.startDrawing()
  },
  methods: {
    redraw () {
      this.stamp.redraw({
        name: this.name,
        company: this.company
      })
    },
    addBorder () {
      this.border = !this.border
      document.getElementById('cachet').style.borderColor = this.border ? '#f00' : '#fff'
    }
  }
}
</script>
<style lang="stylus">
    #cachet
        border: 1px solid #fff

    .text
        width 180px
        margin 0 auto 20px
        display flex
        flex-direction column
        moz-user-select: -moz-none
        -moz-user-select: none
        -o-user-select: none
        -khtml-user-select: none
        -webkit-user-select: none
        -ms-user-select: none
        user-select: none
        input, button
            margin-bottom 10px
</style>
