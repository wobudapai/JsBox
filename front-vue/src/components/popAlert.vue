<template>
  <pop-window :open="text !== ''" @close="close()">
    <div class="pop-success">
      <p class="success">{{text}}</p>
      <button class="btn-positive" @click="close()">确定</button>
    </div>
  </pop-window>
</template>

<script>
  import popWindow from './popWindow.vue'
  export default {
    components: {
      'pop-window': popWindow
    },
    props: {
      text: {
        type: String,
        default: ''
      }
    },
    methods: {
      close: function () {
        this.$emit('close')
      }
    }
  }
</script>

<style scoped>
  .pop-success {
    width: 300px;
    font-family: 微软雅黑;
    text-align: center;
    padding-bottom: 20px;
  }
  .success {
    font-size: 22px;
    color: #ccc;
    padding-left: 20px;
    padding-right: 20px;
  }
  .btn-positive {
    height: 35px;
    width: 100px;
    margin: 20px 0 10px 10px;
    box-sizing: border-box;
    border: 1px solid #777;
    background-color: #0C1021;
    color: #777;
    cursor: pointer;
    outline: none;
  }
  .btn-positive:active {
    background-color: #222;
  }
</style>
