<template>

   <div class="container d-flex justify-content-center mt-2 p-1">
    <div class="col-md-6">
        <button class="btn btn-sm btn-primary" @click="createModal">Add New</button>
        <table class="table table-bordered table-condensed">
            <thead>
            <tr>
                <td>Name</td>
                <td>discripton</td>
                <td>status</td>
                <td>edit</td>
                <td>delete</td>
            </tr>
            </thead> 
            
            <tr v-for="row in data">
                <td>{{ row.name }}</td>
                <td>{{ row.description }}</td>
                <td>{{ row.status }}</td>
                <td>
                    <button @click="editRow(row)" type="button"  class="btn btn-outline-warning">Edit</button>                  
                </td>
                <td>                
                    <button @click="deleteRow(row)" type="button" class="btn btn-outline-danger">Delete</button>
                </td>
            </tr>
        </table>

        <div :style="modalShow" class="modal" id="modal">
            <div class="modal-dialog">

                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title"><Main>MODAL</Main></h4>
                    </div>
                    <div class="modal-body">

                        <div class="form-group">
                            <label for="name">Name</label>
                            <input class="form-control" required id="name" v-model="form.name"/>
                        </div>
                        <div class="form-group">
                            <label for="description">description</label>
                            <textarea id='description' class="form-control" v-model="form.description"  cols="30" rows="10">{{  }}</textarea>
                        </div>
                        <div class="form-group">
                            <label for="status">status</label>
                             <select class="form-control" v-model="form.status" id="status">
                                  <option value="Todo">Todo</option>
                                  <option value="Reject">Reject</option>
                                  <option value="Complete">Complete</option>
                             </select>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" @click="closeModal()">Close</button>
                        <button type="button" class="btn btn-success" v-if="!editMode" @click="save(form)">Save
                        </button>
                        <button type="button" class="btn btn-primary" v-if="editMode" @click="updateRow(form)">Update
                        </button>
                    </div>
                </div><!-- /.modal-content -->

            </div><!-- /.modal-dialog -->
        </div><!-- /.modal -->
    </div>
   </div>


</template>

<script>
   import { mapGetters, mapActions } from 'vuex';
    export default {
        props: ['data'],
        data() {
            return {
                modalShow:{
                    display:'none'
                },                             
                form:{
                   name:"",
                   description:'',
                   status:""                   
                },
                editMode:false                
            }
        },
        computed: {
                ...mapGetters('todos', ['allTodos']),
       },
        methods: {
            createModal() {
                this.modalShow = {
                     display:"block"
                }
            },
            closeModal(){
                this.modalShow = {
                    display:'none'
                },
                this.reset();
                this.editMode = false;
                
            },
            reset() {
                this.form = {
                    name: null,
                    description: null,
                    status:null
                }
            },
            async save(data) {   
                      
                  await this.$inertia.post('/store', data);        
                  this.reset();
                  this.closeModal();
            },
            editRow(data) {
                this.form = Object.assign({}, data);
                this.editMode = true;
                this.createModal();
            },
            async updateRow(data) {
                await  this.$inertia.post('/update/' + data.id, data)
                this.reset();
                this.closeModal();
                this.editMode = false;
            },
            async deleteRow(data) {
                if (!confirm('delete this')) return;
                await  this.$inertia.post('/delete/' + data.id, data)
                this.reset();
                this.closeModal();
            }
        }
    }
</script>