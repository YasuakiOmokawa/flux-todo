var AppDispatcher = require('../dispatcher/AppDispatcher');
var TodoConstants = require('../constants/TodoConstants');
var Axios = require('axios');
const axios = Axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
  responseType: 'json',
})

module.exports = {
  setup: function() {
    // NOTE: ここでAjaxを用いてサーバサイドから取得してもよい
    var todos = [];
    axios
      .get('/api/todos')
      .then(res => res.data) // handle success
      .then(
        (result) => {
          todos = result.detail.todos;
          AppDispatcher.dispatch({
            actionType: TodoConstants.TODO_SETUP,
            todos: todos
          });
        }
      )
      .catch( // handle error
        (error) => {
          console.log(error);
          alert(error);
        }
      )
      .then( // always executed
          console.log('finished')
      );
  },

  create: function(name) {
    // NOTE: ここでAjaxを用いてサーバサイドから取得してもよい
    AppDispatcher.dispatch({
      actionType: TodoConstants.TODO_CREATE,
      name: name
    });
  },

  destroy: function(id) {
    // NOTE: ここでAjaxを用いてサーバサイドから取得してもよい
    AppDispatcher.dispatch({
      actionType: TodoConstants.TODO_DESTROY,
      id: id
    });
  }
};