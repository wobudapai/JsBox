<template>
  <pop-window :open="cid !== ''" @close="close()">
    <div class="pop-share">
      <p class="hint">请复制下面代码粘贴到需要的地方</p>
      <textarea class="box-code" v-html="code" ref="shareCode">
      </textarea>
      <p class="error" v-show="isCopy">复制好了\(^o^)/~</p>
      <button class="btn-positive" @click="copyCode()">点击复制</button>
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
      cid: {
        type: String,
        default: ''
      }
    },
    data: function () {
      return {
        isCopy: false
      }
    },
    watch: {
      cid: function (val) {
        if (val !== '') {
          this.isCopy = false
        }
      }
    },
    computed: {
      code: function () {
        return '<iframe src="http://code.smallcfj.club/#/?Cid=' + this.cid + '" width="100%" height="500px" frameborder="0" scrolling="no"> </iframe>'
      }
    },
    methods: {
      close: function () {
        this.$emit('close')
      },
      copyCode: function () {
        this.$refs.shareCode.select()
        document.execCommand('Copy')
        this.isCopy = true
      }
    }
  }
</script>

<style scoped>
  .pop-share {
    width: 400px;
    font-family: 微软雅黑;
    text-align: center;
    padding: 10px;
  }
  .hint {
    color: #888;
    font-size: 14px;
  }
  .box-code {
    width: 380px;
    max-width: 380px;
    height: 150px;
    border: 1px solid #777;
    background-color: transparent;
    outline: none;
    padding: 5px;
    box-sizing: border-box;
    color: #CCC;
  }
  .btn-positive {
    height: 35px;
    width: 100px;
    margin: 10px 0 10px 10px;
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
  .error {
    font-size: 12px;
    color: red;
    font-weight: bolder;
    margin: 5px 0;
    text-align: center;
  }
</style>
