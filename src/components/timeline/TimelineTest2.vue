<template>
  <div>
    Timeline

    <div id="demo">demo</div>

    <div id="visualization" ref="visualization"></div>
    <div id="log">log</div>
  </div>
</template>

<script>
import { DataSet, Timeline } from "vis-timeline/standalone/umd/vis-timeline-graph2d.min.js";
import "vis-timeline/styles/vis-timeline-graph2d.css";

export default {
  name: "TimelineTest",
  data() {
    return {
      groups: [
        {
          id: 0,
          content: "Group 1"
        }
      ],
      items: new DataSet([
        {id: 1, content: 'item 1', start: '2014-04-20'},
        {id: 2, content: 'item 2', start: '2014-04-14'},
        {id: 3, content: 'item 3', start: '2014-04-18'},
        {id: 4, content: 'item 4', start: '2014-04-16', end: '2014-04-19'},
        {id: 5, content: 'item 5', start: '2014-04-25'},
        {id: 6, content: 'item 6', start: '2014-04-20', type: 'point'}
      ]),
      options: {
        editable: true,

        template: function (item, element, data) {
          return '<h1>' + item.header + data.moving?' '+ data.start:'' + '</h1><p>' + item.description + '</p>';
        },
        onMoving: function (item, callback) {
          item.moving = true;
          callback()
        }

      }
    };
  },
  mounted(){
    //  var min = new Date(2021, 9, 15); // 1 april
    //  var max = new Date(2021, 10, 30, 23, 59, 59);
    // DOM element where the Timeline will be attached
    const container = document.getElementById("visualization");

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
        // if (item.start < min) item.start = min;
        // if (item.start > max) item.start = max;
        // if (item.end   > max) item.end   = max;
        console.log(item)
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
    console.log("timeline",timeline, this.items)

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


    //setInterval(this.myTimer, 3000);


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
