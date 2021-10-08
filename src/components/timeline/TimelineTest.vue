<template>
  <div>
    Timeline

    <div id="demo">demo</div>

    <div id="visualization" ref="visualization"></div>
    <div id="log">log</div>
  </div>
</template>

<script>
import { DataSet } from "vis-data/peer";
import { Timeline } from "vis-timeline/peer";
import "vis-timeline/styles/vis-timeline-graph2d.css";
// You may import from other packages like Vis Network or Vis Graph3D here.
// You can optionally include locales for Moment if you need any.



export default {
  name: "TimelineTest",
  data(){
    return{
      items : new DataSet([
  { id: 1, content: "item 1", start: "2014-04-20" },
  { id: 2, content: "item 2", start: "2014-04-14" },
  { id: 3, content: "item 3", start: "2014-04-18" },
  { id: 4, content: "item 4", start: "2014-04-16", end: "2014-04-19" },
  { id: 5, content: "item 5", start: "2014-04-25" },
  { id: 6, content: "item 6", start: "2014-04-27", type: "point" }
]),
options: {}
    }
  },
  mounted(){
    // DOM element where the Timeline will be attached
    const container = document.getElementById("visualization");
    const timeline = new Timeline(container, this.items, this.options);
    console.log(timeline)
  }
}
</script>

<style>

</style>
