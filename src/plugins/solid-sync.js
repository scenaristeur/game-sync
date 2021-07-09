import {
  getSolidDataset,
  getThingAll,
  // getFile,
  // isRawData,
  // getContentType,
  // saveFileInContainer,
  getContainedResourceUrlAll,
  getStringNoLocaleAll,
  // //createContainerAt,
  // getSourceUrl,
  deleteFile,
  // removeAll,
  removeStringNoLocale,
  deleteContainer,
  addStringNoLocale,
  setThing,
  saveSolidDatasetAt,
  createSolidDataset,
  createThing,
  addUrl,
  // overwriteFile,
  getStringNoLocale,
  getThing,
  getUrlAll,
  getUrl,
  // //  addDatetime,
  // setUrl,
  // setStringNoLocale,
  //setDatetime
} from "@inrupt/solid-client";
import { FOAF, /*LDP,*/ VCARD,/*  RDF,*/ AS  } from "@inrupt/vocab-common-rdf";
import { WS, /*, VCARD */} from "@inrupt/vocab-solid-common";
import * as sc from '@inrupt/solid-client-authn-browser'
import router from '@/router'
import {
  WebsocketNotification,
} from "@inrupt/solid-client-notifications";
// import * as jsonld from 'jsonld';


const plugin = {
  install(Vue, opts = {}) {
    let store = opts.store
    let ws = {}
    var socket = null
    var server = null

    Vue.prototype.$subscribe = async function(resourceURL, svr = 'nss'){
      server = svr
      if (resourceURL.endsWith('/')){
        await this.$readContainer(resourceURL)
      }
      switch (server) {
        case 'ess':
        this.$subscribeEss(resourceURL, server)
        break;
        default:
        this.$subscribeNss(resourceURL, server)
      }

    }



    Vue.prototype.$subscribeNss = async function(url){
      console.log("subsub")
      let app = this
      if (socket == null){
        var wss = "wss://"+url.split('/')[2];
        //let socket = new WebSocket(websocket, ['solid.0.1.0']);
        socket = new WebSocket(wss, ['solid-0.1']);
      }

      //  var socket = new WebSocket('wss://solidweb.org');

      console.log(socket)
      socket.onopen = function() {
        console.log("socket open")
        this.send('sub '+url);
        //console.log("socket sub to "+app.log)
      };
      socket.onmessage = function(msg) {
        console.log("message",msg)
        if (msg.data && msg.data.slice(0, 3) === 'pub') {
          //  console.log(msg)
          console.log(msg.data)
          app.$update(url)
          // resource updated, refetch resource
        }
      };
    },

    Vue.prototype.$update = async function(url){
      console.log("update de",url )
      if (url.endsWith('/')){
        await this.$readContainer(url)
      }
    },

    Vue.prototype.$refresh = async function(containerUrl){
      console.log(ws)

      for await (let key of Object.keys(ws)){
        console.log(`${key} : ${ws[key]}`);
        await ws[key].disconnect()
        delete ws[key]

      }
      console.log(ws)
      this.$subscribe(containerUrl)
      // Object.keys(ws).forEach(async function(key){
      //   console.log(`${key} : ${ws[key]}`);
      //   await ws[key].disconnect()
      //   delete ws[key]
      //     console.log(ws)
      // });

      //ws = {}
    },

    Vue.prototype.$subscribeEss = async function(resourceURL){

      if (ws[resourceURL] == undefined){
        const gateway = "https://notification.pod.inrupt.com/";
        let websocket = new WebsocketNotification(
          resourceURL,
          { fetch: sc.fetch, gateway }
        )

        console.log("Subscription to", resourceURL)
        websocket.on("connected", () =>
        {
          //console.log("connected", websocket)
          console.log(ws)
          ws[resourceURL] = websocket
        }
        // setMessages((prev) => [
        //   ...prev,
        //   `Websocket connected; watching ${podRoot}`,
        // ])
      );

      websocket.on("message", (message) =>
      {
        console.log('message', JSON.parse(message))
        store.commit('gamesync/newMessage', message)
        if (resourceURL.endsWith('/')){
          this.$readContainer(resourceURL)
        }else{
          this.$read(resourceURL)
        }
      }
      // setMessages((prev) => [...prev, formatMessage(message)])
    );

    websocket.on("closed", () =>{
      console.log("websocket closed",websocket.topic)

      //console.log(ws)
    }
    //  setMessages((prev) => [...prev, "Websocket closed"])
  );

  websocket.on("error", (error) => {
    /* eslint no-console: 0 */
    console.error(error);
    // setMessages((prev) => [
    //   ...prev,
    //   "Websocket error (see console for details)",
    // ]);
  });

  // websocket.on("message", console.log);
  //websocket.on("*", console.log);
  // websocket.on("connect", console.log);
  // websocket.on("CREATE", console.log);

  try {
    await websocket.connect();

  }
  catch(e){
    console.log(e)
  }

}
},

Vue.prototype.$readContainer = async function(containerUrl){


  const myDataset = await getSolidDataset( containerUrl, {fetch: sc.fetch});
  console.log(myDataset)

  let resources = await getContainedResourceUrlAll(myDataset,{fetch: sc.fetch} )
  console.log("Resources", resources)
  let container = {url: containerUrl, resources: resources}
  store.commit('gamesync/setGameContainer', container)
  for await (let r of resources){
    await  this.$subscribe(r)
  }

},

Vue.prototype.$read = async function(url){

  let ds =  await getSolidDataset(url, {fetch: sc.fetch})

  let thing = await getThingAll(ds)[0]

  getStringNoLocaleAll
  let updates = await getStringNoLocaleAll(thing, AS.content);
  let game = {url: url, updates : updates}
  store.commit('gamesync/setGame', game)
},

Vue.prototype.$changeGame = async function(g, action){
  let ds =  await getSolidDataset(g.url, {fetch: sc.fetch})
  console.log(ds)
  let date = new Date().toISOString()
  //    let name = g.url.split("#")[1]
  //  console.log("get thing", name)
  let thing = await getThingAll(ds)[0]
  console.log(thing)
  //  thing = addStringNoLocale(thing, AS.updated, date);
  thing = addStringNoLocale(thing, AS.content, action+"_"+date);
  let thingInDs = setThing(ds, thing);
  let savedThing  = await saveSolidDatasetAt(g.url, thingInDs, { fetch: sc.fetch } );
  console.log("File saved",savedThing);
  // console.log(g)
},

Vue.prototype.$remove = async function (g, action){
  let ds =  await getSolidDataset(g.url, {fetch: sc.fetch})
  console.log(ds)
  //let date = new Date().toISOString()
  //    let name = g.url.split("#")[1]
  //  console.log("get thing", name)
  let thing = await getThingAll(ds)[0]
  console.log(thing)
  thing = removeStringNoLocale(thing, AS.content, action)
  let thingInDs = setThing(ds, thing);
  let savedThing  = await saveSolidDatasetAt(g.url, thingInDs, { fetch: sc.fetch } );
  console.log("File saved",savedThing);
  this.$read(g.url)
},

Vue.prototype.$create = async function(path){
  //  console.log("websocket",websocket)
  let date = new Date()
  let name = Date.now();
  let url = path+name+'.ttl'
  console.log("creating", url)
  let ds = await createSolidDataset()
  let thing = await createThing({name: name})
  console.log("create", thing)
  // thing = addUrl(thing, RDF.type, AS.Note);
  // thing = addStringNoLocale(thing, AS.name, n.title);
  // thing = addStringNoLocale(thing, AS.content, n.text);
  //  n.url != undefined ? thing = addUrl(thing, AS.url, n.url ) : ""
  thing = addUrl(thing, AS.actor, store.state.solid.pod.webId );
  thing = addStringNoLocale(thing, AS.published, date.toISOString());
  let thingInDs = setThing(ds, thing);
  let savedThing  = await saveSolidDatasetAt(path+name+'.ttl', thingInDs, { fetch: sc.fetch } );
  return savedThing
},

Vue.prototype.$login= async function(issuer) {

  try{
    await sc.login({
      oidcIssuer: issuer,
      redirectUrl: window.location.href,
      clientName: "GameSync",
    });
  } catch(e){
    alert("$login "+e)
  }
},

Vue.prototype.$logout = async function(params){
  try{
    let session = sc.getDefaultSession()
    console.log(params)
    await session.logout()
    store.commit('solid/setSession',session)
    store.commit('solid/setPod', {})
    //  store.commit('booklice/setPath', "")
  } catch(e){
    alert("$logout "+e)
  }
},

Vue.prototype.$checkSessions = async function( params){
  console.log("params",params)
  console.log("window.location.href", window.location.href)
  let session = sc.getDefaultSession()
  console.log("session",session)

  //  let session = sc.getDefaultSession()
  sc.onSessionRestore((url) => {
    console.log("restore",url)
    let query = url.split('?')[1]
    console.log('query', query)
    // const p = new URLSearchParams(url);
    // //  if(p.length>0){
    // console.log("params Params", p.values)
    //}

    //  alert ("url",url)
    router.push({path: '?'+query})
    store.commit('solid/setSession',session)
    //  dispatch('getPodInfos', session)
    this.$getPodInfosFromSession(session)
  });


  try{
    await sc.handleIncomingRedirect({restorePreviousSession : params.restore, url: window.location.href})
    .then((info) => {
      console.log(info)
    })
    store.commit('solid/setSession',session)
    //  dispatch('getPodInfos', session)
    this.$getPodInfosFromSession(session)

  } catch(e){
    alert("$checkSessions " +e)
  }
},

Vue.prototype.$getPodInfosFromSession = async function(session){
  try{
    let pod = {}
    pod.logged = session.info.isLoggedIn
    if (pod.logged) {
      pod.webId = session.info.webId
      pod = await this.$getPodInfos(pod)
      store.commit('solid/setPod', pod)
      if (pod.storage != null){
        //  this.$setCurrentThingUrl(pod.storage)
        //  store.commit('booklice/setPath', pod.storage+'public/bookmarks/')
        //let publicTagFile = pod.storage+'public/tags.ttl'
        //let privateTagFile = podStorage+'private/tags.ttl'
        // let tags = await this.$getTags(publicTagFile)
        // console.log("############################tags",tags)
      }
    }else{
      store.commit('solid/setPod', null)
      store.commit('solid/setThings', [])
    }
  } catch(e){
    alert("$getPodInfosFromSession "+e)
  }
},

Vue.prototype.$getPodInfos = async function(pod){
  try{
    const dataset = await getSolidDataset( pod.webId, { fetch: sc.fetch });
    console.log("DATASET", dataset)
    let profile = await getThing( dataset, pod.webId );
    pod.name = await getStringNoLocale(profile, FOAF.name);
    pod.friends = await getUrlAll(profile, FOAF.knows).map(webId => {return {webId: webId}})
    pod.storage = await getUrl(profile, WS.storage);
    pod.photo = await getUrl(profile, VCARD.hasPhoto);
    // pod.publicTags = await this.$getTags(pod.storage+'public/tags.ttl')
    // store.commit("vatch/addToNetwork", pod.publicTags)
    //this.$subscribe(pod.storage)
    console.log("getpodinfos",pod)
  }catch(e)
  {
    console.log("erreur",e, pod)
  }
  return await pod
},
Vue.prototype.$deleteOnPod = async function(url){
  try{
    if(url.endsWith('/')){
      await deleteContainer(
        url, { fetch: sc.fetch }
      );
    }
    else{
      await deleteFile(
        url, { fetch: sc.fetch }
      );

    }
    console.log(" deleted !",url);
    ws[url].disconnect()
    //  let parent = url.slice(0, url.lastIndexOf('/'))+'/';
    //  console.log("parent",parent)
    //this.$setCurrentThingUrl(parent)
  } catch(e){
    alert(e)
  }
}
}
}
// Auto-install
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin)
}

export default plugin
