<template>
  <div>
    Timeline

    {{ items }}<br>
    {{ groups }}<br>
    {{ options}}
    <div id="demo">demo</div>

    <div id="visualization" ref="visualization"></div>
    <div id="log">log</div>
    <!--
    :events="['drop', 'changed']"
    @drop="myDropCallback"
    @changed="myChangedCallback"
  -->
</div>
</template>

<script>
import { DataSet, Timeline } from "vis-timeline/standalone";
import "vis-timeline/styles/vis-timeline-graph2d.css";
//import swal from 'sweetalert';


export default {
  name: "TimelineTest",
  components: {
    //Timeline
    //'Todo': () => import('@/components/Todo'),
    //  'Timeline': () => import('vis-timeline/standalone'),
  },
  // data1() {
  //   return {
  //     groups: new DataSet([
  //       {
  //         id: 0,
  //         content: "Group 1"
  //       }
  //     ]),
  //     items: new DataSet([
  //       {
  //         id: 0,
  //         group: 0,
  //         start: new Date(),
  //         content: "Item 1"
  //       }
  //     ]),
  //     options: {
  //       editable: true
  //     }
  //   };
  // },
  data() {
    return {
      groups: [
        {
          id: 0,
          content: "Group 1"
        }
      ],
      items: new DataSet([
        {id: 1, content: 'item 1', start: new Date(2021, 9, 20)},
        {id: 2, content: 'item 2', start: new Date(2021, 9, 14)},
        {id: 3, content: 'item 3', start: new Date(2021, 9, 18)},
        {id: 4, content: 'item 4', start: new Date(2021, 9, 16), end: new Date(2021, 9, 19)},
        {id: 5, content: 'item 5', start: new Date(2021, 9, 25)},
        {id: 6, content: 'item 6', start: new Date(2021, 9, 27)}
        // { id: 1, content: "item 1", start: "2021-09-27" },
        // { id: 2, content: "item 2", start: "2021-09-28" },
        // { id: 3, content: "item 3", start: "2021-09-26" },
        // { id: 4, content: "item 4", start: "2021-09-16", end: "2021-09-19" },
        // { id: 5, content: "item 5", start: "2021-09-30" },
        // { id: 6, content: "item 6", start: "2021-09-29", type: "point" }
      ]),
      // [
      //   {
      //     id: 0,
      //     group: 0,
      //     start: new Date(),
      //     content: "Item 1"
      //   }
      // ],
      options: {
        editable: true
      }
    };
  },
  mounted(){
    var min = new Date(2021, 9, 1); // 1 april
    var max = new Date(2021, 9, 30, 23, 59, 59);
    // DOM element where the Timeline will be attached
    const container = document.getElementById("visualization");

    // Create a DataSet (allows two way data-binding)
    // const items = new DataSet([
    //   { id: 1, content: "item 1", start: "2014-04-20" },
    //   { id: 2, content: "item 2", start: "2014-04-14" },
    //   { id: 3, content: "item 3", start: "2014-04-18" },
    //   { id: 4, content: "item 4", start: "2021-09-16", end: "2021-09-19" },
    //   { id: 5, content: "item 5", start: "2021-09-30" },
    //   { id: 6, content: "item 6", start: "2014-04-27", type: "point" }
    // ]);

    // Configuration for the Timeline
    const options = {
      editable: true,
      onAdd: function (item, callback) {
        prettyPrompt('Add item', 'Enter text content for new item:', item.content, function (value) {
          if (value) {
            item.content = value;
            callback(item); // send back adjusted new item
          }
          else {
            callback(null); // cancel item creation
          }
        });
      },

      onMove: function (item, callback) {
        var title = 'Do you really want to move the item to\n' +
        'start: ' + item.start + '\n' +
        'end: ' + item.end + '?';

        prettyConfirm('Move item', title, function (ok) {
          if (ok) {
            callback(item); // send back item as confirmation (can be changed)
          }
          else {
            callback(null); // cancel editing item
          }
        });
      },

      onMoving: function (item, callback) {
        if (item.start < min) item.start = min;
        if (item.start > max) item.start = max;
        if (item.end   > max) item.end   = max;

        callback(item); // send back the (possibly) changed item
      },

      onUpdate: function (item, callback) {
        prettyPrompt('Update item', 'Edit items text:', item.content, function (value) {
          if (value) {
            item.content = value;
            callback(item); // send back adjusted item
          }
          else {
            callback(null); // cancel updating the item
          }
        });
      },

      onRemove: function (item, callback) {
        prettyConfirm('Remove item', 'Do you really want to remove item ' + item.content + '?', function (ok) {
          if (ok) {
            callback(item); // confirm deletion
          }
          else {
            callback(null); // cancel deletion
          }
        });
      }
    };



    // Create a Timeline
    const timeline = new Timeline(container, this.items, options);
    console.log("timeline",timeline)

    let app = this

    this.items.on('*', function (event, properties) {
      logEvent(event, properties);
      console.log(event, properties)
      let i = app.items.get(properties.items[0])
      console.log(i)
    });

    function logEvent(event, properties) {
      var log = document.getElementById('log');
      var msg = document.createElement('div');
      msg.innerHTML = 'event=' + JSON.stringify(event) + ', ' +
      'properties=' + JSON.stringify(properties);
      log.firstChild ? log.insertBefore(msg, log.firstChild) : log.appendChild(msg);
    }

    function prettyConfirm(title, text, callback) {
      // swal({
      //   title: title,
      //   text: text,
      //   type: 'warning',
      //   showCancelButton: true,
      //   confirmButtonColor: "#DD6B55"
      // }, callback);
      console.log({
        title: title,
        text: text,
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: "#DD6B55"
      }, callback);
    }

    function prettyPrompt(title, text, inputValue, callback) {
      // swal({
      //   title: title,
      //   text: text,
      //   type: 'input',
      //   showCancelButton: true,
      //   inputValue: inputValue
      // }, callback);
      console.log({
        title: title,
        text: text,
        type: 'input',
        showCancelButton: true,
        inputValue: inputValue
      }, callback);
    }


    setInterval(this.myTimer, 3000);


    // function myTimer() {
    //   const d = new Date();
    //   document.getElementById("demo").innerHTML = d.toLocaleTimeString();
    // }


  },
  methods: {
    myTimer(){
      const date = new Date();
      // let d = date.toISOString()
      //
      //
      // d= d.slice(0, 19)
      // console.log(d)
      //  2021-10-01T08:44
      //  2021-09-29T01:00:00
      document.getElementById("demo").innerHTML = date;
      this.items.add({ content: "item "+date , start: date, type: "point" })
    }
  }
}
</script>

<style>

</style>
