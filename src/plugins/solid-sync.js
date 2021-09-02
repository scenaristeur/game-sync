import {
  getSolidDataset,
  getThingAll,
  //getPublicAccess,
  //  getAgentAccess,
  getSolidDatasetWithAcl,
  getPublicAccess,
  getAgentAccess,
  // getFile,
  // isRawData,
  // getContentType,
  // saveFileInContainer,
  getContainedResourceUrlAll,
  getStringNoLocaleAll,
  // //createContainerAt,
  // getSourceUrl,
  deleteFile,
  removeThing,
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

  setUrl,
  setStringNoLocale,
  setDecimal,
  setInteger,
  //  getDecimal,
  getInteger
  //setDatetime
} from "@inrupt/solid-client";
import { FOAF, /*LDP,*/ VCARD, RDF, AS, RDFS  } from "@inrupt/vocab-common-rdf";
import { WS } from "@inrupt/vocab-solid-common";
import * as sc from '@inrupt/solid-client-authn-browser'


const IPGS = {
  base: "https://scenaristeur.github.io/ipgs#",
  id: "https://scenaristeur.github.io/ipgs#id",
  label: "https://scenaristeur.github.io/ipgs#label",
  Node: "https://scenaristeur.github.io/ipgs#Node",
  Edge: "https://scenaristeur.github.io/ipgs#Edge",
  shape: "https://scenaristeur.github.io/ipgs#shape",
  backgroundColor: "https://scenaristeur.github.io/ipgs#backgroundColor",
  borderColor: "https://scenaristeur.github.io/ipgs#borderColor",
  cid: "https://scenaristeur.github.io/ipgs#cid",
  x: "https://scenaristeur.github.io/ipgs#x",
  y: "https://scenaristeur.github.io/ipgs#y",
  z: "https://scenaristeur.github.io/ipgs#z",
  properties: "https://scenaristeur.github.io/ipgs#properties",
  updates: "https://scenaristeur.github.io/ipgs#updates",
  from: "https://scenaristeur.github.io/ipgs#from",
  to: "https://scenaristeur.github.io/ipgs#to"
}

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
    //    console.log(store)

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
      let comment = "Open this file with https://scenaristeur.github.io/game-sync?url="+url
      console.log("creating", url)
      let ds = await createSolidDataset()
      let thing = await createThing({name: name})
      console.log("create", thing)
      // thing = addUrl(thing, RDF.type, AS.Note);
      thing = addStringNoLocale(thing, AS.name, name);
      thing = addStringNoLocale(thing, RDFS.comment, comment);
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
      let mainThing = url.substring(url.lastIndexOf('/') + 1).split('.ttl')[0]
      console.log(mainThing)
      let thing = await getThing(ds,url+"#"+mainThing) //await getThingAll(ds)[0]
      let updates = await getStringNoLocaleAll(thing, AS.content);
      let thingsTemp = await getThingAll(ds)
      let network = {nodes: [], edges: []}
      for await (const t of thingsTemp){
        //console.log(t.url, t)
        let id = await getStringNoLocale(t, IPGS.id);
        let type = await getUrl(t, RDF.type);
        let label = await getStringNoLocale(t, IPGS.label);
        //console.log(type)
        let oneThing = {id: id, url: t.url, type: type, label: label}
        let properties = await getStringNoLocale(t, IPGS.properties)
      //  console.log("props", properties, typeof properties)
        if (typeof `${properties}` == "string"){
          try{
            oneThing.properties = JSON.parse(`${properties}`)
          }catch(e){
            console.info(e,`${properties}`)
          }
        }
        if(type != null && type == IPGS.Node){
          oneThing.color = {}
          oneThing.type = type.replace(IPGS.base, '')
          oneThing.shape = await getStringNoLocale(t, IPGS.shape);
          //suppression pour reorganisation auto
          // oneThing.x = await getDecimal(t, IPGS.x)
          // oneThing.y = await getDecimal(t, IPGS.y)
          // oneThing.z = await getDecimal(t, IPGS.z)
          oneThing.cid = await getInteger(t, IPGS.cid)
          oneThing.color.background = await getStringNoLocale(t, IPGS.backgroundColor)
          oneThing.color.border = await getStringNoLocale(t, IPGS.borderColor)

          let updates = await getStringNoLocale(t, IPGS.updates)
          oneThing.updates = JSON.parse(`${updates}`)
          network.nodes.push(oneThing)
        }else if (type != null && type == IPGS.Edge){
          oneThing.type = type.replace(IPGS.base, '')
          let fromTemp = await getUrl(t, IPGS.from);
          let toTemp = await getUrl(t, IPGS.to);
          if (fromTemp.startsWith(url)){
            oneThing.from = fromTemp.replace(url,'')
          }else{
            oneThing.from = fromTemp
          }
          if (toTemp.startsWith(url)){
            oneThing.to = toTemp.replace(url,'')
          }else{
            oneThing.to = toTemp
          }
          network.edges.push(oneThing)
        }else{
          console.log("type unknown", type)
        }
      }

    //  console.log('network',network)


      let game = {url: url, updates : updates, network: network}
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

    Vue.prototype.$addNode = async function(g,action){
      //  console.log("todo add node",g,action)
      let node = action.node
      let ds =  await getSolidDataset(g.url, {fetch: sc.fetch})
      //  console.log(ds)
      let thing = await createThing({name: node.id})
      //  console.log("create", thing)

      // activitystreams
      thing = setUrl(thing, RDF.type, IPGS.Node);
      node.label != undefined ? thing = setStringNoLocale(thing, AS.name, node.label): ""

      // ipgs /visjs
      thing = setStringNoLocale(thing, IPGS.id, node.id);
      node.label != undefined ? thing = setStringNoLocale(thing, IPGS.label, node.label): ""

      node.shape != undefined ? thing = setStringNoLocale(thing, IPGS.shape, node.shape) : ""
      node.x != undefined ? thing = setDecimal(thing, IPGS.x, node.x): ""
      node.y != undefined ? thing = setDecimal(thing, IPGS.y, node.y): ""
      node.z != undefined ? thing = setDecimal(thing, IPGS.z, node.z): ""
      node.color != undefined && node.color.background != undefined ? thing = setStringNoLocale(thing, IPGS.backgroundColor, node.color.background): ""
      node.color != undefined && node.color.border != undefined ? thing = setStringNoLocale(thing, IPGS.borderColor, node.color.border): ""
      node.cid != undefined ? thing = setInteger(thing, IPGS.cid, node.cid): ""
      node.properties != undefined ? thing = setStringNoLocale(thing, IPGS.properties, JSON.stringify(node.properties)) : ""
      thing = addStringNoLocale(thing, IPGS.updates, JSON.stringify(action))

      // thing = addStringNoLocale(thing, AS.content, n.text);
      //  n.url != undefined ? thing = addUrl(thing, AS.url, n.url ) : ""
      //  thing = addUrl(thing, AS.actor, store.state.solid.pod.webId );
      let thingInDs = setThing(ds, thing);
      let savedThing  = await saveSolidDatasetAt(g.url, thingInDs, { fetch: sc.fetch } );
      console.log("NODE ADDED ", savedThing)

      return savedThing

    },
    Vue.prototype.$updateNode = async function(g,action){
      console.log("todo update node",g,action)
      let node = action.node
      let ds =  await getSolidDataset(g.url, {fetch: sc.fetch})
      console.log(ds)
      let thing = await getThing( ds, g.url+node.id );
      thing = setUrl(thing, RDF.type, IPGS.Node);
      node.label != undefined ? thing = setStringNoLocale(thing, AS.name, node.label): ""

      // ipgs /visjs
      thing = setStringNoLocale(thing, IPGS.id, node.id);
      node.label != undefined ? thing = setStringNoLocale(thing, IPGS.label, node.label): ""

      node.shape != undefined ? thing = setStringNoLocale(thing, IPGS.shape, node.shape) : ""
      node.x != undefined ? thing = setDecimal(thing, IPGS.x, node.x): ""
      node.y != undefined ? thing = setDecimal(thing, IPGS.y, node.y): ""
      node.z != undefined ? thing = setDecimal(thing, IPGS.z, node.z): ""
      node.color != undefined && node.color.background != undefined ? thing = setStringNoLocale(thing, IPGS.backgroundColor, node.color.background): ""
      node.color != undefined && node.color.border != undefined ? thing = setStringNoLocale(thing, IPGS.borderColor, node.color.border): ""
      node.cid != undefined ? thing = setInteger(thing, IPGS.cid, node.cid): ""
      node.properties != undefined ? thing = setStringNoLocale(thing, IPGS.properties, JSON.stringify(node.properties)) : ""
      thing = addStringNoLocale(thing, IPGS.updates, JSON.stringify(action))

      // thing = addStringNoLocale(thing, AS.content, n.text);
      //  n.url != undefined ? thing = addUrl(thing, AS.url, n.url ) : ""
      //  thing = addUrl(thing, AS.actor, store.state.solid.pod.webId );
      let thingInDs = setThing(ds, thing);
      let savedThing  = await saveSolidDatasetAt(g.url, thingInDs, { fetch: sc.fetch } );
      console.log("NODE UPDATED ", savedThing)

      return savedThing

    },

    Vue.prototype.$addEdge = async function(g,action){
      console.log("adding Edge",g,action)
      let edge = action.edge
      let ds =  await getSolidDataset(g.url, {fetch: sc.fetch})
      // let thingFrom = edge.from.startsWith("#") ? await getThing( ds, g.url+edge.from ) : edge.from
      // let thingTo = edge.to.startsWith("#") ? await getThing( ds, g.url+edge.to ) : edge.to
      let thingFrom = await getThing( ds, g.url+edge.from )
      let thingTo = await getThing( ds, g.url+edge.to )
      thingFrom == null ? await createThing( ds, g.url+edge.from ) : ""
      thingTo == null ? await createThing( ds, g.url+edge.to ) : ""
      let thingEdge = await createThing({name: edge.id})
      //  console.log("create", thing)

      // activitystreams
      thingEdge = setUrl(thingEdge, RDF.type, IPGS.Edge);
      edge.label != undefined ? thingEdge = setStringNoLocale(thingEdge, AS.name, edge.label): ""
      // ipgs /visjs
      thingEdge = setStringNoLocale(thingEdge, IPGS.id, edge.id);
      edge.label != undefined ? thingEdge = setStringNoLocale(thingEdge, IPGS.label, edge.label): ""
      edge.from != undefined ? thingEdge = setUrl(thingEdge, IPGS.from, thingFrom): ""
      edge.to != undefined ? thingEdge = setUrl(thingEdge, IPGS.to, thingTo): ""


      edge.properties != undefined ? thingEdge = setStringNoLocale(thingEdge, IPGS.properties, JSON.stringify(edge.properties)) : ""
      thingEdge = addStringNoLocale(thingEdge, IPGS.updates, JSON.stringify(action))

      let thingInDs = setThing(ds, thingEdge);
      let savedThing  = await saveSolidDatasetAt(g.url, thingInDs, { fetch: sc.fetch } );
      console.log("Edge ADDED ", savedThing)

      return savedThing

    },
    Vue.prototype.$updateEdge = async function(g,action){
      console.log("todo add Edge",g,action)
      let edge = action.edge
      let ds =  await getSolidDataset(g.url, {fetch: sc.fetch})
      // let thingFrom = edge.from.startsWith("#") ? await getThing( ds, g.url+edge.from ) : edge.from
      // let thingTo = edge.to.startsWith("#") ? await getThing( ds, g.url+edge.to ) : edge.to
      let thingFrom =  await getThing( ds, g.url+edge.from )
      //  console.log(thingFrom)
      let thingTo = await getThing( ds, g.url+edge.to )
      //console.log(thingTo)
      let thingEdge = await getThing(ds, g.url+"#"+edge.id)
      //console.log(thingEdge)
      //  console.log("create", thing)

      // activitystreams
      thingEdge = setUrl(thingEdge, RDF.type, IPGS.Edge);
      edge.label != undefined ? thingEdge = setStringNoLocale(thingEdge, AS.name, edge.label): ""
      // ipgs /visjs
      thingEdge = setStringNoLocale(thingEdge, IPGS.id, edge.id);
      edge.label != undefined ? thingEdge = setStringNoLocale(thingEdge, IPGS.label, edge.label): ""
      edge.from != undefined ? thingEdge = setUrl(thingEdge, IPGS.from, thingFrom): ""
      edge.to != undefined ? thingEdge = setUrl(thingEdge, IPGS.to, thingTo): ""


      edge.properties != undefined ? thingEdge = setStringNoLocale(thingEdge, IPGS.properties, JSON.stringify(edge.properties)) : ""
      thingEdge = addStringNoLocale(thingEdge, IPGS.updates, JSON.stringify(action))

      let thingInDs = setThing(ds, thingEdge);
      let savedThing  = await saveSolidDatasetAt(g.url, thingInDs, { fetch: sc.fetch } );
      console.log("Edge Updated ", savedThing)

      return savedThing

    },
    Vue.prototype.$removeObjects = async function(g,action){
      console.log("todo remove",g,action)
      let objects = action.objects.nodes.concat(action.objects.edges)
      console.log(objects)
      let ds =  await getSolidDataset(g.url, {fetch: sc.fetch})


      for await(let o of objects){
        // default o starts with number or nothing particular an uuid for example (edge)
        let url = g.url+"#"+o
        // o starts with http (remote resource²)
        o.startsWith('http') ? url = o : ""
        // o starts with # (node)
        o.startsWith('#') ? url = g.url+o : ""

        let t = await getThing(ds, url)
        console.log("removing",t)
        ds = await removeThing(ds, url)

      }
      let savedDataset  = await saveSolidDatasetAt(g.url, ds, { fetch: sc.fetch } );
      console.log("saved dataset ", savedDataset)

      return savedDataset


    },
    // Vue.prototype.$deleteNode = async function(g,action){
    //   console.log("todo delete node",g,action)
    // },
    // Vue.prototype.$deleteEdge = async function(g,action){
    //   console.log("todo delete edge",g,action)
    // },

    Vue.prototype.$getPermissions = async function(url){
      let agent = store.state.solid.pod.webId
      console.log("url",url, agent)

      let permissions = {url: url}

      const myDatasetWithAcl = await getSolidDatasetWithAcl(url, {fetch: sc.fetch});
      const publicAccess = getPublicAccess(myDatasetWithAcl);
      console.log("publicAccess", publicAccess)
      permissions.publicAccess = publicAccess
      //const webId = "https://example.com/profile#webid";
      const myDatasetWithAclAgent = await getSolidDatasetWithAcl(url, {fetch: sc.fetch});
      console.log("ds", myDatasetWithAclAgent)
      const agentAccess = getAgentAccess(myDatasetWithAclAgent, agent, {fetch: sc.fetch});
      console.log("agentAccess", agent, agentAccess )
      permissions.agent = agent
      permissions.agentAccess = agentAccess
      // getPublicAccess(
      //   url,   // Resource
      //   { fetch: fetch }                  // fetch function from authenticated session
      // ).then(access => {
      //   if (access === null) {
      //     console.log("Could not load access details for this Resource.");
      //   } else {
      //     console.log("Returned Access:: ", JSON.stringify(access));
      //     console.log("Everyone", (access.read ? 'CAN' : 'CANNOT'), "read the Resource.");
      //     console.log("Everyone", (access.append ? 'CAN' : 'CANNOT'), "add data to the Resource.");
      //     console.log("Everyone", (access.write ? 'CAN' : 'CANNOT'), "change data in the Resource.");
      //     console.log("Everyone", (access.controlRead ? 'CAN' : 'CANNOT'), "see access to the Resource.");
      //     console.log("Everyone", (access.controlWrite ? 'CAN' : 'CANNOT'), "change access to the Resource.");
      //   }
      // })
      //
      //
      // getAgentAccess(
      //   url,       // resource
      //   agent,  // agent
      //   { fetch: fetch }                      // fetch function from authenticated session
      // ).then(access => {
      //   this.$logAccessInfo(agent, access, url);
      // });


      //
      // let permissions = {
      //   url: url,
      //   public: null,
      //   actor: null,
      // }
      // //    permissions.public = await getPublicAccess(url)
      // if (store.state.solid.pod != null){
      //   permissions.actor = getAgentAccess(url, store.state.solid.pod.webId)
      //   permissions.webId = store.state.solid.pod.webId
      // }
      //
      // console.log("permissions", permissions)
      return permissions
    },

    Vue.prototype.$getResourceInfos = async function(url){
      let infos = {}
      const ds = await getSolidDataset(url, {fetch: sc.fetch});
      let mainThing = url.substring(url.lastIndexOf('/') + 1).split('.ttl')[0]
      console.log(mainThing)
      let thing = await getThing(ds,url+"#"+mainThing) //await getThingAll(ds)[0]

      console.log(thing)
      infos.name =  getStringNoLocale(thing, AS.name, name);
      console.log("infos",infos)
      return infos
    },

    Vue.prototype.$updateGame = async function(g, action){
      console.log(g,action)
      action.actor = store.state.solid.pod != null ? store.state.solid.pod.webId : "unknown"
      switch (action.action) {
        case "addNode":
        await this.$addNode(g,action)
        break;
        case "updateNode":
        await this.$updateNode(g,action)
        break;
        case "addEdge":
        await this.$addEdge(g,action)
        break;
        case "updateEdge":
        await this.$updateEdge(g,action)
        break;
        case "removeObjects":
        await this.$removeObjects(g,action)
        break;
        // case "deleteNode":
        // await this.$deleteNode(g,action)
        // break;
        // case "deleteEdge":
        // await this.$deleteEdge(g,action)
        // break;
        default:
        console.log("action inconnue",g,action)
      }


    },




    Vue.prototype.$changeGame = async function(g, action){
      //premiers tests
      let ds =  await getSolidDataset(g.url, {fetch: sc.fetch})
      console.log(ds)
      let date = new Date().toISOString()
      //    let name = g.url.split("#")[1]
      //  console.log("get thing", name)
      //let thing = await getThingAll(ds)[0]
      let mainThing = g.url.substring(g.url.lastIndexOf('/') + 1).split('.ttl')[0]
      console.log(mainThing)
      let thing = await getThing(ds,g.url+"#"+mainThing) //await getThingAll(ds)[0]

      console.log(thing)
      //  thing = addStringNoLocale(thing, AS.updated, date);
      action.date = date
      thing = addStringNoLocale(thing, AS.content, JSON.stringify(action));
      let thingInDs = setThing(ds, thing);
      let savedThing  = await saveSolidDatasetAt(g.url, thingInDs, { fetch: sc.fetch } );
      console.log("File saved",savedThing);
      await this.$updateGame(g,action)
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
      //let thing = await getThingAll(ds)[0]
      let mainThing = g.url.substring(g.url.lastIndexOf('/') + 1).split('.ttl')[0]
      console.log(mainThing)
      let thing = await getThing(ds,g.url+"#"+mainThing) //await getThingAll(ds)[0]

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

    Vue.prototype.logAccessInfo = function(agent, access, resource){
      if (access === null) {
        console.log("Could not load access details for this Resource.");
      } else {
        console.log(`${agent}'s Access:: `, JSON.stringify(access));
        console.log("...", agent, (access.read ? 'CAN' : 'CANNOT'), "read the Resource", resource);
        console.log("...", agent, (access.append ? 'CAN' : 'CANNOT'), "add data to the Resource", resource);
        console.log("...", agent, (access.write ? 'CAN' : 'CANNOT'), "change data in the Resource", resource);
        console.log("...", agent, (access.controlRead ? 'CAN' : 'CANNOT'), "see access to the Resource", resource);
        console.log("...", agent, (access.controlWrite ? 'CAN' : 'CANNOT'), "change access to the Resource", resource);
      }
    }
  }


}

// Auto-install
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin)
}

export default plugin
