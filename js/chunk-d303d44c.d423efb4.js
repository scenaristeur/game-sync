(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-d303d44c"],{"1d99":function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"text-center section"},[a("h2",{staticClass:"h2"},[t._v("Custom Calendars")]),a("p",{staticClass:"text-lg font-medium text-gray-600 mb-6"},[t._v(" Roll your own calendars using scoped slots ")]),t._v(" Options : "+t._s(t.options)+" "),a("v-calendar",{staticClass:"custom-calendar max-w-full",attrs:{masks:t.masks,attributes:t.attributes,"disable-page-swipe":"","is-expanded":""},scopedSlots:t._u([{key:"day-content",fn:function(e){var s=e.day,n=e.attributes;return[a("div",{staticClass:"flex flex-col h-full z-10 overflow-hidden"},[a("b-button",{staticClass:"day-label text-sm text-gray-900",attrs:{variant:"outline-primary",size:"sm"},on:{click:function(e){return t.create(s)}}},[t._v(t._s(s.day))]),a("div",{staticClass:"flex-grow overflow-y-auto overflow-x-auto"},t._l(n,(function(e){return a("p",{key:e.key,staticClass:"brd text-xs leading-tight rounded-sm p-1 mt-0 mb-1",class:e.customData.class,on:{click:function(a){return t.showDetail(e)}}},[t._v(" "+t._s(e.customData.title)+" ")])})),0)],1)]}}])}),a("v-calendar",{attrs:{attributes:t.attributes1}}),null!=t.detail?a("b-modal",{attrs:{id:"detail",size:"xl",title:t.detail.customData.title}},[a("hr"),t._v(" start: "+t._s(t.detail.customData.start.toLocaleDateString())+" "),void 0!=t.detail.customData.start?a("span",[t._v(t._s(t.detail.customData.start.toLocaleTimeString()))]):t._e(),t._v(" "),a("br"),t._v(" end: "+t._s(t.detail.customData.end.toLocaleDateString())+" "),void 0!=t.detail.customData.end?a("span",[t._v(t._s(t.detail.customData.end.toLocaleTimeString()))]):t._e(),a("br"),a("br"),a("EventCreation",{attrs:{detail:t.detail,debug:t.debug}})],1):t._e(),a("b-button",{on:{click:function(e){t.debug=!t.debug}}},[t._v("debug")]),t.debug?a("div",[t._v(" "+t._s(t.attributes))]):t._e()],1)},n=[],r=a("1da1");function i(t,e,a){return e in t?Object.defineProperty(t,e,{value:a,enumerable:!0,configurable:!0,writable:!0}):t[e]=a,t}var o=a("668b"),c=(a("96cf"),a("d3b7"),a("3ca3"),a("ddb0"),a("159b"),{name:"CalendarTop",components:{EventCreation:function(){return a.e("chunk-60ebc6d0").then(a.bind(null,"3cd7"))}},data:function(){var t=(new Date).getMonth(),e=(new Date).getFullYear();return{debug:!1,detail:{customData:{start:new Date,end:new Date}},masks:{weekdays:"WWW"},attributes1:[{highlight:!0,dot:!0,bar:!0,content:"red",popover:{},customData:{title:"swing"},dates:new Date,excludeDates:null,order:0},{dot:"red",dates:{start:new Date(e,t,1),monthlyInterval:2,ordinalWeekdays:i({},-1,6)}},{bar:!0,dates:{start:new Date(e,t,4,12,2,24),end:new Date(e,t,5,12,2,30)},customData:{title:"Range is cool"}}],attributes:[{bar:!0,dates:{start:new Date(e,t,4,12,2,24),end:new Date(e,t,5,12,2,30)},customData:{title:"Range is cool"}},{highlight:!0,dot:!0,bar:!0,content:"red",popover:{},customData:{title:"swing"},dates:new Date,excludeDates:null,order:0},{key:1,customData:{title:"Lunch with mom.",class:"bg-danger text-light"},dates:new Date(e,t,1,12,2,24)},{key:2,customData:{title:"Range Take Noah to basketball practice"},dates:{start:new Date(e,t,1,12,2,24),end:new Date(e,t,1,12,2,30)}},{key:3,customData:{title:"Noah's basketball game."},dates:new Date(e,t,5)},{key:4,customData:{title:"Take car to the shop"},dates:new Date(e,t,5)},{key:4,customData:{title:"Meeting with new client."},dates:new Date(e,t,7)},{key:5,customData:{title:"Mia's gymnastics practice."},dates:new Date(e,t,11)},{key:6,customData:{title:"Cookout with friends."},dates:{months:5,ordinalWeekdays:{2:1}}},{key:7,customData:{title:"Mia's gymnastics recital."},dates:new Date(e,t,22)},{key:8,customData:{title:"Visit great grandma."},dates:new Date(e,t,25)}],options:[{text:"Agora",value:{name:"agora",url:"https://agora.solidcommunity.net/public/"}}]}},created:function(){var t=this;return Object(r["a"])(regeneratorRuntime.mark((function e(){var a,s,n,r,i,c;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:a=!1,s=!1,e.prev=2,r=Object(o["a"])(t.options);case 4:return e.next=6,r.next();case 6:if(!(a=!(i=e.sent).done)){e.next=14;break}return c=i.value,e.next=10,t.$exploreEvents(c);case 10:c.eventResources=e.sent;case 11:a=!1,e.next=4;break;case 14:e.next=20;break;case 16:e.prev=16,e.t0=e["catch"](2),s=!0,n=e.t0;case 20:if(e.prev=20,e.prev=21,!a||null==r.return){e.next=25;break}return e.next=25,r.return();case 25:if(e.prev=25,!s){e.next=28;break}throw n;case 28:return e.finish(25);case 29:return e.finish(20);case 30:console.log(t.options);case 31:case"end":return e.stop()}}),e,null,[[2,16,20,30],[21,,25,29]])})))()},methods:{create:function(t){var e={dates:t.date,customData:{title:"New Event"+Date.now(),start:t.range.start,end:t.range.end}};this.detail=e,this.$bvModal.show("detail")},showDetail:function(t){console.log(t),this.detail=t,this.$bvModal.show("detail")}},watch:{events:function(){var t=this;this.events.forEach((function(e){console.log(e),t.attributes.push(e)}))}},computed:{events:{get:function(){return this.$store.state.events.events},set:function(){}}}}),l=c,u=(a("96cfa"),a("2877")),d=Object(u["a"])(l,s,n,!1,null,"26e6118b",null);e["default"]=d.exports},"3d95":function(t,e,a){},"96cfa":function(t,e,a){"use strict";a("3d95")}}]);
//# sourceMappingURL=chunk-d303d44c.d423efb4.js.map