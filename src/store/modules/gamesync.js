
const state = () => ({
  messages: [],
  gameContainer: null
})

const actions = {

}

const mutations = {
  newMessage(state,m){
    console.log(m)
    state.messages.push(m)
  },
  setGameContainer(state, c){
    state.gameContainer = c
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
