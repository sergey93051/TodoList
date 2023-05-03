
import { Inertia } from '@inertiajs/inertia';

const state = {
   data: [],
};

const getters = {
    result: (state) => state.todos,
};

const actions = {  

  async create({ commit }, data) {
    await Inertia.post('/store', data);
    commit('create', "success");
  },

  async delete({ commit }, id) {
      await Inertia.post('/delete/' + id,{});
      commit('delete', "remove success");
  },

  async update({ commit }, data) {
     await Inertia.post('/update/' + data.id, data);
     commit('update', "update Success");
  },
};

const mutations = {

      create(state, response) {
           state.data.push(response);
      },

      delete(state, response) {
        state.data.push(response);
      },
      
      update(state, response) {
        state.data.push(response);
      },
      



};

export default {
    state,
    getters,
    actions,
    mutations
}