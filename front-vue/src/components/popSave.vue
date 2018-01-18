<template>
  <pop-window :open="open" @close="close()">
    <div class="pop-save">
      <input type="text" class="form-control" v-model="title" placeholder="请输入标题（20个字符以内）">
      <input type="text" class="form-control" v-model="token" placeholder="请输入token（选填）">
      <p class="hint">如果未输入token，则您提交的代码将在管理员审核后展现。</p>
      <p class="hint"><strong>验证：</strong>“{{poem.poem}}”的下一句是？</p>
      <ul class="list-verify">
        <li class="item-verify"
            v-for="(option,index) in poem.options"
            :class="{current: index === currentOptionIndex}"
            @click="currentOptionIndex = index">
          {{option}}
        </li>
      </ul>
      <div class="btn-group">
        <button class="btn" @click="submit()">提交</button>
      </div>
      <p class="error" v-show="error !== ''">{{error}}</p>
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
      open: {
        type: Boolean,
        default: false
      }
    },
    data: function () {
      return {
        token: '',
        title: '',
        error: '',
        currentOptionIndex: -1,
        poem: {
          options: ['试试事实上升水', '试试事实上升水', '试试事实上升水', '试试事实上升水']
        }
      }
    },
    mounted: function () {
      const vm = this
      this.$store.dispatch('getVerify').then(function (data) {
        if (data.success) {
          vm.poem = data.data
        }
      })
    },
    watch: {
      open: function (val) {
        if (val) {
          this.reset()
        }
      }
    },
    methods: {
      close: function () {
        this.$emit('close')
      },
      submit: function () {
        if (this.title === '') {
          this.error = '标题必须输入呦'
          return
        }
        if (this.title.length > 20) {
          this.error = '标题长度不能超过20个字符'
          return
        }
        if (this.currentOptionIndex < 0) {
          this.error = '请选择验证'
          return
        }
        this.$emit('sutmit', {
          title: this.title,
          token: this.token,
          answer: this.poem.answer,
          option: this.poem.options[this.currentOptionIndex]
        })
        this.$emit('close')
      },
      reset: function () {
        this.token = ''
        this.title = ''
        this.error = ''
        this.currentOptionIndex = -1
        const vm = this
        this.$store.dispatch('getVerify').then(function (data) {
          if (data.success) {
            vm.poem = data.data
          }
        })
      }
    }
  }
</script>

<style scoped>
  .pop-save {
    width: 400px;
    padding: 20px;
    font: 16px/1.5 "Arial","Microsoft YaHei","黑体","宋体",sans-serif;
  }
  .hint {
    color: #888;
    font-size: 14px;
  }
  input.form-control {
    width: 100%;
    font: 16px/1.2 "Arial","Microsoft YaHei","黑体","宋体",sans-serif;
    padding: 10px;
    border: 1px solid #1e525c;
    outline: none;
    box-sizing: border-box;
    margin-top: 15px;
    background-color: #161a2e;
    color: white;
  }
  input.form-control:focus {
    border-color: #29AFC9;
    box-shadow: 0 0 5px rgba(41,175,201,.5);
  }
  .btn-group {
    text-align: right;
    margin-top: 20px;
  }
  .btn {
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
  .btn:active {
    background-color: #222;
  }
  .error {
    font-size: 12px;
    color: red;
    font-weight: bolder;
    margin: 5px 0;
    text-align: center;
  }
  .list-verify, .item-verify {
    list-style-type: none;
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }
  .item-verify {
    margin: 5px;
    float: left;
    width: 190px;
    text-align: center;
    border: 1px solid #1e525c;
    padding: 6px;
    font-size: 14px;
    color: #aaa;
    cursor: pointer;
  }
  .item-verify.current {
    border-color: #29AFC9;
    color: #29AFC9;
  }
</style>
