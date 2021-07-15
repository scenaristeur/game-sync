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
import { WS } from "@inrupt/vocab-solid-common";
import * as sc from '@inrupt/solid-client-authn-browser'

/* TODO
CRUD container
CRUD resource
CRUD level
CRUD acl
CRUD node
CRUD edge

*/

const plugin = {
  install(Vue, opts = {}) {
    let store = opts.store
    let sockets = []
    console.log(store)

    Vue.prototype.$create = async function(chose){
      //  console.log("websocket",websocket)
      //       {
      //   "@context": "https://www.w3.org/ns/activitystreams",
      //   "summary": "Martin created an image",
      //   "type": "Create",
      //   "actor": "http://www.test.example/martin",
      //   "object": "http://example.org/foo.jpg"
      // }
      let date = new Date()
      let name = chose.name || Date.now();
      let path = chose.url
      let url = path+name+'.ttl'
      console.log("creating", url)
      let ds = await createSolidDataset()
      let thing = await createThing({name: name})
      console.log("create", thing)
      // thing = addUrl(thing, RDF.type, AS.Note);
      thing = addStringNoLocale(thing, AS.name, name);
      // thing = addStringNoLocale(thing, AS.content, n.text);
      //  n.url != undefined ? thing = addUrl(thing, AS.url, n.url ) : ""
      thing = addUrl(thing, AS.actor, store.state.solid.pod.webId );
      thing = addStringNoLocale(thing, AS.published, date.toISOString());
      let thingInDs = setThing(ds, thing);
      let savedThing  = await saveSolidDatasetAt(path+name+'.ttl', thingInDs, { fetch: sc.fetch } );
      return savedThing
    },

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
          let res = msg.data.slice(4);
          console.log(res)
          if(res.endsWith('/')){
            console.log("readcont",res)
            let container =  await app.$readContainer({url: res, subscribe: true})
            //console.log(sockets)
            container.resources.forEach((r) => {
              this.send('sub '+r);
            });
          }else{
            console.log("must $readResource", res)
            await app.$readResource({url: res, subscribe: true})
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
      return container
    },

    Vue.prototype.$readResource = async function(chose){
      console.log("$readResource", chose)
      let url = chose.url

      let ds =  await getSolidDataset(url, {fetch: sc.fetch})

      let thing = await getThingAll(ds)[0]
      let updates = await getStringNoLocaleAll(thing, AS.content);
      let game = {url: url, updates : updates}
      console.log("Game",game)
      store.commit('gamesync/setGame', game)
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
        //  router.push({path: '?'+query})
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

    Vue.prototype.$changeGame = async function(g, action){
      //premiers tests
      let ds =  await getSolidDataset(g.url, {fetch: sc.fetch})
      console.log(ds)
      let date = new Date().toISOString()
      //    let name = g.url.split("#")[1]
      //  console.log("get thing", name)
      let thing = await getThingAll(ds)[0]
      console.log(thing)
      //  thing = addStringNoLocale(thing, AS.updated, date);
      action.date = date
      thing = addStringNoLocale(thing, AS.content, JSON.stringify(action));
      let thingInDs = setThing(ds, thing);
      let savedThing  = await saveSolidDatasetAt(g.url, thingInDs, { fetch: sc.fetch } );
      console.log("File saved",savedThing);

      // {
      //   "@context": "https://www.w3.org/ns/activitystreams",
      //   "summary": "Martin added an article to his blog",
      //   "type": "Add",
      //   "published": "2015-02-10T15:04:55Z",
      //   "actor": {
      //    "type": "Person",
      //    "id": "http://www.test.example/martin",
      //    "name": "Martin Smith",
      //    "url": "http://example.org/martin",
      //    "image": {
      //      "type": "Link",
      //      "href": "http://example.org/martin/image.jpg",
      //      "mediaType": "image/jpeg"
      //    }
      //   },
      //   "object" : {
      //    "id": "http://www.test.example/blog/abc123/xyz",
      //    "type": "Article",
      //    "url": "http://example.org/blog/2011/02/entry",
      //    "name": "Why I love Activity Streams"
      //   },
      //   "target" : {
      //    "id": "http://example.org/blog/",
      //    "type": "OrderedCollection",
      //    "name": "Martin's Blog"
      //   }
      // }

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
      //this.$read(g)
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
          //  store.commit('solid/setThings', [])
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
        //  console.log("getpodinfos",pod)
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
        //  ws[url].disconnect()
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
