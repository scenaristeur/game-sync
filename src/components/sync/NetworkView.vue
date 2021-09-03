<template>
  <div>


    <div class="wrapper" v-if="networkUrl != null">

          <CommandInput />

      <network
      id="network"
      class="network"
      ref="network"
      :nodes="network.nodes"
      :edges="network.edges"
      :options="network.options"
      @nodes-add="addNodeEvent"
      @edges-add="addEdgeEvent"
      @select-node="selectNodeEvent"

      @click="networkClickEvent"


      ></network>
      <!-- url : {{ networkUrl.url}}<br>
        <a :href="game.url" target="_blank">Game url</a> -->

      <!-- updates : {{ updates }} -->
      <!-- @select-node="selectNodeEvent"

      @nodes-add="addNodeEvent"

      @click="networkClickEvent" -->
      <!--
      @select-edge="networkEvent"
      @nodes-remove="networkEvent"
      @edges-remove="networkEvent"
      @nodes-update="networkEvent"
      @edges-mounted="networkEvent"
      @edges-add="networkEvent"
      @edges-update="networkEvent"
      @edges-remove="networkEvent('edges-remove')"
      @nodes-remove="networkEvent('nodes-remove')"
      @before-drawing="drawBg"
      @double-click="networkEvent('doubleClick')"
      @oncontext="networkEvent('oncontext')"
      @hold="networkEvent('hold')"
      @release="networkEvent('release')"
      @select="networkEvent('select')"
      @select-node="networkEvent('selectNode')"
      @select-edge="networkEvent('selectEdge')"
      @deselect-node="networkEvent('deselectNode')"
      @deselect-edge="networkEvent('deselectEdge')"
      @drag-start="networkEvent('dragStart')"
      @dragging="networkEvent('dragging')"
      @drag-end="networkEvent('dragEnd')"
      @hover-node="networkEvent('hoverNode')"
      @blur-node="networkEvent('blurNode')"
      @hover-edge="networkEvent('hoverEdge')"
      @blur-edge="networkEvent('blurEdge')"
      @zoom="networkEvent('zoom')"
      @show-popup="networkEvent('showPopup')"
      @hide-popup="networkEvent('hidePopup')"
      @start-stabilizing="networkEvent('startStabilizing')"
      @stabilization-progress="networkEvent('stabilizationProgress')"
      @stabilization-iterations-done="networkEvent('stabilizationIterationsDone')"
      @stabilized="networkEvent('stabilized')"
      @resize="networkEvent('resize')"
      @init-redraw="networkEvent('initRedraw')"
      @after-drawing="networkEvent('afterDrawing')"
      @animation-finished="networkEvent('animationFinished')"
      @config-change="networkEvent('configChange')"
      @nodes-mounted="networkEvent('nodes-mounted')"
      @nodes-add="networkEvent('nodes-add')"
      @nodes-update="networkEvent('nodes-update')"
      @nodes-remove="networkEvent('nodes-remove')"
      @edges-mounted="networkEvent('edges-mounted')"
      @edges-add="networkEvent('edges-add')"
      @edges-update="networkEvent('edges-update')"
      @edges-remove="networkEvent('edges-remove')"
    -->
    <!-- <img
    id="scream"
    src="north_pole.png"
    style="display: none;"
    alt="Noth Pole"
    />
    <button @click="addNode">Add node</button>
    <button @click="addEdge">Add edge</button>
    <button @click="resetNetwork">Reset Network</button>
    <button @click="removeNode">Remove Node</button>
    <button @click="removeEdge">Remove Edge</button> -->
    <!-- <div class="events">
    <p>
    Network events:
    <br />
    {{networkEvents}}
  </p>
</div> -->
<!-- <NetworkPopups :network="network" /> -->
</div>
<NetworkPopups :network="network" :game="game" />
</div>
</template>

<script>
import "vue-vis-network/node_modules/vis-network/dist/vis-network.css";
import NetMixin from '@/mixins/NetMixin'
import NetworkEvent from '@/mixins/NetworkEventMixin'

export default {
  name: "NetworkView",
  mixins: [NetworkEvent, NetMixin],
  components: {
    //  Network,
    'NetworkPopups': () => import('@/components/network/NetworkPopups'),
    'CommandInput': () => import('@/components/layout/CommandInput')

    // 'network': () => import('vue-vis-network')
  },
  data(){
    return{
      updates: [],
      network: {
        nodes: [],
        edges: [],
        // optionsBUGCHROME: {
        //   locale: navigator.language,
        //   nodes: {
        //     //  shape: "dot",
        //     scaling: {
        //       min: 10,
        //       max: 30,
        //     },
        //     font: {
        //       size: 12,
        //       face: "Tahoma",
        //     },
        //   },
        //   edges: {
        //     arrows: 'to',
        //     width: 0.15,
        //     color: { inherit: "from" },
        //     font: {
        //       align: 'top'
        //     },
        //     smooth: {
        //       type: "continuous",
        //     },
        //   },
        //   physics: {
        //     stabilization: {onlyDynamicEdges: true},
        //     barnesHut: {
        //       gravitationalConstant: -8000, //-8000
        //       springConstant: 0.03, //0.001 //0.01
        //       springLength: 100, //200
        //     },
        //   },
        //   interaction: {
        //     navigationButtons: true,
        //     //  tooltipDelay: 200,
        //     //  hideEdgesOnDrag: true,
        //   },
        // },
        options: {
          interaction: {
            navigationButtons: true,
            tooltipDelay: 200,
            //  hideEdgesOnDrag: true,
          },
          manipulation: true,
          nodes: {
            // shape: "circle",
            // size:24,
            // color: {
            //   background: '#D2E5FF',
            //   border: '#2B7CE9',
            //   highlight: {
            //     border: 'black',
            //     background: 'white'
            //   },
            // hover: {
            //   border: 'orange',
            //   background: 'grey'
            // }
            //  },
            font:{color:'black'},
            // shapeProperties: {
            //   useBorderWithImage:true
            // }
          },
          edges: {
            arrows: 'to',
            //  color: 'lightgray'
          },
        }
      }
    }
  },
  created(){
    let app = this
    console.log(this.network)

    //this.network.options.locale =  navigator.language,

    this.network.options.manipulation = {
      initiallyActive: true,
      addNode: async (node, callback) => { node.label = "" ; app.editNode(node, callback) },
      editNode: async (node, callback) => { app.editNode(node, callback) },
      addEdge: async (edge, callback) => { app.addEdge(edge, callback) },
      editEdge: { editWithoutDrag: async (edge, callback) => {app.editWithoutDrag(edge, callback)} },
      deleteNode: async (objects, callback) => { app.deleteNode(objects, callback) },
      deleteEdge: async (objects, callback) => { app.deleteEdge(objects, callback) },
      controlNodeStyle: {
        shape:'dot',
        size:6,
        color: {
          background: '#ff0000',
          border: '#3c3c3c',
          highlight: {
            background: '#07f968',
            border: '#3c3c3c'
          }
        },
        borderWidth: 2,
        borderWidthSelected: 2
      }

      //  editEdge: async (edge, callback) => { app.editWithoutDrag(edge, callback) },
      //  editEdge: {}
      // }
    }
  },

  methods:{
    editNode(node, callback){
      //    this.node = node
      node.color == undefined ? node.color =  {  background: '#D2E5FF', border: '#2B7CE9'} : ""
      node.shape == undefined ? node.shape = 'ellipse': ""
      //  this.$bvModal.show("node-popup")
      let action = {action: 'editNode', node: node}
      this.$store.commit('ipgs/setAction', action)
      callback()
    },
    addEdge(edge, callback){
      //  this.edge = edge
      if (edge.from == edge.to) {
        var r = confirm("Do you want to connect the node to itself?");
        if (r != true) { callback(null); return; }
      }
      this.editWithoutDrag(edge, callback);
    },
    //  editEdge(edge, callback){ this.editWithoutDrag(edge, callback); },
    editWithoutDrag(edge, callback){
      //  this.edge = edge
      console.log(edge)
      let bugEdge = edge
      bugEdge.from = edge.from.id != undefined ? edge.from.id : edge.from
      bugEdge.to  = edge.to.id != undefined ? edge.to.id : edge.to
      let action = {action: 'editEdge', edge: bugEdge}
      this.$store.commit('ipgs/setAction', action)

      //  this.$bvModal.show("edge-popup")
      callback()
    },
    deleteNode(objects, callback){
      let action = {action: 'deleteNode', objects: objects}
      this.$store.commit('ipgs/setAction', action)
      callback()
    },
    deleteEdge(objects, callback){
      let action = {action: 'deleteEdge', objects: objects}
      this.$store.commit('ipgs/setAction', action)
      callback()
    },
    addNodeEvent(n){
      console.log("addNode",n)
    },
    addEdgeEvent(e){
      console.log("addEdge",e)
    },
    processUpdates(){
      this.updates.forEach((u) => {
        console.log(u)
        let indexN, indexE, n, e
        switch (u.action) {
          case "addNode":
          case "updateNode":
          n = u.node
          delete n.x
          delete n.y
          indexN = this.network.nodes.findIndex(x => x.id==n.id);
          indexN === -1 ? this.network.nodes.push(n) : Object.assign(this.network.nodes[indexN], n)
          break;


          case "addEdge":
          case "updateEdge":
          e = u.edge
          indexE = this.network.edges.findIndex(x => x.id==e.id);
          indexE === -1 ? this.network.edges.push(e) : Object.assign(this.network.edges[indexE], e)
          break;
          default:
          console.log("todo",u)

        }
      });

    }
    // process(u){
    //   console.log("UUU",u)
    //   try{
    //     let u2 = JSON.parse(u)
    //     console.log("uu",u2)
    //   }catch(e){
    //     console.log("err",e)
    //     console.log("u string",u)
    //   }
    // }
  },
  watch:{
    game(){
      console.log("game", this.game)
      if (this.networkUrl != null && this.game != null && this.game.url == this.networkUrl.url){
        console.log("Game Update", this.game)
        this.network = this.game.network
      }
    },
    gameV1(){
      console.log("game", this.game)
      if (this.game != null && this.game.url == this.networkUrl.url){
        console.log("Game Update", this.game)
        this.updates = this.game.updates.map(u => {return JSON.parse(u)})
        this.processUpdates()
        // this.updates = this.game.updates
        // this.network.nodes = this.updates.map(u => {return {label: u}})
        // this.game.updates.forEach((u) => {
        //   this.process(u)
        // });

      }
    }
  },
  computed: {
    networkUrl:{
      get () { return this.$store.state.gamesync.networkUrl },
      set (/*value*/) { /*this.updateTodo(value)*/ }
    },
    game:{
      get () { return this.$store.state.gamesync.game },
      set (/*value*/) { /*this.$store.commit('gamesync/setGame', value)*/ }
    },
  }
}
</script>

<style>
/* * {
font-family: sans-serif;
} */
/* .wrapper {
padding: 20px 50px;
text-align: center;
} */
/* .events {
text-align: left;
height: 70px;
} */
.network{
  min-height:55vh;/* 95vh;*/
  border: 1px solid black;
  background: linear-gradient(to bottom, rgba(215, 215, 255), rgba(250, 250, 170));
  padding: 10px;
  height: 95vh;
}
.vis-label{
  color: black;
}
/* @media only screen and (max-width: 600px) {
.vis-label {
display: none;
}
.vis-button:after {
content:"°°"
}
} */
</style>
