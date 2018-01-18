<template>
  <div class="container-home" :class="{noAside:!isShowAside}">
    <aside>
      <button class="btn-toggle"
              @click="isShowAside = !isShowAside"
              :class="{open:!isShowAside,close:isShowAside}">
      </button>
      <h1 class="title">Javascript Box</h1>
      <ul class="list-project">
        <li class="item-project"
            :class="{current: dp.id === currentId}"
            v-for="(dp,index) in dataProject"
            @click="loadCode(dp.id)">
          {{index + 1}}、{{dp.title}}
          <img src="../assets/image/icon-share.png"
               class="btn-share" alt="分享" @click="share(dp.id)">
        </li>
      </ul>
      <button class="btn-add" @click="add()"></button>
    </aside>
    <div class="box-editor">
      <div class="box-code"
           :style="{height: boxCodeHeight + 'px'}">
        <textarea
          spellcheck="false"
          autocapitalize="none"
          autocorrect="off"
          ref="codeEditor">
        </textarea>
      </div>
      <div class="box-control">
        <a class="link-site" href="http://code.smallcfj.club" target="_blank">Javascript Box</a>
        <div class="box-right">
          <label class="text-title">{{currentTitle}}</label>
          <button class="btn-save" @click="popSaveOpen = true">保存</button>
          <button @click="clearConsole()">清空</button>
          <button @click="run()">运行</button>
        </div>
      </div>
      <div class="box-console">
        <ul class="list-console">
          <li class="item-console" v-for="dc in dataConsole">
            <label>{{$util.parseDate(dc.time,'yyyy-MM-dd hh:mm:ss')}}&nbsp;&nbsp;:&nbsp;&nbsp;</label>
            {{dc.msg}}
          </li>
        </ul>
      </div>
    </div>
    <pop-save :open="popSaveOpen"
      @close="popSaveOpen = false"
      @sutmit="submit">
    </pop-save>
    <pop-alert :text="alertText"
                 @close="alertClose()">
    </pop-alert>
    <pop-share :cid="shareCodeId"
               @close="shareClose()">
    </pop-share>
  </div>
</template>

<script>
  import CodeMirror from '../assets/CodeMirror/lib/codemirror'
  import '../assets/CodeMirror/mode/javascript'
  import popSave from './popSave.vue'
  import popAlert from './popAlert.vue'
  import popShare from './popShare.vue'

  export default {
    components: {
      'pop-save': popSave,
      'pop-alert': popAlert,
      'pop-share': popShare
    },
    data: function () {
      return {
        editor: null,
        dataConsole: [],
        dataProject: [],
        preY: 0,
        boxCodeHeight: 300,
        currentId: '',
        currentTitle: '',
        isShowAside: true,
        popSaveOpen: false,
        alertText: '',
        shareCodeId: ''
      }
    },
    mounted: function () {
      this.editor = CodeMirror.fromTextArea(this.$refs.codeEditor, {
        mode: 'text/javascript',
        lineNumbers: true,
        lineWrapping: true,
        indentUnit: 4,  // 缩进
        foldGutter: true,
        styleActiveLine: true,
        theme: 'blackboard',
        gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter']
      })

      console.log = this.log

      window.onmousedown = this.ctrlMouseDown
      window.onmousemove = this.ctrlMouseMove
      window.onmouseup = this.ctrlMouseUp
      document.addEventListener('mouseleave', this.mouseLeaveWindow)

      var vm = this
      this.$store.dispatch('codeList').then(function (data) {
        if (data.success) {
          vm.dataProject = data.list
        }
      })

      const cid = this.$route.query.Cid
      if (cid) {
        this.loadCode(cid)
      }
    },
    methods: {
      mouseLeaveWindow: function (e) {
        this.preY = 0
      },
      ctrlMouseDown: function (e) {
        let el = e.target || e.srcElement
        while (el) {
          if (el.className && el.className.indexOf('box-control') >= 0) {
            this.preY = e.clientY
          }
          el = el.parentNode
        }
      },
      ctrlMouseMove: function (e) {
        const nowY = e.clientY
        if (this.preY <= 0) {
          return
        }
        e.preventDefault()
        this.boxCodeHeight += nowY - this.preY
        if (this.boxCodeHeight < 50) {
          this.boxCodeHeight = 50
        } else if (this.boxCodeHeight > document.body.clientHeight - 100) {
          this.boxCodeHeight = document.body.clientHeight - 100
        } else {
          this.preY = nowY
        }
      },
      ctrlMouseUp: function (e) {
        this.preY = 0
      },
      run: function () {
        eval(this.editor.getValue())
      },
      log: function (text) {
        this.dataConsole.unshift({
          type: 'log',
          time: parseInt(Date.now() / 1000),
          msg: text
        })
      },
      clearConsole: function () {
        this.dataConsole = []
      },
      submit: function (data) {
        const vm = this
        data.content = this.editor.getValue()
        this.$store.dispatch('add', data).then(function (res) {
          if (res.success) {
            vm.alertText = '提交成功!'
          } else {
            vm.alertText = res.msg
          }
        })
      },
      loadCode: function (id) {
        const vm = this
        vm.$store.dispatch('codeDetail', id).then(function (data) {
          if (data.success) {
            vm.currentId = id
            vm.currentTitle = data.title
            vm.editor.setValue(data.content)
          }
        })
      },
      add: function () {
        this.currentTitle = ''
        this.editor.setValue('')
        this.clearConsole()
      },
      alertClose: function () {
        this.alertText = ''
        this.currentId = ''
        this.currentTitle = ''
        this.editor.setValue('')
      },
      share: function (id) {
        this.shareCodeId = id
      },
      shareClose: function () {
        this.shareCodeId = ''
      }
    }
  }
</script>

<style>
  @import "../assets/CodeMirror/lib/codemirror.css";
  @import "../assets/CodeMirror/theme/blackboard.css";
  .container-home {
    height: 100%;
    background-color: #0C1021;
  }
  aside {
    position: fixed;
    width: 260px;
    left: 0;
    top: 0;
    height: 100%;
    box-sizing: border-box;
    background-color: #333;
    border-right: 1px solid #565656;
    z-index: 10;
    transition: transform .5s;
    will-change: transform;
  }
  .btn-toggle {
    position: absolute;
    width: 25px;
    height: 60px;
    right: -26px;
    background-color: #222;
    top: 50%;
    transform: translateY(-50%);
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    border-top: 1px solid #565656;
    border-right: 1px solid #565656;
    border-bottom: 1px solid #565656;
    border-left: none;
    box-shadow: 1px 0 5px #111;
    background-position: center;
    background-size: 70%;
    background-repeat: no-repeat;
    outline: none;
    cursor: pointer;
  }
  .btn-toggle.close {
    background-image: url('../assets/image/arrow-close.png');
  }
  .btn-toggle.open {
    background-image: url('../assets/image/arrow-open.png');
  }
  .title {
    padding: 10px 0;
    background-color: #111;
    color: #999;
    text-align: center;
    font-size: 20px;
    font-weight: bolder;
  }
  .list-project, .item-project {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }
  .item-project {
    position: relative;
    padding: 0 10px;
    color: #999;
    word-wrap: break-word;
    word-break: break-all;
    cursor: pointer;
    font-size: 16px;
    height: 40px;
    line-height: 40px;
  }
  .item-project:hover,
  .item-project.current {
    background-color: #222;
  }
  .btn-share {
    position: absolute;
    display: block;
    right: 0;
    top: 0;
    padding: 10px;
    height: 20px;
    visibility: hidden;
  }
  .btn-share:hover {
    height: 26px;
    padding: 7px;
    background-color: #2a2a2a;
  }
  .item-project:hover .btn-share,
  .item-project.current .btn-share {
    visibility: visible;
  }
  .btn-add {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 40px;
    border: none;
    border-top: 1.5px solid #222;
    background-color: transparent;
    background-image: url('../assets/image/icon-add.png');
    background-repeat: no-repeat;
    background-size: 26px;
    background-position: center;
    cursor: pointer;
    outline: none;
  }
  .btn-add:hover {
    background-color: #222;
  }

  .box-editor {
    width: 100%;
    height: 100%;
    position: relative;
    padding-left: 260px;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    transition: padding-left .5s;
    will-change:padding-left;
  }
  .box-code {
    font-size: 16px;
    overflow: hidden;
    flex-shrink: 0;
  }
  .box-code>.CodeMirror {
    height: 100%;
  }
  .box-control {
    height: 50px;
    background-color: #333;
    border-top: 1px solid #565656;
    border-bottom: 1px solid #565656;
    cursor: move;
    flex-shrink: 0;
  }
  .box-control button {
    height: 30px;
    width: 80px;
    margin: 10px 0 10px 10px;
    box-sizing: border-box;
    border: 1px solid #565656;
    background-color: #222;
    color: #777;
    cursor: pointer;
    outline: none;
  }
  .box-control .box-right {
    float: right;
    margin-right: 30px;
  }
  .box-control button:active {
    background-color: #111;
    color: #565656;
  }
  .text-title {
    height: 32px;
    margin: 9px;
    box-sizing: border-box;
    outline: none;
    padding: 5px;
    font-size: 16px;
    font-family: 微软雅黑;
    width: 400px;
    color: #aaa;
    overflow: hidden;
  }
  .link-site {
    display: inline-block;
    height: 32px;
    line-height: 32px;
    margin: 9px;
    font-family: 微软雅黑;
    color: #0c1021;
    font-size: 18px;
    font-weight: bolder;
    cursor: pointer;
    text-decoration: none;
    visibility: hidden;
  }
  .link-site:hover {
    text-decoration: underline;
  }

  .box-console {
    flex-grow: 1;
    background-color: #0C1021;
    overflow: auto;
  }
  .list-console, .item-console {
    margin: 0;
    padding: 0;
    list-style-type: none;
    font-size: 14px;
    color: #8DA6CE;
  }
  .list-console {
    padding: 10px 0;
  }
  .item-console {
    padding: 3px;
    word-wrap: break-word;
    word-break: break-all;
  }
  .item-console:hover {
    background-color: #222;
  }
  .item-console label {
    user-select:none;
  }

  .container-home.noAside aside {
    transform: translateX(-260px);
  }
  .container-home.noAside .box-editor {
    padding-left: 0;
  }
  .CodeMirror pre {
    font: 16px/1.5 Helvetica, Arial, sans-serif !important;
  }

  @media screen and (max-width : 1000px) {
    aside {
      display: none;
    }
    .box-editor {
      padding-left: 0;
    }
    .btn-save {
      display: none;
    }
    .link-site {
      visibility: visible;
    }
    .box-control .box-right {
      margin-right: 10px;
    }
  }
</style>


<!--webpack练习 https://juejin.im/post/58edcbda44d904005774cfb1-->
