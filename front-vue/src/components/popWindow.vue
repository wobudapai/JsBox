<template>
  <div class="pop-mask" v-show="open" @click.self="close()">
    <div class="pop-window">
      <div class="btn-close" @click="close()">×</div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      open: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      close: function () {
        this.$emit('close')
      }
    }
  }
</script>

<style>
  .pop-mask {
    position: fixed;
    z-index: 1000;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
  }
  .pop-window {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background-color: #0C1021;
    border: 1px solid #565656;
    box-shadow: 0 0 5px #777;
    padding-top: 30px;
  }
  .btn-close {
    position: absolute;
    color: #999;
    font-size: 24px;
    padding: 5px 10px;
    right: 0;
    top: 0;
    cursor: pointer;
  }
</style>
