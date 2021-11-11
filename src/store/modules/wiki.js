import Vue from 'vue'
const state = () => ({
  wikiData: null,
  wikiIndex: [],
  searchQuery : ""
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
  },
  updateIndex(state, wikiEntry){
    for (const t of wikiEntry.things){
      //  console.log(t)
      let item = {name: t.name, url: t.url}
      // console.log(item)
      // Object.assign(state.wikiIndex[t.url], item)
      var index = state.wikiIndex.findIndex(x => x.url==t.url);
      //  console.log(index,item)
      index === -1 ? state.wikiIndex.push(item) : Object.assign(state.wikiIndex[index], item)
    }
    //  console.log(state.wikiIndex)
  },
  setSearchQuery(state, d){
    state.searchQuery = d
  },

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
