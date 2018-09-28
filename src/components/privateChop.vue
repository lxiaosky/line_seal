<template>
  <div class='main'>
    <div class='btn'>
      <button v-for='n in list' :key='n.id' @click='redraw(n)'>{{n.name}}</button>
    </div>
    <div id='canvas' :style='{cursor:cursor}'>
            <span class='img-box'
                  v-for='(n,i) in imgs' :key='i'
                  :class='n.answer?"err":""'
                  :style="{top:n.top+'px',left:n.left+'px'}">
                <img class='img' :src="n.img">
                <span class='close' @click='close(i)'>x</span>
            </span>
      <div v-show='mask' class='mask' @click='seal($event)'></div>
    </div>
  </div>
</template>
<script>

import PrivateChop from '../script/privateChop'

export default {
  data () {
    return {
      stamp: null,
      list: [
        {
          id: 1,
          name: '马化腾'
        },
        {
          id: 2,
          name: '马云'
        },
        {
          id: 3,
          name: '马明哲'
        }
      ],
      img: null,
      imgs: [],
      mask: false
    }
  },
  computed: {
    cursor () {
      return this.img ? `url('${this.img}'), auto` : 'auto'
    }
  },
  mounted () {
    // 初始化画布
    this.stamp = new PrivateChop('')

    // 添加 Esc 监听
    document.onkeyup = (event) => {
      if (event.keyCode === 27 || event.keyCode === 96) {
        this.img = null
        this.mask = false
      }
    }
  },
  methods: {
    redraw (n) {
      this.stamp.redraw(n.name)
      this.stamp.canvas.toBlob(blob => {
        this.img = URL.createObjectURL(blob)
      })
      this.mask = true
    },
    seal (e) {
      if (this.img) {
        this.imgs.push({
          img: this.img,
          top: e.offsetY - 5,
          left: e.offsetX - 5,
          answer: Math.ceil(Math.random() * 10) > 5
        })
        this.img = null
        this.mask = false
      }
    },
    close (i) {
      this.imgs.splice(i, 1)
    }
  }
}
</script>
<style lang="stylus">
  .btn
    margin-bottom 20px
    button
      margin 0 10px

  #canvas
    width 400px
    height 400px
    background #ffeecd
    cursor auto
    position relative
    moz-user-select: -moz-none
    -moz-user-select: none
    -o-user-select: none
    -khtml-user-select: none
    -webkit-user-select: none
    -ms-user-select: none
    user-select: none
    overflow hidden
    .img-box
      padding 5px
      position absolute
      .img
        display block
      .close
        font-size: 14px;
        color: #f00;
        position: absolute;
        top: -5px;
        right: -4px;
        cursor pointer
    .err
      outline 1px solid red
    .mask
      width 100%
      height 100%
      position absolute
      top 0
      left 0
      z-index 1000
</style>
