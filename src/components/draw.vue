<template>
    <div class='main'>
        <div class='btn'>
            <button v-for='n in list' :key='n.id' @click='type = n.id,draw = true'>{{n.name}}</button>
        </div>
        <div class='draw' :style='{cursor:draw?"crosshair":"auto"}'>
            <svg id='drawSvg' xmlns="http://www.w3.org/2000/svg" version="1.1" width="400" height="400"></svg>
            <canvas id="draw" width="400" height="400" v-show='draw'></canvas>
        </div>
        <div class='colorBox'>
            <span class='color' v-for='(n,i) in colorList' :key='i'
                  :style='{outlineWidth:index===i?"1px":"0"}'
                  @click='choiceColor(n,i)'>
                <span :style='{background:n}'></span>
            </span>
        </div>
    </div>
</template>
<script>

import Draw from '../script/draw'

export default {
  data () {
    return {
      stamp: null,
      list: [
        {
          id: 'drawLine',
          name: '画线'
        }
        // {
        //     id: 'drawCircle',
        //     name: '圆'
        // },
        // {
        //     id: 'drawRect',
        //     name: '矩形'
        // }
      ],
      type: 'drawLine',
      imgs: [],
      index: 0,
      color: 'black',
      colorList: ['black', 'red', 'blue'],
      draw: false
    }
  },
  mounted () {
    // 初始化画布
    this.stamp = new Draw({id: 'draw'})

    this.stamp.canvas.onmousedown = e => {
      this.stamp.startDrawing(e)
    }
    this.stamp.canvas.onmouseup = e => {
      this.stamp.endDrawing(e, this.color)
      this.draw = false
    }
    this.stamp.canvas.onmousemove = (e) => {
      this.stamp.moveDrawing(this.type, e, this.color)
    }

    // 添加 Esc 监听
    document.onkeyup = (event) => {
      if (event.keyCode === 27 || event.keyCode === 96) {
        this.draw = false
      }
    }
  },
  methods: {
    choiceColor (n, i) {
      this.color = n
      this.index = i
    }
  }
}
</script>
<style lang="stylus">
    .btn
        margin-bottom 20px
        button
            margin 0 10px

    #draw
        position absolute
        top 0
        left 0

    .draw
        width 400px
        height 400px
        background #ffeecd
        position relative
        moz-user-select: -moz-none
        -moz-user-select: none
        -o-user-select: none
        -khtml-user-select: none
        -webkit-user-select: none
        -ms-user-select: none
        user-select: none
        .img
            position absolute
            top 0
            left 0

    .colorBox
        display flex
        justify-content space-around
        margin-top 10px
        .color
            cursor pointer
            padding 3px
            outline-color #888888
            outline-style solid
            span
                display block
                width 20px
                height 20px
</style>
