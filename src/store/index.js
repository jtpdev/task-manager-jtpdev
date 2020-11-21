import Vue from 'vue'
import Vuex from 'vuex'
import LoginService from '../services/LoginService'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('token') || '',
    status: '',
    user: {},
    loading: false,
    tasks: JSON.parse(localStorage.getItem('tasks')) || []
  },
  mutations: {
    AUTH_LOGGING(state) {
      state.status = 'LOGGING';
    },
    AUTH_SUCCESS(state, credentials) {
      state.status = 'LOGGED';
      state.token = credentials.token;
      state.user = credentials.user;
    },
    AUTH_ERROR(state) {
      state.status = 'ERROR';
      state.token = '';
    },
    AUTH_LOGOUT(state) {
      state.status = '';
      state.token = '';
      state.user = {};
    },
    GET_USER(state, user) {
      state.user = user;
    },
    SAVE_TASK(state, task) {
      if (task.id) {
        const currentTask = state.tasks.filter(t => t.id == task.id)[0];
        if (currentTask) {
          state.tasks[state.tasks.indexOf(currentTask)] = task;
        } else {
          task.id = new Date().getTime();
          state.tasks.push(task);
        }
      } else {
        task.id = new Date().getTime();
        state.tasks.push(task);
      }
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },
    REMOVE_TASK(state, task) {
      if (task.id) {
        state.tasks = state.tasks.filter(t => t.id != task.id);
        localStorage.setItem('tasks', JSON.stringify(state.tasks));
      }
    },
    LOADING(state) {
      state.loading = true;
    },
    LOADED(state) {
      state.loading = false;
    }
  },
  actions: {
    login: ({ commit }, user) => {
      commit('AUTH_LOGGING');

      let service = new LoginService();
      return new Promise((resolve, reject) => {
        service.login(user)
          .then(r => {
            const token = 'token';
            const user = r.body;

            localStorage.setItem('token', token);
            commit('AUTH_SUCCESS', { token, user });
            resolve(r);
          })
          .catch(e => {
            commit('AUTH_ERROR');
            localStorage.removeItem('token');
            reject(e);
          });
      });
    },
    logout: ({ commit }) => {
      return new Promise((resolve) => {
        commit('AUTH_LOGOUT');
        localStorage.removeItem('token');
        resolve();
      });
    },
    saveTask: ({ commit }, task) => {
      return new Promise((resolve) => {
        commit('LOADING');
        commit('SAVE_TASK', task );
        resolve(task);
      });
    },
    removeTask: ({ commit }, task) => {
      return new Promise((resolve) => {
        commit('LOADING');
        commit('REMOVE_TASK', task );
        resolve();
      });
    },
  },
  modules: {
  },
  getters: {
    loggedName: state => {
      return (state.user && state.user.name) ? state.user.name : null;
    },
    loggedEmail: state => {
      return (state.user && state.user.email) ? state.user.email : null;
    },
    authenticated: state => !!state.token,
    tasks: state => state.tasks
  }
})
