(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d216f1a"],{c52d:function(t,e,n){"use strict";n.r(e);var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("b-input-group",{scopedSlots:t._u([{key:"append",fn:function(){return[n("NetworkToolBar")]},proxy:!0}])},[n("b-form-input",{attrs:{id:"input",autofocus:"",title:"type three words followed by a comma",placeholder:"/h + Enter for help"},on:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.onEnter.apply(null,arguments)}},model:{value:t.main_input,callback:function(e){t.main_input=e},expression:"main_input"}})],1)},o=[],a=(n("d3b7"),n("3ca3"),n("ddb0"),n("498a"),n("fb6a"),n("ac1f"),n("1276"),n("159b"),n("2ca0"),n("8a79"),n("2b3d"),{name:"CommandInput",components:{NetworkToolBar:function(){return n.e("chunk-4060d866").then(n.bind(null,"2647"))}},data:function(){return{main_input:"",commandHistory:[]}},methods:{onEnter:function(){console.log(this.main_input);var t=this.main_input.trim();if(t.length>0){var e=this.getInputType(t);console.log("inputObject",e),this.$store.commit("ipgs/setInputObject",e),this.main_input=e.inputNew}},getInputType:function(t){var e={};if(this.isValidUrl(t))e.type="url",e.value=t,e.isFile=this.isFile(t);else{var n=t.charAt(0),i="";switch(n){case"/":e.type="commande",e.value=t,e.inputNew="";break;case".":i=this.commandHistory[this.commandHistory.length-1],e.inputNew=i.s+" "+i.p+" "+i.o;break;case";":i=this.commandHistory[this.commandHistory.length-1],e.inputNew=i.s+" "+i.p+" ";break;case",":i=this.commandHistory[this.commandHistory.length-1],e.inputNew=i.s+" ";break;default:e=this.traiteTriplet(t),this.catchTriplet(e)}}return e},traiteTriplet:function(t){var e={},n="",i=t.slice(-1),o=t.slice(0,-1).split(" "),a=!0,u="",s=[];switch(o.forEach((function(t){t=t.trim(),t.startsWith('"')?(u="debut",s.push(t.substr(1))):t.endsWith('"')?(u="fin",s.push(s.pop()+" "+t.slice(0,-1))):"debut"==u?s.push(s.pop()+" "+t):s.push(t)})),s.length>0&&(o=s),i){case".":n="";break;case";":n=o[0].indexOf(" ")>-1?'"'+o[0]+'" ':o[0]+" ";break;case",":n=o[0].indexOf(" ")>-1?'"'+o[0]+'" ':o[0]+" ",o[1].indexOf(" ")>-1?n+='"'+o[1]+'" ':n+=o[1]+" ";break;case"-":n=o[2].indexOf(" ")>-1?'"'+o[2]+'" ':o[2]+" ";break;default:console.log("message to chat "+t),n="",a=!1}if(a){e.type="triplet";var r={};r.subject=o[0],r.predicate=o[1],r.object=o[2],e.value=r,e.inputNew=n}else e.type="message",e.value=t,e.inputNew=n;return e},catchTriplet:function(t){console.log(t)},updateInput:function(t){document.getElementById("input").value=t||""},isFile:function(t){return t.split("/").pop().indexOf(".")>-1},isValidUrl:function(t){try{return new URL(t),!0}catch(e){return!1}}},watch:{commandInput:function(){console.log(this.commandInput),this.main_input=this.commandInput}},computed:{commandInput:{get:function(){return this.$store.state.ipgs.commandInput},set:function(){}}}}),u=a,s=n("2877"),r=Object(s["a"])(u,i,o,!1,null,null,null);e["default"]=r.exports}}]);
//# sourceMappingURL=chunk-2d216f1a.941374d9.js.map