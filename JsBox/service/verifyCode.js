var verifyCode = {
  getCode: function () {
    var result = {}
    var poemLength = poems.length
    var curIndex = Math.round(Math.random() * (poemLength - 1))
    var confuseIndexs = []
    while (confuseIndexs.length < 3) {
      var tempIndex = Math.round(Math.random() * (poemLength - 1))
      if (curIndex !== tempIndex) {
        var hasEqual = false
        confuseIndexs.forEach(function (i) {
          if (i === tempIndex) {
            hasEqual = true
          }
        })
        if (!hasEqual) {
          confuseIndexs.push(tempIndex)
        }
      }
    }

    var currentPoem = poems[curIndex]
    var curRandom = Math.round(Math.random() * (currentPoem.length - 2))
    result.poem = currentPoem[curRandom]
    result.answer = currentPoem[curRandom + 1]
    result.options = []
    var optionRandom = Math.round(Math.random() * (confuseIndexs.length - 1))
    confuseIndexs.forEach(function (index) {
      if (index === confuseIndexs[optionRandom]) {
        result.options.push(currentPoem[curRandom + 1])
      }
      var cPoem = poems[index]
      var cRandom = Math.round(Math.random() * (cPoem.length - 1))
      result.options.push(cPoem[cRandom])
    })
    return result
  }
}

module.exports = verifyCode






















var poems = [[
  '慈母手中线', '游子身上衣','临行密密缝','意恐迟迟归','谁言寸草心','报得三春晖'
], [
  '千山鸟飞绝', '万径人踪灭', '孤舟蓑笠翁', '独钓寒江雪'
], [
  '松下问童子', '言师采药去', '只在此山中', '云深不知处'
], [
  '月落乌啼霜满天', '江枫渔火对愁眠', '姑苏城外寒山寺', '夜半钟声到客船'
], [
  '湖光秋月两相和', '潭面无风镜未磨', '遥望洞庭山水翠', '白银盘里一青螺'
], [
  '锄禾日当午', '汗滴禾下土', '谁知盘中餐', '粒粒皆辛苦'
], [
  '清明时节雨纷纷', '路上行人欲断魂', '借问酒家何处有', '牧童遥指杏花村'
], [
  '千里莺啼绿映红', '水村山郭酒旗风', '南朝四百八十寺', '多少楼台烟雨中'
], [
  '爆竹声中一岁除', '春风送暖入屠苏', '千门万户曈曈日', '总把新桃换旧符'
], [
  '竹外桃花三两枝', '春江水暖鸭先知', '蒌蒿满地芦芽短', '正是河豚欲上时'
], [
  '生当作人杰', '死亦为鬼雄', '至今思项羽', '不肯过江东'
], [
  '毕竟西湖六月中', '风光不与四时同', '接天莲叶无穷碧', '映日荷花别样红'
], [
  '草长莺飞二月天', '拂堤杨柳醉春烟', '儿童散学归来早', '忙趁东风放纸鸢'
], [
  '两个黄鹂鸣翠柳', '一行白鹭上青天', '窗含西岭千秋雪', '门泊东吴万里船'
]]
