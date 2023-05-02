

const state = {
  todos: [],
};

const getters = {
  allTodos: (state) => state.todos,
};

const actions = {  

  async create({ commit }, data) {
    const response = await this.$inertia.post('/store', data);
    commit('addTodo', response);
  },

  async delete({ commit }, id) {
      await this.$inertia.post(`/api/todos/${id}`);
    commit('removeTodo', id);
  },

  async update({ commit }, todo) {
    await axios.patch(`/api/todos/${todo.id}`, todo);
    commit('updateTodo', todo);
  },
};

const mutations = {

     addTodo(state, resource) {
        state.data.push(resource);
      },

      removeTodo(state, resource) {
        state.data.push(resource);
      },
      
      updateTodo(state, resource) {
        state.data.push(resource);
      },
      



};

export default {
    state,
    getters,
    actions,
    mutations
}