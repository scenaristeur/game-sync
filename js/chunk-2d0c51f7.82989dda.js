(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0c51f7"],{"3e6e":function(t,e,n){"use strict";n.r(e);var o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("b-modal",{attrs:{id:"modal-mention-selector",title:t.mentionTarget.name},on:{ok:t.update}},[n("i",[t._v(" should separate this part in two : ading props/adding links")]),n("b",[t._v("For the moment, you MUST edit the content of the note to update these mentions !")]),n("div",[n("b-tabs",{attrs:{"content-class":"mt-3"}},[n("IdentifiantSelector",{attrs:{categorie:"Actors",active:"active",items:t.mentionTarget.actors}}),n("IdentifiantSelector",{attrs:{categorie:"Actions",items:t.mentionTarget.actions}}),n("IdentifiantSelector",{attrs:{categorie:"Objects",items:t.mentionTarget.objects}}),n("IdentifiantSelector",{attrs:{categorie:"Contexts",description:"(optional) Contexts, Conditions, Constraints",items:t.mentionTarget.contexts}})],1)],1)])},i=[],a=(n("d3b7"),n("3ca3"),n("ddb0"),{name:"MentionSelector",data:function(){return{}},components:{IdentifiantSelector:function(){return n.e("chunk-2d2244a2").then(n.bind(null,"e001"))}},methods:{update:function(){console.log(this.mentionTarget)}},computed:{pod:{get:function(){return this.$store.state.solid.pod},set:function(){}},mentionTarget:{get:function(){return this.$store.state.wiki.mentionTarget},set:function(){}}}}),s=a,r=n("2877"),c=Object(r["a"])(s,o,i,!1,null,null,null);e["default"]=c.exports}}]);
//# sourceMappingURL=chunk-2d0c51f7.82989dda.js.map