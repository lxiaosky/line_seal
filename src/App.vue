<template>
  <div id="app">
    <div class='demo'>
      <Draw></Draw>
      <Cachet></Cachet>
      <PrivateChop></PrivateChop>
    </div>
  </div>
</template>

<script>
import Cachet from './components/cachet.vue'
import Draw from './components/draw.vue'
import PrivateChop from './components/privateChop.vue'

export default {
  components: {
    Cachet,
    Draw,
    PrivateChop
  }
}
</script>

<style lang="stylus" scoped>
  #app {
    position absolute
    left 0
    right 0
    top 0
    bottom 0
    background white
  }

  .demo
    display flex
    justify-content space-around

  .main
    text-align center
    margin-top 40px

</style>
