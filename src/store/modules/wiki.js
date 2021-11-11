import Vue from 'vue'
const state = () => ({
  wikiData: null
})

const actions = {
  async getWikiContainer(context, url){
    console.log(url)
    let path = {url: url, subscribe: true}
    let container = await Vue.prototype.$readContainer(path)
    console.log("container", container)
    context.commit('setWikiData', container)
  },
  async create(context, item){
    console.log(item)
    await Vue.prototype.$createWikiEntry(item)
    await this.dispatch('wiki/getWikiContainer', item.path)
  },
  async update(context, item){
    console.log(item)
    await Vue.prototype.$updateWikiEntry(item)
    await this.dispatch('wiki/getWikiContainer', item.path)
  },
  async add(context, item){
    console.log(item)
    await Vue.prototype.$addWikiEntry(item)
    await this.dispatch('wiki/getWikiContainer', item.path)
  }
}

const mutations = {
  setWikiData(state, d){
    state.wikiData = d || null
  }
  // setPod(state,p){
  //   state.pod = p
  // },
  // setSession(state, s){
  //   state.session = s
  // },
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
