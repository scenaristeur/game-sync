<template>
  <div>
    <NodeModal :node="node" @ok="saveNode"/>
    <EdgeModal :edge="edge" @ok="saveEdge"/>
    <ImportModal />
    <!-- <ExportModal /> -->
    <PropertiesPopup />

    <b-modal id="delete-popup" title="Are you sur you want to delete this objects ?" @ok="remove">
      {{ JSON.stringify(objectsToRemove) }}
    </b-modal>
  </div>
</template>

<script>
export default {
  name: "NetworkPopups",
  props: ['network', 'game'],
  components: {
    'NodeModal': () => import('@/components/network/NodeModal'),
    'EdgeModal': () => import('@/components/network/EdgeModal'),
    'ImportModal': () => import('@/components/network/ImportModal'),
    // 'ExportModal': () => import('@/components/network/ExportModal'),
    'PropertiesPopup': () => import('@/components/network/PropertiesPopup'),
  },
  data() {
    return {
      node: {label: "", color: {  background: '#D2E5FF', border: '#2B7CE9'}, shape: 'ellipse', props: []},
      edge: {},
      n: null,
      objectsToRemove: {}
    }
  },
  created(){
    this.n = this.network
  },
  computed: {
    action: {
      get () { return this.$store.state.ipgs.action},
      set (/*value*/) { /*this.updateTodo(value)*/ }
    },
  },
  methods: {
    saveNode(n) {
      var index = this.network.nodes.findIndex(x => x.id==n.id);
      if(index === -1){
        this.n.nodes.push(n)
        let action = {action: "addNode", node: n}
        this.$changeGame(this.game, action)
      }else{
        Object.assign(this.network.nodes[index], n)
        let action = {action: "updateNode", node: n}
        this.$changeGame(this.game, action)
      }
    },
    saveEdge(e){
      console.log(e)
      var index = this.network.edges.findIndex(x => x.id==e.id || (x.from == e.from && x.to == e.to && x.label == e.label));
      if(index === -1){
        this.network.edges.push(e)
        let action = {action: "addEdge", edge: e}
        this.$changeGame(this.game, action)
      }else{
        Object.assign(this.network.edges[index], e)
        let action = {action: "updateEdge", edge: e}
        this.$changeGame(this.game, action)
      }
    },
    remove(){
      console.log("removing", this.objectsToRemove)
      let action = {action: "removeObjects", objects: this.objectsToRemove}
  this.$changeGame(this.game, action)
    }
  },
  watch:{
    action(){
      switch (this.action.action) {
        case 'editNode':
        this.node = this.network.nodes.find(x => x.id==this.action.node.id) || this.action.node
        console.log("props",this.node.props)
        this.$bvModal.show("node-popup")
        break;
        case 'editEdge':
        this.edge = this.network.edges.find(x => x.id==this.action.edge.id) || this.action.edge
        console.log("props",this.edge.props)
        this.$bvModal.show("edge-popup")
        break;
        case 'deleteNode':
        this.objectsToRemove = this.action.objects
        this.$bvModal.show("delete-popup")
        break;
        case 'deleteEdge':
        this.objectsToRemove = this.action.objects
        this.$bvModal.show("delete-popup")
        break;
        case 'import':
        this.$store.commit('ipgs/setNetwork', this.network)
        this.$bvModal.show("import-popup")
        break;
        case 'export':
        this.$store.commit('ipgs/setEditorContent', {content: {nodes: this.network.nodes, edges: this.network.edges}, format: 'json'})
        this.$bvModal.show("export-popup")
        break;
        default:
      }
    },
  }
}
</script>
