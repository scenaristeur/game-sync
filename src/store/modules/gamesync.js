
const state = () => ({
  messages: [],
  gameContainer: null,
  game: null
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
  },
  setGame(state, g){
    state.game = g
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
