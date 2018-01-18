import { post, get } from './fetch.js'

const api = {
  add: '/add',
  codeList: '/codeList',
  codeDetail: '/codeDetail',
  getVerify: '/verify'
}

export default {
  actions: {
    add: ({ state }, data) => {
      return post(api.add, data)
    },
    codeList: ( ) => {
      return get(api.codeList)
    },
    codeDetail: ({ state }, id) => {
      return get(api.codeDetail, { id })
    },
    getVerify: ( ) => {
      return get(api.getVerify)
    }
  }
}
