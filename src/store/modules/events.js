import Vue from 'vue';
const state = () => ({
  events: []
  // url : "",
  // // messages: [],
  // gameContainer: null,
  // game: null,
  // networkUrl: null
})

const actions = {
  addEvent(context, thing){
    context.commit('addEvent', thing.event)
    console.log(thing)
    let pod = context.rootState.solid.pod
    thing.publishTo.forEach((pub) => {
      let chose = {}
      if ((pod != null) && (pub == 'public' || pub == 'private')){
        chose.url = pod.storage+pub+'/'

      }else{
        chose.url=pub.url
      }
      chose.url += "events/"
      chose.name = thing.event.customData.title || thing.event.key
      chose.event = thing.event
      console.log(chose)
      let savedThing = Vue.prototype.$createEvent(chose)
      console.log("Event created", savedThing)




    });



    // let path = {url: url, subscribe: true}
    // Vue.prototype.$explore(path)
  }
}

const mutations = {
  addEvent(state, event){
    state.events.push(event)
    console.log(state.events)
  }
  // setUrl(state, url){
  //   console.log("url", url)
  //   state.url = url
  // },
  // setNetworkUrl(state, url){
  //   state.networkUrl = url
  // },
  //
  // // newMessage(state,m){
  // // //  console.log(m)
  // //   state.messages.push(m)
  // // },
  // setGameContainer(state, c){
  //   state.gameContainer = c
  // },
  // setGame(state, g){
  //   state.game = g
  // }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
