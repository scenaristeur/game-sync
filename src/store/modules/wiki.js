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
