<template>
  <div>
    <b-card>
      <b-form-group label-cols="4" label-cols-lg="2" label-size="sm" label="Property" label-for="input-prop">
        <b-form-input id="input-prop" ref="inputProp" v-model="newProp.prop" size="sm" placeholder="Property"></b-form-input>
      </b-form-group>
      <b-form-group label-cols="4" label-cols-lg="2" label-size="sm" label="Value" label-for="input-val">
        <b-form-input id="input-val" size="sm" v-model="newProp.val" placeholder="Value" v-on:keyup.enter="addProp"></b-form-input>
      </b-form-group>
      <b-button size="sm" class="mb-2" variant="success" @click="addProp">
        <b-icon icon="plus" aria-hidden="true"></b-icon> {{this.mode}} a property
      </b-button>
    </b-card>

    <b-card v-if="propsArray!=undefined" >
      Props : {{ propsArray.length }}
      <div style="height=40px;overflow-y: scroll;">
        <b-list-group >
          <b-list-group-item button @click="editProp(p,k)" v-for="(p,k) in propsArray" :key="k" variant="light">


            <div class="input-group" style="display:table; width:100%;">
              <p class="p-0 m-0 flex-grow-1">
                {{p.prop}} :
                {{p.val}}
              <!-- <Resource :url="fi" /> -->
              <!-- {{ fi }} -->
            </p>
              <!-- <b-button v-b-modal.share-modal>share</b-button> -->
              <!-- <Permissions :url="fi" /> -->
              <span style="display: table-cell; width: 40px;">
                <!-- <button class="btn btn-default" type="button"><span>ᐅ</span>  Go!</button> -->
                <!-- class="unstyled-button" -->
                <!-- <Share :item="fi" /> -->

                <b-button size="sm" variant="outline-danger"  @click.stop="trash(k)">
                  <b-icon-trash @click.stop="trash(k)" variant="danger" ></b-icon-trash>
                </b-button>

                <!-- <Share :item="itemShared(fi)" style="float:left"/> -->

              </span>
            </div>

          </b-list-group-item>
        </b-list-group>
      </div>

    </b-card>

    <b-modal id="delete-prop-popup" title="Are you sur you want to delete this prop ?" @ok="remove">
      {{ JSON.stringify(objectsToRemove) }}
    </b-modal>
    <!-- <PropEdit :propToEdit="propToEdit" @ok="updateProp" /> -->
  </div>
</template>

<script>
export default {
  name: 'Properties',
  props: ['properties'],
  // components: {
  //   'PropEdit': () => import('@/components/network/PropEdit'),
  // },
  data(){
    return {
      mode : "Add",
      propsArray: [],
      newProp: {prop:"", val:""},
      objectsToRemove: {}
    }
  },
  created(){
    this.propsArray = this.properties || []
  },
  methods: {
    trash(key){
      console.log("trash", key)
      this.key = key
      this.objectsToRemove = this.propsArray[key]
      this.$bvModal.show("delete-prop-popup")
    },
    remove(){
      this.propsArray = this.propsArray.splice(this.key, 1);
    },
    updateProp(propToUpdate){
      console.log(propToUpdate, this.key)
    },
    editProp(p,k){
      this.newProp.prop = p.prop
      this.newProp.val = p.val
      this.key = k
      this.mode = "Update"
      this.$refs.inputProp.focus();
    },
    addProp(){
      console.log(this.newProp)

      // this.v.props[this.newProp.prop] == undefined ? this.v.props[this.newProp.prop] = [] : ""
      // !this.v.props[this.newProp.prop].includes(this.newProp.val) ? this.v.props[this.newProp.prop].push(this.newProp.val) : alert ("Already in Node props :"+ this.newProp.prop+ " / "+this.newProp.val)
      // console.log(this.v)
      if(this.newProp.prop.length > 0 && this.newProp.val.length > 0){
        let p = {
          prop : this.newProp.prop,
          val: this.newProp.val
        }
        if(this.mode == "Update"){
          this.propsArray[this.key] = p
        }else{
          this.propsArray.push(p)
        }

        console.log(this.propsArray)
        this.$emit('propsUpdated', this.propsArray)
        this.newProp.prop = ""
        this.newProp.val = ""
        this.mode = "Add"
        this.$refs.inputProp.focus();
      }else{
        alert("Property and Value can't be null")
      }
    },
  },
  watch:{
    properties(){
      this.propsArray = this.properties || []
      console.log(this.propsArray)
    }
  }
}
</script>

<style>

</style>
