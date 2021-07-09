import {
  getSolidDataset,
  // getThingAll,
  // getFile,
  // isRawData,
  // getContentType,
  // saveFileInContainer,
  getContainedResourceUrlAll,
  // getStringNoLocaleAll,
  // //createContainerAt,
  // getSourceUrl,
  // deleteFile,
  // removeAll,
  // removeStringNoLocale,
  // deleteContainer,
  // addStringNoLocale,
  // setThing,
  // saveSolidDatasetAt,
  // createSolidDataset,
  // createThing,
  // addUrl,
  // overwriteFile,
  // getStringNoLocale,
  // getThing,
  // getUrlAll,
  // getUrl,
  // //  addDatetime,
  // setUrl,
  // setStringNoLocale,
  //setDatetime
} from "@inrupt/solid-client";
// import { FOAF, /*LDP,*/ VCARD,/*  RDF,*/ AS  } from "@inrupt/vocab-common-rdf";
// import { WS, /*, VCARD */} from "@inrupt/vocab-solid-common";
import * as sc from '@inrupt/solid-client-authn-browser'



const plugin = {
  install(Vue, opts = {}) {
    let store = opts.store
    let sockets = []
    console.log(store)

    Vue.prototype.$explore = async function(path){
      this.$subscribe(path)
      if(path.url.endsWith('/')){
        this.$readContainer(path)
      }else{
        this.$readResource(path)
      }
      //  this.$subscribe(path)
    },

    Vue.prototype.$read = async function(path){
      console.log("$read", path)
      if(path.url.endsWith('/')){
        this.$readContainer(path)
      }else{
        this.$readResource(path)
      }
    },

    Vue.prototype.$subscribe = async function(path){
      console.log("$subscribe", path)
      let url = path.url
      let app = this
      var wss = "wss://"+url.split('/')[2];
      let socket = sockets[wss]
      if (socket == null){
        //let socket = new WebSocket(websocket, ['solid.0.1.0']);
        socket = new WebSocket(wss, ['solid-0.1']);
        console.log("new socket",socket)
        sockets[wss] = socket
      }


      socket.onopen = function() {
        //console.log("socket open")
        this.send('sub '+url);
        //console.log("socket sub to "+app.log)
      };
      socket.onmessage = async function(msg) {
        //  console.log("message",msg)
        if (msg.data && msg.data.slice(0, 3) === 'pub') {
          //  console.log(msg)
          console.log(msg.data)
          if(url.endsWith('/')){
            let container =  await app.$readContainer({url: url, subscribe: true})
            console.log(sockets)
            container.resources.forEach((r) => {
              this.send('sub '+r);
            });


          }else{
            app.$readResource({url: url, subscribe: true})
          }
        }
      };
    },
    Vue.prototype.$readContainer = async function(path){
      let containerUrl = path.url
      const myDataset = await getSolidDataset( containerUrl, {fetch: sc.fetch});
      console.log(myDataset)

      let resources = await getContainedResourceUrlAll(myDataset,{fetch: sc.fetch} )
      console.log("Resources", resources)
      let container = {url: containerUrl, resources: resources}
       store.commit('gamesync/setGameContainer', container)
      // for await (let r of resources){
      //   await  this.$subscribe({url: r, subscribe: true})
      // }
      return container

    },

    Vue.prototype.$readResource = async function(path){
      console.log("read resource", path)
    }
  }
}

// Auto-install
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin)
}

export default plugin
